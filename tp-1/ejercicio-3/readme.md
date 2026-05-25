## ejercicio 3
# Ecualizador de Sonido

## Que hace:
WebComponent que simula un ecualizador gráfico de audio estilo retro.
Permite:
- Visualizar 10 bandas de frecuencia (desde 32Hz hasta 16.5kHz)
- Ajustar cada banda mediante sliders verticales en un rango de -12dB a +12dB
- Guardar o eliminar presets personalizados
- Obtener y establecer programáticamente los datos del ecualizador mediante una **API pública**

## Construcción del DOM con `document.createElement()`
Todos los elementos se crean dinámicamente en el método `_buildDOM()` usando `document.createElement()` y se almacenan como referencias en `this.` (ej: `this.slidersArea`, `this.presetInput`). Esto permite:
- Acceso directo a los elementos desde cualquier método del componente
- Mejor rendimiento al evitar consultas repetidas al DOM
- Código más mantenible y orientado a objetos

## Sliders verticales 
Como los navegadores no soportan los input rango vertical `<input type="range" orientation="vertical">`. Se utilizó rotación forzada en el CSS:
```css
input[type=range] {
  transform: rotate(-90deg);
  width: 120px;
  margin: 55px 0;
}
```
Esto rota visualmente el slider horizontal 90 grados para simular uno vertical, manteniendo la funcionalidad

## Gestión de estado con _eqData
El componente mantiene un objeto de estado interno privado (this._eqData) que contiene:
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
`setData(newData)`: Permite inyectar nuevos datos desde fuera. Llama a `_render()` para actualizar la interfaz visual instantaneamente, sin tener que recargar la página.

## Encapsulamiento con Shadow DOM
Todo el HTML, CSS y JavaScript vive dentro de `this.attachShadow({ mode: 'open' })`. 
- Los estilos no se filtran al resto de la página
- El código externo no puede acceder accidentalmente a los elementos internos
- El componente es portable y reutilizable en cualquier proyecto


# CORRECCIONES hechas a pedido del profesor

*  Se movió la ejecución de _buildDOM() y _render() al constructor para asegurar que la estructura visual se genere al instanciar el componente.

* Eliminación de _attachEvents(): Se eliminó ese método. Ahora las asignaciones se hacen directamente en el connectedCallback.

* Se  usa .bind(this) (this._onSliderInput.bind(this)).

* se reemplazaron funciones anónimas porvmétodos  con nombres claros (_onSliderInput, _onSavePreset, etc.).

* Se añadió en el disconnectedCallback la limpieza de los handlers (= null). 

