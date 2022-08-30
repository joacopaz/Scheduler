// venimos de importador.js, ya habiendo importado los Spots y llamándolos comenzamos a crear el programa que va a crear el día

const importados = require("./importador");
const helper = require("./helper");
const FS = require("fs");
const xlsx = require("node-xlsx").default;
const itxs = require("./itxObject");

// Se separa el objecto importado en los objetos necesitados
const Spots = importados.Spots;
const Izzi = importados.Izzi;

// Se crea el día

Spots.find(
	(e) =>
		parseInt(e.Break.slice(3, 5)) === 23 ||
		parseInt(e.Break.slice(3, 5)) === 48 ||
		parseInt(e.Break.slice(3, 5)) === 49
)
	? (diaMediaHora = true)
	: (diaMediaHora = false);
if (diaMediaHora) {
	dia = [
		{
			Hora: 7,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 7.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 8,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 8.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 9,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 9.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 10,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 10.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 11,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 11.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 12,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 12.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 13,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 13.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 14,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 14.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 15,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 15.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 16,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 16.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 17,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 17.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 18,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 18.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 19,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 19.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 20,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 20.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 21,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 21.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 22,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 22.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 23,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 23.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 0,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 0.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 1,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 1.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 2,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 2.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 3,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 3.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 4,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 4.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 5.5,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 6,
			Remaining: 60,
			Spots: [],
		},
		{
			Hora: 6.5,
			Remaining: 60,
			Spots: [],
		},
	];
} else {
	dia = [
		{
			Hora: 07,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 08,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 09,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 10,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 11,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 12,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 13,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 14,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 15,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 16,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 17,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 18,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 19,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 20,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 21,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 22,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 23,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 00,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 01,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 02,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 03,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 04,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 05,
			Remaining: 120,
			Spots: [],
		},
		{
			Hora: 06,
			Remaining: 120,
			Spots: [],
		},
	];
}

if (diaMediaHora) {
	Spots.forEach((e) => {
		if (e.Break.slice(3, 5) > 20 && e.Break.slice(3, 5) < 25) {
			e.Break = 1;
		} else {
			e.Break = 2;
		}
	});
} else {
	Spots.forEach((e) => delete e.Break);
}

// Se crean los breaks como un acceso directo comprensible al día
if (diaMediaHora) {
	breaks = {
		7: dia[0],
		7.5: dia[1],
		8: dia[2],
		8.5: dia[3],
		9: dia[4],
		9.5: dia[5],
		10: dia[6],
		10.5: dia[7],
		11: dia[8],
		11.5: dia[9],
		12: dia[10],
		12.5: dia[11],
		13: dia[12],
		13.5: dia[13],
		14: dia[14],
		14.5: dia[15],
		15: dia[16],
		15.5: dia[17],
		16: dia[18],
		16.5: dia[19],
		17: dia[20],
		17.5: dia[21],
		18: dia[22],
		18.5: dia[23],
		19: dia[24],
		19.5: dia[25],
		20: dia[26],
		20.5: dia[27],
		21: dia[28],
		21.5: dia[29],
		22: dia[30],
		22.5: dia[31],
		23: dia[32],
		23.5: dia[33],
		0: dia[34],
		0.5: dia[35],
		1: dia[36],
		1.5: dia[37],
		2: dia[38],
		2.5: dia[39],
		3: dia[40],
		3.5: dia[41],
		4: dia[42],
		4.5: dia[43],
		5: dia[44],
		5.5: dia[45],
		6: dia[46],
		6.5: dia[47],
	};
} else {
	breaks = {
		07: dia[0],
		08: dia[1],
		09: dia[2],
		10: dia[3],
		11: dia[4],
		12: dia[5],
		13: dia[6],
		14: dia[7],
		15: dia[8],
		16: dia[9],
		17: dia[10],
		18: dia[11],
		19: dia[12],
		20: dia[13],
		21: dia[14],
		22: dia[15],
		23: dia[16],
		00: dia[17],
		01: dia[18],
		02: dia[19],
		03: dia[20],
		04: dia[21],
		05: dia[22],
		06: dia[23],
	};
}

// Se proceden a asignar los spots izzi y a actualizar la información necesaria en el dia

console.log("Procesando prioridades izzi");
Izzi !== []
	? Izzi.forEach((izzi) => {
			if (izzi.Corte === 1) {
				const spotRelativo = Spots.find((spot) => spot.Id === izzi.SpotId);
				breaks[izzi.Hora].Spots.push({
					Slot: spotRelativo.Ubicacion,
					Media: spotRelativo.Media,
					Version: spotRelativo.Version,
					Duracion: spotRelativo.Duracion,
				});
				izzi.Asignado = true;
				spotRelativo.Asignado = true;
				breaks[izzi.Hora].Remaining -= spotRelativo.Duracion;
			}
	  })
	: false;

// Se procede a asignar el resto de los spots

const spotsPendientes = Spots.filter((spot) => !spot.Asignado);

// Se arreglan por hora y prioridad

if (diaMediaHora) {
	spotsPendientes.forEach((e) => {
		e.Break === 2 ? (e.Hora += 0.5) : false;
	});
}
spotsPendientes.forEach((e) => (e = delete e.Break));
spotsPendientes.sort((a, b) => {
	if (a.Hora === b.Hora) {
		return a.Ubicacion < b.Ubicacion ? -1 : 1;
	} else {
		return a.Hora < b.Hora ? -1 : 1;
	}
});

console.log("Procesando spots");

spotsPendientes.forEach((spot) => {
	let indice = 0;
	if (
		breaks[spot.Hora].Spots.find((e) => e.Slot === spot.Ubicacion) &&
		spot.Asignado === false
	) {
		indice += spot.Ubicacion;
	} else {
		breaks[spot.Hora].Spots.push({
			Slot: spot.Ubicacion,
			Media: spot.Media,
			Version: spot.Version,
			Duracion: spot.Duracion,
		});
		spot.Asignado = true;
	}

	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
	if (!spot.Asignado) {
		if (breaks[spot.Hora].Spots.find((e) => e.Slot === indice)) {
			indice++;
		} else {
			breaks[spot.Hora].Spots.push({
				Slot: indice,
				Media: spot.Media,
				Version: spot.Version,
				Duracion: spot.Duracion,
			});
			spot.Asignado = true;
		}
	}
});

// Se calcula si todo fue insertado

dia.reduce((a, e) => a + e.Spots.length, 0) === Spots.length
	? console.log("Todos los spots fueron insertados.")
	: console.log("Hubo un problema, no se insertaron todos los spots.");

const diaEnArray = dia.map((dia) => {
	if (dia.Spots.length === 0) {
		return [dia.Hora];
	} else if (dia.Spots.length === 1) {
		return [
			dia.Hora,
			dia.Spots[0].Slot,
			dia.Spots[0].Media,
			dia.Spots[0].Version,
			dia.Spots[0].Duracion,
		];
	} else if (dia.Spots.length > 1) {
		const array = [];
		for (let i = 0; i < dia.Spots.length; i++) {
			const element = dia.Spots[i];
			array.push([
				dia.Hora,
				element.Slot,
				element.Media,
				element.Version,
				element.Duracion,
			]);
		}
		return array;
	}
});

// Se crea un array con el formato del excel a escribir

console.log("Creando día");

const canal = importados.Canal;
let itx;
if (itxs[canal]) {
	itx = itxs[canal];
}

const diaOrdenado = [
	[""],
	["", "Media", "Hora", "Pos", "Version", "Duracion", `ITX ${itx}`],
	[""],
];

// Se escriben los spots
if (!diaMediaHora) {
	diaEnArray.forEach((e) => {
		let d = 0;
		let slot = 1;
		let spot = ["", e[2], e[0], e[1], e[3], e[4]];
		let acumulado = 0;
		if (e.length === 1) {
			diaOrdenado.push(["", "Promotion", e[0], 1, "Promotion", 30]);
			diaOrdenado.push(["", "Promotion", e[0], 2, "Promotion", 30]);
			diaOrdenado.push(["", "Promotion", e[0], 3, "Promotion", 30]);
			diaOrdenado.push(["", "Promotion", e[0], 4, "Promotion", 30]);
		} else if (e.length === 5 && e[0][0] === undefined) {
			for (remaining = 120; remaining > 0; remaining -= d) {
				if (slot === spot[3]) {
					diaOrdenado.push(spot);
					d = spot[5];
					slot += 1;
				} else if (remaining > 0 && remaining >= 30) {
					d = 30;
					let promos = ["", "Promotion", e[0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
				} else if (remaining > 0 && remaining < 30) {
					d = remaining;
					let promos = ["", "Promotion", e[0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
				}
			}
		} else {
			for (let i = 0; i < e.length; i++) {
				spot = ["", e[i][2], e[i][0], e[i][1], e[i][3], e[i][4]];

				if (slot === spot[3]) {
					diaOrdenado.push(spot);
					d = spot[5];
					slot += 1;
					acumulado += d;
				} else if (remaining > 0 && remaining >= 30) {
					d = 30;
					let promos = ["", "Promotion", e[i][0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
					acumulado += d;
				} else if (remaining > 0 && remaining < 30) {
					d = remaining;
					let promos = ["", "Promotion", e[i][0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
					acumulado += d;
				}
			}
			for (acumulado; acumulado < 120; acumulado += d) {
				remaining = 120 - acumulado;
				if (remaining > 0 && remaining >= 30) {
					d = 30;
					let promos = ["", "Promotion", e[0][0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
				} else if (remaining > 0 && remaining < 30) {
					d = remaining;
					let promos = ["", "Promotion", e[0][0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
				}
			}
		}
		diaOrdenado.push([""]);
	});
} else {
	diaEnArray.forEach((e) => {
		let d = 0;
		let slot = 1;
		let spot = ["", e[2], e[0], e[1], e[3], e[4]];
		let acumulado = 0;
		if (e.length === 1) {
			diaOrdenado.push(["", "Promotion", e[0], 1, "Promotion", 30]);
			diaOrdenado.push(["", "Promotion", e[0], 2, "Promotion", 30]);
		} else if (e.length === 5 && e[0][0] === undefined) {
			for (remaining = 60; remaining > 0; remaining -= d) {
				if (slot === spot[3]) {
					diaOrdenado.push(spot);
					d = spot[5];
					slot += 1;
				} else if (remaining > 0 && remaining >= 30) {
					d = 30;
					let promos = ["", "Promotion", e[0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
				} else if (remaining > 0 && remaining < 30) {
					d = remaining;
					let promos = ["", "Promotion", e[0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
				}
			}
		} else {
			for (let i = 0; i < e.length; i++) {
				spot = ["", e[i][2], e[i][0], e[i][1], e[i][3], e[i][4]];
				if (slot === spot[3]) {
					diaOrdenado.push(spot);
					d = spot[5];
					slot += 1;
					acumulado += d;
				} else if (remaining > 0 && remaining >= 30) {
					d = 30;
					let promos = ["", "Promotion", e[i][0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
					acumulado += d;
				} else if (remaining > 0 && remaining < 30) {
					d = remaining;
					let promos = ["", "Promotion", e[i][0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
					acumulado += d;
				}
			}
			for (acumulado; acumulado < 60; acumulado += d) {
				remaining = 60 - acumulado;
				if (remaining > 0 && remaining >= 30) {
					d = 30;
					let promos = ["", "Promotion", e[0][0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
				} else if (remaining > 0 && remaining < 30) {
					d = remaining;
					let promos = ["", "Promotion", e[0][0], slot, "Promotion", d];
					diaOrdenado.push(promos);
					slot += 1;
				}
			}
		}
		diaOrdenado.push([""]);
	});
}
if (diaMediaHora) {
	diaOrdenado.forEach((e, i) => {
		if (e.length > 1 && e[2] !== undefined) {
			if (e[2].toString().includes(".5"))
				e[2] =
					e[2].toString().slice(0, e[2].toString().lastIndexOf(":30") - 1) +
					":30";
		}
	});
}

console.log("Finalizada la inserción de Comerciales y Promotions");

// Se extra la info para escribir el archivo

const fechas = Spots.map((e) => e.Fecha);
const fechasOrd = fechas.sort((a, b) => {
	return a.toString().localeCompare(b.toString(), "en", {
		numeric: true,
	});
});
let fechaOrden;
if (
	fechasOrd[0].substring(0, 2) === "01" &&
	fechasOrd[fechasOrd.length - 1].substring(0, 2) !== "02"
) {
	fechaOrden = fechasOrd[fechasOrd.length - 1];
} else {
	fechaOrden = fechasOrd[0];
}

// Se realiza la acomodación de las promos con duración menor a 30 mins para que sean las primeras
diaOrdenado.forEach((e, i) => {
	if (
		e[1] === "Promotion" &&
		e[5] !== 30 &&
		typeof diaOrdenado[i - 1] !== "undefined" &&
		diaOrdenado[i - 1][1] === "Promotion"
	) {
		let indexPrimeraPromo = diaOrdenado.findIndex(
			(x) => x[2] === e[2] && x[1] === "Promotion"
		);
		let duracion = e[5];
		let duracionPrimeraPromo = diaOrdenado[indexPrimeraPromo][5];
		e[5] = duracionPrimeraPromo;
		diaOrdenado[indexPrimeraPromo][5] = duracion;
	}
});

diaOrdenado.forEach((e, i) => {
	if (e[5] === 25 && e[1] === "Promotion") {
		e[5] = 20;
		slot = e[3];
		ubicacion = JSON.parse(JSON.stringify(i)); // Deep copy of i
		diaOrdenado.splice(++ubicacion, 0, [
			"",
			"Promotion",
			e[2],
			++slot,
			"Promotion",
			5,
		]);
		while (diaOrdenado[ubicacion][3] === diaOrdenado[ubicacion + 1][3]) {
			diaOrdenado[++ubicacion][3] = ++slot;
		}
	}
});

// Se procesa

var buffer = xlsx.build([
	{
		name: "mySheetName",
		data: diaOrdenado,
	},
]); // Returns a buffer

const query = require("cli-interact").getYesNo;
const answer = query("Querés generar la orden?");

if (answer === true) {
	FS.writeFileSync(
		"./Orden" + " " + canal + " " + fechaOrden + ".xlsx",
		buffer
	);

	console.log(
		"Finalizada la escritura de la Orden " + canal + " " + fechaOrden + ".xlsx"
	);

	console.log("Enjoy!");
}
diaEnArray.push(canal);
diaEnArray.push(fechaOrden);
diaEnArray.push(diaMediaHora);

module.exports = diaEnArray;

Spots.sort((a, b) =>
	a.Version.localeCompare(b.Version, "en", {
		numeric: true,
	})
);

// setTimeout(() => console.log('Cerrando en 3!'), 1000)
// setTimeout(() => console.log('Cerrando en 2!'), 2000)
// setTimeout(() => console.log('Cerrando en 1!'), 3000)
