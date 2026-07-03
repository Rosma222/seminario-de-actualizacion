## Ejercicio 5b  
## Refactory del ejercicio 5a - Factura AFIP
Ahora se le integra un botón que permite renderizar la factura como PDF de manera directa.

Al presionar "DESCARGAR PDF" va a:
* obtener los datos del formulario
* crear un PDF
* escribir texto línea por línea
* descargarlo

## Pasos
1. Agregar libreria jsPDF
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

2. Agregar boton ```BtnPDF``` dentro de crearFormulario().
```js
// BOTÓN GENERAR PDF
    this.btnPDF = document.createElement('button');
    this.btnPDF.type = 'button';
    this.btnPDF.textContent = 'Generar PDF';
    this.btnPDF.className = 'btn-pdf';
    
    this.contenedor.appendChild(this.btnPDF);
```
3. Metodo generarPDF()
```js
 generarPDF() {
    // Validamos que los campos estén completos
    if (!this.validarFormulario()) {
      alert('Por favor, complete todos los campos requeridos');
      return;
    }   
    // jsPDF se carga por CDN y cuelga de window.jspdf.jsPDF
    if (typeof window.jspdf === 'undefined') {
      alert('No se pudo cargar la librería jsPDF. Verifique su conexión a internet.');
      return;
    }    
    var datos = this.obtenerDatosFormulario();
    var JsPdfCtor = window.jspdf.jsPDF;
    var doc = new JsPdfCtor();
    var y = 20;    
    // Encabezado
    .....
    // Datos del cliente
    ....   
    // Encabezado de la tabla de items
    .....   
    // Filas de items
   .....    
    // Totales
   ...   
    doc.save('factura_' + datos.numeroFactura + '.pdf');
  }
```