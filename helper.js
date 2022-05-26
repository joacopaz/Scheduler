const FS = require('fs');

const jsonHelper = {

    fileName: 'Orden',

    leer: function () {
        // Lector
        const archivoImportadoJSON = FS.readFileSync('./' + this.fileName + '.JSON', 'utf-8');
        const archivoImportadoArray = JSON.parse(archivoImportadoJSON);
        console.log('Se realizó la lectura de ' + this.fileName);
        return archivoImportadoArray
    },

    escribir: function (datos) {
        // Escritor
        const arrayAEscribir = datos;
        const arrayAEscribirJSON = JSON.stringify(arrayAEscribir, null, 1);
        FS.writeFileSync('./' + this.fileName + '.JSON', arrayAEscribirJSON);
        console.log('Se realizó la escritura de ' + this.fileName);
    }
}

module.exports = jsonHelper;