# Ejercicio 10

## Crear un WebComponent que cubra toda la pantalla con un mensaje grande: "Arrastre un archivo aquí" — como una zona de drop 

* El usuario arrastra y suelta el CSV (que exportó con el componente del ejercicio 8) sobre esa zona.
* El componente lee el CSV, lo interpreta y muestra una gráfica con los datos meteorológicos.
* Es un lector de CSV con drag & drop que grafica los datos.

## Biblioteca usada:
```js
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
  ```

## Qué hace ?
1. Muestra una pantalla completa oscura con el texto grande "Arrastre un archivo aquí" y un ícono animado flotando.
2. Cuando se arrastra el CSV dentro, y se suelta, el programa lee y parsea el CSV.
* El método _parsearCSV hace esto manualmente. Toma el texto del archivo y lo convierte en un objeto JavaScript utilizable.
* Una vez que tenemos el objeto JS, se lo pasamos a Chart.js, que se encarga de dibujar todo sobre un elemento < canvas >.
3. La zona de drop desaparece y aparece el gráfico de líneas con Chart.js.
4. El grafico muestra arriba chips/botones por cada fila del CSV (Temp. max., Temp. media, Precipitación, etc.).
5. Se puede clickear cada chip para agregar o quitar series del gráfico.
6. El botón "Cargar otro CSV" vuelve a mostrar la pantalla de drop