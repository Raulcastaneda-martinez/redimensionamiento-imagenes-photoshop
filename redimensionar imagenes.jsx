// ============================================================
// REDIMENSIONAR PSD / PNG / JPG EN LOTE - Adobe Photoshop
// Tamaño final: 7.5 cm ancho x 16.5 cm alto, 300 DPI
// ============================================================
//
// COMO USARLO:
//   1. Abre Photoshop.
//   2. Ve a: Archivo > Scripts > Examinar...
//   3. Selecciona este archivo (redimensionar_photoshop.jsx)
//   4. Se abrira un cuadro para que elijas la carpeta de origen.
//   5. Espera a que termine (aparecera un aviso al final).
//
// Los archivos redimensionados se guardan en una SUBCARPETA
// llamada "redimensionado" para no sobrescribir tus originales.
// ============================================================

#target photoshop

// ------------------- CONFIGURA ESTO -------------------
var ANCHO_CM = 7.5;
var ALTO_CM = 16.5;
var RESOLUCION_DPI = 300;
// --------------------------------------------------------

function main() {
    var carpetaOrigen = Folder.selectDialog("Selecciona la carpeta con las imagenes a redimensionar");

    if (carpetaOrigen === null) {
        // El usuario cancelo el cuadro de dialogo
        return;
    }

    if (!carpetaOrigen.exists) {
        alert("No se encontro la carpeta seleccionada.");
        return;
    }

    var carpetaDestino = new Folder(CARPETA_ORIGEN + "/redimensionado");
    if (!carpetaDestino.exists) carpetaDestino.create();

    // Evita cuadros de dialogo de compatibilidad al guardar
    app.displayDialogs = DialogModes.NO;

    var archivos = carpetaOrigen.getFiles(function (f) {
        if (f instanceof Folder) return false;
        var ext = f.name.split(".").pop().toLowerCase();
        return (ext === "png");
    });

    if (archivos.length === 0) {
        alert("No se encontraron archivos .psd, .png o .jpg en la carpeta.");
        return;
    }

    var exitosos = 0;
    var errores = [];

    for (var i = 0; i < archivos.length; i++) {
        var archivo = archivos[i];
        try {
            var doc = app.open(archivo);

            // Redimensiona ancho, alto y resolucion en una sola operacion
            doc.resizeImage(
                UnitValue(ANCHO_CM, "cm"),
                UnitValue(ALTO_CM, "cm"),
                RESOLUCION_DPI,
                ResampleMethod.BICUBIC
            );

            var nombreCompleto = archivo.name;
            var ext = nombreCompleto.split(".").pop().toLowerCase();
            var nombreBase = nombreCompleto.substring(0, nombreCompleto.lastIndexOf("."));
            var archivoDestino;
            var opcionesGuardado;

            if (ext === "psd") {
                archivoDestino = new File(carpetaDestino + "/" + nombreBase + ".psd");
                opcionesGuardado = new PhotoshopSaveOptions();
                opcionesGuardado.layers = true;
            } else if (ext === "png") {
                archivoDestino = new File(carpetaDestino + "/" + nombreBase + ".png");
                opcionesGuardado = new PNGSaveOptions();
            } else {
                archivoDestino = new File(carpetaDestino + "/" + nombreBase + "." + ext);
                opcionesGuardado = new JPEGSaveOptions();
                opcionesGuardado.quality = 12;
            }

            doc.saveAs(archivoDestino, opcionesGuardado, true);
            doc.close(SaveOptions.DONOTSAVECHANGES);

            exitosos++;
        } catch (e) {
            errores.push(archivo.name + ": " + e.message);
            try { if (app.documents.length > 0) app.activeDocument.close(SaveOptions.DONOTSAVECHANGES); } catch (e2) {}
        }
    }

    var mensaje = "Proceso terminado.\n\n";
    mensaje += "Archivos redimensionados: " + exitosos + "\n";
    mensaje += "Guardados en: " + carpetaDestino.fsName + "\n";

    if (errores.length > 0) {
        mensaje += "\nErrores (" + errores.length + "):\n" + errores.join("\n");
    }

    alert(mensaje);
}

main();
