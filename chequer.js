const xlsx = require("node-xlsx").default;
const fs = require("fs");
const helper = require("./helper");
const dia = require("./scheduler");
const query = require("cli-interact").getYesNo;

const answer = query("Querés correr el chequer?");

if (answer === true) {
	let diaMediaHora = dia.pop();
	let diaOrden = dia.pop();
	let canalOrden = dia.pop();

	const numDia = diaOrden.match(/\d\d/)[0];

	// Se lee el archivo Export.txt

	const archivo = fs.readFileSync("./Export.txt", "utf-8");

	// Se crea nueva variable para poder alterar el string

	let nuevo = archivo;

	// Se extrae información relevante antes de realizar trabajos futuros

	let fecha = nuevo.slice(0, nuevo.indexOf(" "));
	let canal = nuevo.slice(nuevo.indexOf("ITX") + 4, nuevo.indexOf("New") - 7);
	if (canal.length > 100) {
		canal = nuevo
			.slice(nuevo.indexOf("ITX") + 4, nuevo.indexOf("ITX") + 13)
			.trim();
		canal = canal.replace(/ /g, "");
	}

	//Se separa el string en arrays usando Spots como divisor y comenzamos a extraer la info

	nuevo = nuevo.split("Commercial Spot");

	// Se declara spots vacío para ser llenado posteriormente

	let spots = [];

	// Se declara Id, ya que lo vamos a usar para nombrar los spots

	let spotId = 0;

	// Se pushea a spots cada spot, cumpliendo las siguientes condiciones

	nuevo.forEach((e, i) => {
		if (i === 0) {
			// Se crea una exepción para el primer spot ya que necesita info previa del indice anterior, cosa que el primero no tiene
			spots.push({
				Spot: spotId++,
				Hora: parseInt(
					nuevo[0].slice(
						nuevo.lastIndexOf("0") - 11,
						nuevo[0].lastIndexOf("0") - 8
					)
				),
				Minutos: nuevo[0].slice(
					nuevo.lastIndexOf("0") - 8,
					nuevo[0].lastIndexOf("0") - 5
				),
				Media: nuevo[1].slice(
					nuevo[1].indexOf("SKSA"),
					nuevo[1].indexOf("SKSA") + 14
				),
				Version: nuevo[1]
					.slice(nuevo[1].indexOf("SKSA") - 80, nuevo[1].indexOf("Used:") - 1)
					.trim(),
				Duracion: nuevo[1].slice(
					nuevo[1].indexOf("0") + 3,
					nuevo[1].indexOf("0") + 8
				),
			});
		} else {
			spots.push({
				Spot: spotId++,
				Hora: parseInt(
					nuevo[i - 1].slice(
						nuevo.lastIndexOf("0") - 11,
						nuevo[i - 1].lastIndexOf("0") - 8
					)
				),
				Minutos: parseInt(
					nuevo[i - 1].slice(
						nuevo.lastIndexOf("0") - 8,
						nuevo[i - 1].lastIndexOf("0") - 5
					)
				),
				Media: nuevo[i].slice(
					nuevo[i].indexOf("SKSA"),
					nuevo[i].indexOf("SKSA") + 14
				),
				Version: nuevo[i]
					.slice(nuevo[1].indexOf("SKSA") - 80, nuevo[i].indexOf("Used:") - 1)
					.trim(),
				Duracion: nuevo[i].slice(
					nuevo[i].indexOf("0") + 3,
					nuevo[i].indexOf("0") + 8
				),
			});
		}
	});
	spots.splice(0, 1);

	if (diaMediaHora) {
		spots.forEach((e) => (e.Minutos >= 58 ? (e.Hora += 0.5) : false));
	}

	// Se toma lo que hizo el scheduler (dia) y se lo hace objeto para facilitar su comparación con lo Exportado de IBMS

	let insertados = dia.filter((e) => e.length > 1);

	// Se crea un nuevo elemento para llenarlo con los sub índices (ya que hay slots de hora que tienen muchos arrays/objetos adentro y quiero que queden todos en arrays sencillos sin subíndices)

	let nuevoElemento = [];
	insertados.forEach((e, i) => {
		if (e.length === 5 && e[0][0] === undefined) {
			insertados[i] = {
				Hora: e[0],
				Slot: e[1],
				Media: e[2],
				Version: e[3],
				Duracion: e[4],
			};
		} else {
			e.forEach((x, y) => {
				insertados[i][y] = {
					Hora: e[y][0],
					Slot: e[y][1],
					Media: e[y][2],
					Version: e[y][3],
					Duracion: e[y][4],
				};
				nuevoElemento.push(insertados[i][y]);
			});
			insertados[i].splice(0, insertados[i].length);
		}
	});

	let diaFinal = insertados.filter((e) => e.Hora || e.Hora === 0);
	nuevoElemento.forEach((e) => diaFinal.push(e));
	diaFinal.forEach((e) => {
		e.Insertado = false;
	});

	// Se hacen INT las duraciones y se lidia con el 01: o 02: potencial de comerciales más largos
	spots.forEach((e) => {
		if (e.Duracion.slice(0, 2) === "00") {
			e.Duracion = parseInt(e.Duracion.slice(3, 5));
		} else if (e.Duracion.slice(0, 2) === "01") {
			e.Duracion = parseInt(e.Duracion.slice(3, 5)) + 60;
		} else if (e.Duracion.slice(0, 2) === "02") {
			e.Duracion = 120;
		}
		e.Encontrado = false;
		e.Media = e.Media.replace("SA-0", "-");
	});

	// En este punto:
	// Exportado IBMS = spots
	// Schedule autogenerado = diaFinal

	// Se declara un array para escribir el resultado
	const resultado = [];
	const logeo = [];
	resultado.push([
		`El canal de la orden es ${canalOrden} y en IBMS se insertó en ${canal}.`,
	]);
	logeo.push([""], ["", "Canal", "Orden: " + canalOrden, "IBMS: " + canal]);
	resultado.push([
		`\nLa fecha de la orden es ${diaOrden} y en IBMS se insertó el ${fecha}.`,
	]);
	logeo.push(["", "Fecha", "Orden: " + diaOrden, "IBMS: " + fecha]);

	// console.log('Realizando conteo de spots');
	if (spots.length === diaFinal.length) {
		resultado.push(["\nConteo de spots: OK!"]);
		resultado.push([
			`\nHay ${spots.length} Spots insertados y según la orden deberían ser ${diaFinal.length}.`,
		]);
		logeo.push(
			["", "Conteo:", spots.length + "/" + diaFinal.length, "Orden/IBMS"],
			[""]
		);
	} else {
		resultado.push(["\nConteo de spots: ERROR."]);
		resultado.push([
			"\nHay " +
				spots.length +
				" Spots insertados, debería haber " +
				diaFinal.length,
		]);
		logeo.push(
			["", "Conteo:", spots.length + "/" + diaFinal.length, "Orden/IBMS"],
			[""]
		);
	}
	// console.log('Equiparando inserciones');
	// e = export, x = shedule, spots = Export, diaFinal = Schedule autogenerado
	spots.forEach((e, i) => {
		if (
			diaFinal.find(
				(x) =>
					e.Hora === x.Hora && e.Media === x.Media && e.Encontrado === false
			)
		) {
			if (
				typeof diaFinal.find(
					(x) =>
						e.Hora === x.Hora && e.Media === x.Media && x.Insertado === false
				) !== "undefined"
			) {
				diaFinal.find(
					(x) =>
						e.Hora === x.Hora && e.Media === x.Media && x.Insertado === false
				).Insertado = true;
				spots.find(
					(x) =>
						e.Hora === x.Hora && e.Media === x.Media && x.Encontrado === false
				).Encontrado = true;
			}
		}
	});
	// helper.fileName = 'diaFinal-scheduleAutogenerado'
	// helper.escribir(diaFinal)
	// helper.fileName = 'spots-Export'
	// helper.escribir(spots)

	if (spots.filter((e) => e.Encontrado === false).length < 1) {
		resultado.push(["\nMatcheado de spots en IBMS:"]);
		resultado.push(["\nTodos los Spots fueron asignados correctamente!"]);
	} else {
		resultado.push(["\nMatcheado de spots en IBMS:"]);
		resultado.push([
			"\nERROR! Abajo se detalla qué spots presentan discrepancias.",
		]);

		spots
			.filter((e) => e.Encontrado === false)
			.forEach((e) => {
				resultado.push([
					"\nRevisar: A las " +
						e.Hora +
						" horas, el media ID : " +
						e.Media +
						" " +
						e.Version,
				]);
				logeo.push(["", "Revisar:", e.Media, e.Version, "Hora: " + e.Hora]);
			});
	}

	if (diaFinal.filter((e) => e.Insertado === false).length < 1) {
		resultado.push(["\nMatcheado de spots en la Orden:"]);
		resultado.push(["\nTodos los Spots fueron asignados correctamente!"]);
	} else {
		resultado.push(["\nMatcheado de spots en la Orden:"]);
		resultado.push([
			"\nERROR! Abajo se detalla qué spots no fueron encontrados",
		]);
		diaFinal
			.filter((e) => e.Insertado === false)
			.forEach((e) => {
				resultado.push([
					"\nFaltante!! A las " +
						e.Hora +
						" horas en el slot " +
						e.Slot +
						" falta el media ID : " +
						e.Media +
						" " +
						e.Version,
				]);
				logeo.push([
					"",
					"Missing:",
					e.Media,
					e.Version,
					"Hora: " + e.Hora,
					"Slot: " + e.Slot,
				]);
			});
	}

	let escritura = resultado.map((e) => String(e));
	escritura = escritura.join("");
	console.log(escritura);

	const query = require("cli-interact").getYesNo;
	const answer = query("Querés crear un log de este resultado?");

	if (answer === true) {
		var buffer = xlsx.build([
			{
				name: "mySheetName",
				data: resultado,
			},
		]); // Returns a buffer

		if (logeo.length === 3) {
			fs.writeFileSync(
				"./Checkeo_" + canal + "_" + fecha.replace(/\//gi, "-") + ".txt",
				escritura,
				"utf-8"
			);

			console.log(
				"Se escribió el chequeo en Checkeo_" +
					canal +
					"_" +
					fecha.replace(/\//gi, "-") +
					".txt."
			);
		}

		if (logeo.length !== 3) {
			buffer = xlsx.build([
				{
					name: "mySheetName",
					data: logeo,
				},
			]);

			fs.writeFileSync(
				"./Checkeo" + " " + canal + " " + fecha.replace(/\//gi, "-") + ".xlsx",
				buffer
			);

			console.log(
				"Se escribió el chequeo en Checkeo_" +
					canal +
					"_" +
					fecha.replace(/\//gi, "-") +
					".xlsx."
			);
		}
	}
}
