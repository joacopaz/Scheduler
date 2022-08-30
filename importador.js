const xlsx = require("node-xlsx").default;
const fs = require("fs");
const helper = require("./helper");

// Parse a buffer
const orden = xlsx.parse("./" + helper.fileName + ".xlsx", {
	raw: false,
});

// Se llama al sheet que tiene los datos que necesitamos
const datos = orden[0].data;

// Una función que elimina los elementos vacíos
function depurar() {
	datos.forEach((e, i) => {
		if (e === null || e === [] || e === undefined || e.length < 1) {
			datos.splice(i, 1);
		}
	});

	for (let i = 0; i < datos.length; i++) {
		const element = datos[i];

		for (let y = 0; y < element.length; y++) {
			const s = element[y];

			if (s === null || s === [] || s === undefined || s.length < 1) {
				element.splice(y, 1);
			}
		}
	}
}

depurar();
depurar(); // Se ejecuta para limpiar espacios

function search(string) {
	for (let i = 0; i < datos.length; i++) {
		const element = datos[i];
		for (let x = 0; x < element.length; x++) {
			const sub = element[x];
			if (isNaN(sub) && sub !== undefined) {
				if (sub.includes(string)) {
					return [i, x];
				}
			}
		}
	}
}
let canal = datos[search("Canal")[0]][1]; // Se extrae la información del canal, puede llegar a ser necesario este dato

// Funcion para extraer sub-elementos (strings) con la función search ya programada

function removeSubindex(string) {
	for (let i = 0; i < datos.length; i++) {
		buscado = search(string);
		if (buscado !== undefined) {
			datos[buscado[0]].splice(buscado[1], 1);
		}
		depurar();
	}
}

// Funcion para extraer elementos (strings) con la función search ya programada

function removeIndex(string) {
	for (let i = 0; i < datos.length; i++) {
		buscado = search(string);
		if (buscado !== undefined) {
			datos.splice(buscado[0], 1);
		}
		depurar();
	}
}
// Se declara spots para luego ser rellenado con la info
let spots = [];

// Función que extraerá todo, usando Clientes como la palabra clave para distinguir entre 1 elemento y el próximo
function extraerCliente() {
	if (
		typeof search("Cliente") !== "undefined" &&
		typeof search("Cliente")[0] !== "undefined"
	) {
		for (let index = 0; index < datos.length; index++) {
			// extraer 1 Cliente con todos sus spots
			if (typeof search("Cliente") !== "undefined") {
				const x = search("Cliente")[0];
				const y = search("Cliente")[1];
				const extraido = datos.splice(x, 1);
				const categoria = datos.splice(x, 1);
				// console.log(`${x} - ${y} - ${extraido} - ${categoria}`); --> Testing Log
				if (
					typeof search("Cliente") !== "undefined" &&
					typeof search("Cliente")[0] !== "undefined"
				) {
					proxCliente = search("Cliente")[0];
				} else {
					proxCliente = 0;
				}

				spots.push({
					Cliente: extraido[0][1].trim(),
					Categoria: categoria[0][1].trim(),
					Spots: [],
				});

				lastIndex = spots.length - 1;
				for (let i = 0; i < proxCliente; i++) {
					elemento = datos.splice(x, 1);
					spots[lastIndex].Spots.push(elemento);
				}
			}
		}
	}
}
// La función de extraer Clientes falla al extraer el último dato, por lo que se programa cómo extraer el último
function extraerUltimo() {
	const clienteUltimo = datos.splice(0, 1);
	const categoriaUltima = datos.splice(0, 1);
	const spotsFinal = {
		Spots: [],
	};

	// console.log(`${clienteUltimo} - ${categoriaUltima}`); //--> Testing Log

	if (clienteUltimo[0][0].includes("Deal")) {
		deal = true;
		spots[spots.length - 1].Spots.push(clienteUltimo);
		// console.log(spots[spots.length - 1].Spots); // Testing Log
		spots[spots.length - 1].Spots.push(categoriaUltima);
		// console.log(spots[spots.length - 1].Spots); // Testing Log
		if (datos.length > 1) {
			datos.forEach((spot) => {
				spot = datos.splice(0, 1);
				spots[spots.length - 1].Spots.push(spot);
			});
		}
		spots[spots.length - 1].Spots.push(datos.splice(0, 1));
		while (datos.length > 0) {
			spots[spots.length - 1].Spots.push(datos.splice(0, 1));
		}
	} else {
		deal = false;
		let counter = 0;
		datos.forEach((spot) => {
			spotsFinal.Spots.push(spot);
			counter++;
		});
		for (let i = 0; i < counter; i++) {
			datos.splice(0, 1);
		}

		const ultimo = {
			Cliente: clienteUltimo[0][1],
			Categoria: categoriaUltima[0][1],
			Spots: spotsFinal.Spots,
		};
		ultimo.Cliente = ultimo.Cliente.trim();
		ultimo.Categoria = ultimo.Categoria.trim();
		spots.push(ultimo);
	}
}

// Eliminamos todos los datos que no son necesarios
removeSubindex("Spoteo");
removeSubindex("_L");
removeSubindex("_M");
removeSubindex("_W");
removeSubindex("_J");
removeSubindex("_V");
removeSubindex("_S");
removeSubindex("_D");
removeIndex("APS:");
removeIndex("Fecha Fin:");
removeIndex("Marca");
removeIndex("Canal");
removeIndex("Orden Televisa:");
removeIndex("Línea");

// Comenzamos a generar nuestro array con la info para trabajar
extraerCliente();
extraerCliente();
extraerUltimo();

// En esta instancia exitosamente se extrajeron todos los Clientes, Categorias y Spots

// Agregamos ID y Estado de Asignación

spots.forEach((elemento, i) => {
	(elemento.Id = i), (elemento.Asignado = false);
	elemento.Spots.splice(0, 1);
});

// Depuramos los Spots para quedarnos sólo con la info relevante
const reordenandoSpots = [];
let elementoId = 1;
spots.forEach((elemento, y) => {
	const length = elemento.Spots.length;
	for (let i = 0; i < length; i++) {
		const element = elemento.Spots[i][0];
		reordenandoSpots.push({
			Id: elementoId,
			Cliente: elemento.Cliente,
			Categoria: elemento.Categoria,
			Asignado: elemento.Asignado,
			Spot: element,
		});
		elementoId++;
	}
});

const spotsUltimo = spots[spots.length - 1].Spots;
if (spotsUltimo.length > 1 && deal === false) {
	for (let i = 0; i < spotsUltimo.length; i++) {
		const element = spotsUltimo[i];
		let dondeCambiar = reordenandoSpots.length - spotsUltimo.length;
		reordenandoSpots[dondeCambiar + i].Spot = element;
	}
} else if (deal === false) {
	reordenandoSpots[reordenandoSpots.length - 1].Spot = spotsUltimo[0];
}
spots = [];
let Spots = reordenandoSpots;

// En este punto logramos crear Spots, un array que contiene por objetos a cada Spot, con su Id unico, cliente, categoria, estado de asignación y spot

if (typeof Spots[Spots.length - 1].Spot === "undefined") {
	Spots.pop();
}

Spots.forEach((spot) => {
	spot.Izzi = false;
	spot.SpotId = parseInt(spot.Spot[1]);
	spot.Fecha = spot.Spot[2];
	spot.Duracion = parseInt(spot.Spot[3]);
	spot.Media = spot.Spot[8];
	spot.Version = spot.Spot[9];
	spot.Break = spot.Spot[10];
	spot.Hora = parseInt(spot.Spot[4].slice(0, 2));
	spot.Ubicacion = parseInt(spot.Spot[11]);
	spot.Break = spot.Spot[10];
	delete spot.Spot;
});

// Se importa los spots IZZI de la solapa 2 del xls

if (orden[1] !== undefined) {
	rawIzzi = orden[1].data;
} else {
	rawIzzi = [];
}

// Se crea un nuevo array mapeado con esta información, ya dándole un formato de Objeto Literal

rawIzzi != undefined && rawIzzi !== []
	? (izzis = rawIzzi.map((e) => {
			return {
				Canal: e[0].trim(),
				Hora: parseInt(e[1]),
				Corte: parseInt(e[2]),
				Posicion: e[3].trim(),
				Fecha: e[6].trim(),
				Version: e[7].trim(),
				MediaId: e[8].trim(),
				SpotId: 0,
				Asignado: false,
			};
	  }))
	: (izzis = []);

// Se filtra la información Izzi respectiva al canal

rawIzzi !== [] ? (Izzi = izzis.filter((e) => e.Canal === canal)) : (Izzi = []);

//Se realiza el cambio del string posiciones por su valor numérico con un Switch
Izzi !== []
	? Izzi.forEach((e) => {
			switch (e.Posicion) {
				case "PRIMERO":
					e.Posicion = 1;
					break;
				case "SEGUNDO":
					e.Posicion = 2;
					break;
				case "TERCERO":
					e.Posicion = 3;
					break;
				case "CUARTO":
					e.Posicion = 4;
					break;
				case "QUINTO":
					e.Posicion = 5;
					break;
				case "SEXTO":
					e.Posicion = 6;
					break;
				case "SEPTIMO":
					e.Posicion = 7;
					break;
				case "OCTAVO":
					e.Posicion = 8;
					break;
				case "NOVENO":
					e.Posicion = 9;
					break;
				case "DECIMO":
					e.Posicion = 10;
					break;
				case "ONCEAVO":
					e.Posicion == 11;
					break;
				case "DOCEAVO":
					e.Posicion = 12;
					break;
				default:
					break;
			}
	  })
	: false;

// Se comienza a asignar el estado de true a cada spot que sea izzi
Izzi !== []
	? Izzi.forEach((izzi) => {
			Spots.forEach((spot) => {
				if (
					spot.Hora == izzi.Hora &&
					spot.Ubicacion == izzi.Posicion &&
					izzi.MediaId == spot.Media
				) {
					spot.Izzi = true;
					izzi.SpotId = spot.Id;
				}
			});
	  })
	: false;

// Se refina el array Spots para que quede con su propiedades adecuadas se exporta para seguir en el próximo archivo -> scheduler.js

// Se crea un objeto importado, con el resultado exitoso de la importación de los Spots y los Izzi.

const importado = {
	Spots: Spots,
	Izzi: Izzi,
	Canal: canal,
};

// Se exporta el resultado de importador.js para seguir en el scheduler.

module.exports = importado;
