# Ejercicio 8
## Segunda extensión de ejercicio 6 - Tabla de clima de Mar del Plata

En esta extensión se pide agregar un botón que posibilite directamente la impresión y otro que permita exportar el gráfico en los siguientes formatos: PNG, CSV, PDF, Excel. Para este último caso, incorporar una librería que permita construir el archivo en ese formato. (XLS, XLSX, ODS).

## Cambios hechos:

### Bibliotecas incorporadas:
``` js
<!-- SheetJS para exportar a Excel -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<!-- html2canvas para exportar a PNG y PDF -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<!-- jsPDF para exportar a PDF -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
 ```

1. Botón "Imprimir" : Llama directamente a window.print(). Con @media print en el CSS, la barra de botones se oculta automáticamente al imprimir, quedando solo la tabla y el promedio.

2. Botón "Exportar" (menú desplegable): Un solo botón que abre un menú con 4 opciones. El estado del menú (_menuAbierto) se controla en _toggleMenu() y _cerrarMenu(). Al hacer click fuera del wrapper, se cierra solo vía document.onclick.

3. Las 4 exportaciones:
- PNG — usa html2canvas para capturar el elemento <table> como imagen y descargarlo

- CSV — construye la matriz de datos con _obtenerMatrizDatos(), escapa comas y comillas correctamente, agrega BOM (\uFEFF) para que Excel lo abra bien, y descarga el archivo        
```js          
var blob = new Blob(['\uFEFF' + lineas.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
 //esta linea significa que el archivo CSV se guardará con codificación UTF-8, lo cual es importante para que los caracteres especiales (como acentos) se muestren correctamente al abrir el archivo en programas como Excel. El prefijo '\uFEFF' es un marcador de orden de bytes (BOM) que indica que el archivo está codificado en UTF-8. Sin este prefijo, algunos programas podrían interpretar el archivo con una codificación diferente, lo que podría resultar en caracteres mal mostrados.
```

- PDF — usa html2canvas + jsPDF en orientación horizontal A4, escalando la imagen para que entre en la página con margen

- Excel — usa SheetJS (xlsx.full.min.js) con aoa_to_sheet (array of arrays), ancho de columnas configurado, y descarga .xlsx

-  _obtenerMatrizDatos() siempre respeta la unidad activa (_unidad), así que si se convirtió a °F y luego exportó, el archivo sale en °F.


# 2/7/2026 Cambios realizados:
- Constructor: Ahora contiene toda la inicialización de propiedades Y la llamada a this._render() que crea toda la estructura DOM.
- connectedCallback: Ahora contiene únicamente la asociación de los manejadores de eventos (onclick).
- Propiedades adicionales: Agregué referencias a todos los botones y elementos que necesitan eventos (_btnImprimir, _btnExportar, _exportWrapper, _opPNG, _opCSV, _opPDF, _opExcel) para poder acceder a ellos desde connectedCallback().