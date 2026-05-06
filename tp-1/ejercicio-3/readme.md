## ejercicio 3
# Ecualizador de Sonido

## Que hace:
WebComponent que simula un ecualizador gráfico de audio estilo retro.
Permite:
- Visualizar 10 bandas de frecuencia (desde 32Hz hasta 16.5kHz)
- Ajustar cada banda mediante sliders verticales en un rango de -12dB a +12dB
- Guardar o eliminar presets personalizados

## Construcción del DOM con `document.createElement()`
Todos los elementos se crean dinámicamente en el método `_buildDOM()` usando `document.createElement()` y se almacenan como referencias en `this.` (ej: `this.slidersArea`, `this.presetInput`). Esto permite:
- Acceso directo a los elementos desde cualquier método del componente
- Evitar consultas repetidas al DOM
- Código orientado a objetos

## Sliders verticales 
Como los navegadores no soportan los input rango vertical `<input type="range" orientation="vertical">`. Se utilizó rotación forzada en el CSS:
```css
input[type=range] {
  transform: rotate(-90deg);
  width: 120px;
  margin: 55px 0;
}
```
Rota visualmente el slider horizontal 90 grados para simular uno vertical.

## Gestión de estado con _eqData
El web componente mantiene un objeto privado (this._eqData) que contiene:
```js
{
  presetName: 'Custom',
  bands: [
    { freq: '32Hz', value: 0 },
    { freq: '64Hz', value: 0 },
    // ... etc ..
  ]
} 
```
## Métodos públicos getData() y setData()
`getData()`: Devuelve una copia del estado actual usando `JSON.parse(JSON.stringify(...))` para evitar que el código externo modifique accidentalmente el estado interno del componente.
`setData(newData)`: Permite inyectar nuevos datos desde fuera. Llama a `_render()` para actualizar la interfaz visual, sin tener que recargar la página.

## Renderizado dinámico con _render()
Cada vez que cambian los datos :
- Limpia el contenedor de sliders (`this.slidersArea.innerHTML = ''`)
- Reconstruye todos los sliders basándose en `this._eqData.bands`
- Actualiza las etiquetas de dB y nombre del preset
Asi asegura que la GUI siempre esté sincronizada con los datos.

## Eventos delegados en el contenedor
En lugar de agregar un event listener a cada slider individual, se usa event delegation:
```js
this.slidersArea.addEventListener('input', (e) => {
  if (e.target.type === 'range') {
    // Manejar el cambio
  }
});
```

## Encapsulamiento con Shadow DOM
Todo el HTML, CSS y JavaScript vive dentro de `this.attachShadow({ mode: 'open' })`:
- Los estilos no se filtran al resto de la página
- El código externo no puede acceder a los elementos internos
- El component reutilizable 

