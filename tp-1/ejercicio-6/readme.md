# ejercicio 6
## Web component tabla clima Mar del Plata

El component tabla-clima-mardelplata muestar la tabla completa de valores de temperatura, sol, precipitaciones y humedad, historicos y ofrece el método obtenerPromedioGeneralTemperaturas() que calcula el promedio de todas la temperaturas.
```js
obtenerPromediosTemperaturas() {
                // Filas para el promedio 0 a 4
                var filasTemperatura = [0, 1, 2, 3, 4];
                var sumaTotal = 0;
                var contador = 0;
                var detalle = {};
                filasTemperatura.forEach(function(indice) {
                    // El valor anual es el último elemento del array (12 de c/fila)
                    var valorAnual = DATOS_CLIMA.filas[indice].valores[12];
                    sumaTotal += valorAnual;
                    contador++;
                });
                var promedioGeneral = sumaTotal / contador;
                return {
                    detalle: detalle,
                    promedio_general: promedioGeneral.toFixed(2)
                };
```

Al final lo muestra usando  ```PromDiv``` como si fuera un cartel de prueba, para no usar innerHTML
1. Creamos un nuevo div (PromDiv).
2. Le ponemos texto que dice: 'Promedio General de Temperaturas: ' + resultado.promedio_general + ' °C'
3. Lo agregamos al body de la página (document.body.appendChild(PromDiv)).