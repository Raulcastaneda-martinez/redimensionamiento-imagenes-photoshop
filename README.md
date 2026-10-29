# Redimensionamiento por lotes de imágenes en Adobe Photoshop

## Descripción

Este proyecto contiene un script para Adobe Photoshop que automatiza el
redimensionamiento de varias imágenes desde una carpeta seleccionada.
Está pensado para tareas de preparación de imágenes para personalización
gráfica, por ejemplo, diseños destinados a fundas para teléfonos
celulares.

El script aplica las siguientes medidas a cada archivo compatible:

-   **Ancho:** 7.5 cm
-   **Alto:** 16.5 cm
-   **Resolución:** 300 píxeles por pulgada (DPI/PPP)
-   **Método de remuestreo:** Bicúbico

Los archivos procesados se guardan en una subcarpeta llamada
`redimensionado` dentro de la carpeta de origen. Los archivos originales
no se sobrescriben.

## Funciones

-   Procesa archivos por lotes, sin tener que abrir y cambiar el tamaño
    de cada imagen manualmente.
-   Admite archivos `PSD`, `PNG`, `JPG` y `JPEG`.
-   Conserva las capas al guardar archivos PSD.
-   Guarda PNG como PNG y los archivos JPG/JPEG como JPEG.
-   Muestra un resumen al finalizar e informa los errores encontrados.

## Requisitos

-   Adobe Photoshop de escritorio con soporte para scripts
    JSX/ExtendScript.
-   Una carpeta con imágenes compatibles.
-   Permisos para leer los archivos de origen y crear la carpeta de
    resultados.

> **Importante sobre las proporciones:** el script establece el ancho y
> el alto de forma independiente para obtener exactamente 7.5 × 16.5 cm.
> Si la imagen original tiene otra proporción, puede deformarse. Trabaja
> con copias de tus archivos y revisa el resultado antes de usarlo en
> producción.

> **Importante sobre los DPI:** indicar 300 DPI establece la resolución
> de impresión junto con las dimensiones físicas configuradas; no
> garantiza por sí solo que una imagen de baja resolución tenga
> suficiente detalle para una impresión de calidad.

## Cómo ejecutar el script paso a paso

1.  Descarga el archivo `redimensionar_imagenes.jsx` desde este
    repositorio.
2.  Guarda una copia de seguridad de las imágenes originales.
3.  Coloca los archivos PSD, PNG, JPG o JPEG que quieras procesar en una
    misma carpeta.
4.  Abre Adobe Photoshop.
5.  En el menú, selecciona **Archivo \> Secuencias de comandos \>
    Examinar...**. Según la versión o el idioma de Photoshop, la opción
    puede aparecer como **Archivo \> Scripts \> Examinar...**.
6.  Busca y selecciona el archivo `redimensionar_imagenes.jsx`.
7.  Cuando aparezca el cuadro de diálogo, selecciona la carpeta que
    contiene las imágenes y confirma.
8.  Espera mientras Photoshop abre, redimensiona y guarda los archivos.
9.  Al finalizar, revisa el mensaje de resumen que muestra cuántos
    archivos se procesaron y si hubo errores.
10. Abre la carpeta de origen y entra en la subcarpeta `redimensionado`
    para revisar los resultados.

### Resultado esperado

La estructura de carpetas quedará similar a esta:

``` text
mis-disenos/
├── funda_01.png
├── funda_02.jpg
├── diseño_base.psd
└── redimensionado/
    ├── funda_01.png
    ├── funda_02.jpg
    └── diseño_base.psd
```

Los nombres son ejemplos; los resultados conservan el nombre base de
cada archivo. Si ya existe un archivo con el mismo nombre en la carpeta
`redimensionado`, Photoshop puede reemplazarlo. Revisa esa carpeta antes
de volver a ejecutar el proceso.

## Configuración del tamaño

Al inicio del archivo JSX se encuentran estas variables:

``` javascript
var ANCHO_CM = 7.5;
var ALTO_CM = 16.5;
var RESOLUCION_DPI = 300;
```

Puedes modificar sus valores para otro formato. Por ejemplo, cambia
`ANCHO_CM` y `ALTO_CM` si tu proceso de producción requiere medidas
distintas. Guarda el archivo y vuelve a ejecutarlo desde Photoshop.

## Limitaciones y recomendaciones

-   El script procesa archivos que estén directamente dentro de la
    carpeta seleccionada; no busca imágenes en subcarpetas.
-   La transformación fija de ancho y alto puede alterar la proporción
    de diseños con dimensiones diferentes.
-   La calidad final depende también de las dimensiones en píxeles y de
    la calidad del archivo de origen.
-   Revisa visualmente las imágenes procesadas antes de imprimirlas o
    utilizarlas en la producción de fundas.
-   Prueba primero con copias de unos cuantos archivos.

## Uso como referencia académica

Este repositorio puede documentarse en una tesis como una herramienta de
automatización desarrollada para estandarizar una etapa del flujo de
preparación de imágenes. Para sustentar una afirmación sobre su impacto,
conviene medir y registrar datos propios, por ejemplo:

-   Tiempo de preparación manual frente al tiempo con el script.
-   Cantidad de archivos procesados por lote.
-   Número de errores o ajustes manuales antes y después de automatizar.
-   Cumplimiento de las dimensiones y resolución requeridas.

No se deben afirmar mejoras de productividad sin realizar y documentar
las mediciones correspondientes.

Si se cita en una tesis, incluye el nombre del autor o responsable, el
título del repositorio, la fecha de publicación o consulta, la versión o
commit utilizado y la URL permanente del repositorio. Cuando el trabajo
se estabilice, crea una versión etiquetada (release) para identificar
exactamente el código evaluado.

### Ejemplo de referencia bibliográfica

Adapta este modelo a la norma solicitada por tu institución (por
ejemplo, APA 7) y sustituye los campos entre corchetes por los datos
reales:

> \[Apellido, Inicial\]. (\[Año\]). *Redimensionamiento por lotes de
> imágenes en Adobe Photoshop* (\[versión o commit\]) \[Código fuente\].
> GitHub. \[URL del repositorio\]

No uses este ejemplo como referencia final hasta completar los datos
reales del autor, año, versión y enlace.

## Publicación y mantenimiento

1.  Crea un repositorio en GitHub.
2.  Usa un nombre descriptivo, por ejemplo
    `redimensionamiento-imagenes-photoshop`.
3.  Añade `redimensionar_imagenes.jsx` y `README.md`.
4.  Verifica que el repositorio no contenga imágenes de clientes, datos
    personales ni archivos confidenciales.
5.  Si deseas que sea consultable públicamente, configura el repositorio
    como **Public**.
6.  Guarda el enlace del repositorio y la versión concreta que
    utilizarás como referencia en la tesis.

## Licencia

Este repositorio no incluye una licencia de uso por defecto. Si deseas
permitir que otras personas reutilicen, modifiquen o distribuyan el
código, selecciona una licencia y añádela al repositorio. Publicarlo en
GitHub no significa automáticamente que otros tengan permiso para
reutilizarlo.
