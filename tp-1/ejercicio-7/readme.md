# Ejercicio 7
## Extensión del web component de ejercicio 6- Tabla clima Mar del Plata

Se agrega un botón que permita alternar la visualización de temperaturas de (ºC) a (ºF) y viceversa.

## Cambios hechos:
1. Estado interno _unidad. El WebComponent guarda en this._unidad si está mostrando 'C' o 'F', para saber hacia dónde convertir al presionar el botón.
2. Referencias guardadas en _render() Durante el renderizado se guardan en arrays (_celdasTemp y _labelsTemp) los nodos <td> y <th> de las 5 filas de temperatura. Esto permite actualizar solo esas celdas sin re-renderizar toda la tabla.
3. Método _alternarUnidad() Recorre las referencias guardadas y, según el estado actual:

* Si está en °C → aplica (c × 9/5) + 32 y actualiza el texto del label a labelF
* Si está en °F → restaura los valores originales de DATOS_CLIMA y el label a label

4. El botón se crea con document.createElement('button') y se asigna btn.onclick = function() { ... } 
5. labelF en los datos. Cada fila de temperatura tiene un labelF con el texto (°F) para actualizar correctamente el encabezado de la fila al convertir.
6. Para que también modificara el "Promedio General de Temperaturas: " (PromDiv) debí moverlo para que ahora se cree dentro de _render(), como parte del propio componente, y se guarde en this._promDiv, ya que sino  _alternarUnidad() no podía actualizarlo.
7. main() queda simplificado, solo llama al método para loguear el resultado en consola