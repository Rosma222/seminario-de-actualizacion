# Formulario de factura AFIP en webcomponent

## Estructura Principal:
1. constructor(): Solo inicializar el Shadow DOM y variables. 
- Creamos un "Shadow DOM" (una cápsula aislada para que los estilos no se mezclen)
- Inicializamos un array vacío para guardar los items
- connectedCallback(): Crear y renderizar el contenido cuando el componente se inserta en el DOM.
- disconnectedCallback(): Limpieza cuando se remueve del DOM (si necesita liberar recursos).
- Llamamos a los métodos que crean el formulario y los estilos
2. ```crearFormulario()```: construimos TODO el formulario usando solo métodos del DOM:
- document.createElement('div') → crea un div
- appendChild() → agrega un elemento dentro de otro
- setAttribute() → pone atributos (aunque usamos propiedades directas)
- Dividimos el formulario en secciones:
  - Datos del Cliente: razón social, domicilio, CUIT
  - Datos de la Factura: tipo (B), fecha, número
  - Items: productos/servicios (se pueden agregar varios)
  - Totales: subtotal, impuestos, total (calculados automáticamente)
- Botón Facturar: genera la factura en otra pestaña
3.  ```agregarItem()```: Crea un nuevo grupo de campos para un producto:
    - Código, descripción, cantidad, precio
    - Botón para eliminarlo
    - Cada vez que cambia la cantidad o el precio, se recalculan los totales
4. ```eliminarItem()```: Borra un item del formulario (siempre que quede al menos uno)
5. ```calcularTotales()```: Recorre todos los items multiplica cantidad × precio de cada uno
   - Suma todo para obtener el subtotal
   - Calcula el 21% de IVA
   - Suma subtotal + IVA = total
   - Actualiza los campos de solo lectura
6. ```generarFactura()```: Valida que todos los campos estén completos, recoge todos los datos del formulario y
Genera un HTML completo con la factura
 - Abre una nueva pestaña (window.open('', '_blank'))
 - Escribe el HTML en esa pestaña
 - generarHTMLFactura(datos): Crea un string con TODO el HTML de la factura. Incluye estilos CSS para que se vea similar a una factura real
 - Muestra:
   - Logo "AFIP" y tipo de factura (B) en grande
   - Número y fecha de factura
   - Datos del cliente
   - Tabla con todos los items
   - Totales al final