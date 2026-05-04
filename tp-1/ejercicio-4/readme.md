## Ejercicio 4
# Mensajes de Chat

## Que hace:
Web Component que simula una app de mensajería por chat con una estructura basada en el ejemplo de W3Schools (burbuja izquierda para el otro, burbuja derecha para uno mismo, imagen de avatar, timestamp). 

## Estructura 
- En el constructor() se crean todos los elementos con `document.createElement()` y se guardan como propiedades en `this`. Luego se configuran los estilos y se arman las jerarquías con `appendChild`. 
 Toda la creación de elementos y configuración de estilos vive acá. Cada subelemento es una propiedad de this (ej: `this.messagesArea`, `this.textInput`), lo que permite que otros métodos los accedan sin problema.

- En este ejemplo no utilicé Shadow DOM, todo directo al elemento.
- El método `addMessage(text, sender, time)` arma la burbuja según el valor de sender ('me' u 'other'), a la derecha (azul) o a la izquierda (gris), y la inserta en `this.messagesArea`. También hace auto-scroll.
- `connectedCallback()` conecta los event listeners (botón y tecla Enter) recién cuando el elemento ya está en el DOM
Se usa `bind(this)` en el onclick del botón, que es lo que diferencia a un WebComponent de una función común: se necesita que this dentro del handler apunte a la instancia del componente, no al elemento que disparó el evento.
- `disconnectedCallback()` limpia los listeners al remover el elemento.

