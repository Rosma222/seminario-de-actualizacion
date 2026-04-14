# Calculadora Web component

1. Crear la clase MiCalculadora

```javascript
class MiCalculadora extends HTMLElement {
    constructor() {
        super(); // ← Siempre primero
        // Acá creo todos los elementos con JS
    }
} 
```
2. Crear elementos dinámicamente: En lugar de HTML estático, se usa document.createElement():

```javascript
this.display = document.createElement('input');
this.display.type = 'text';
this.display.disabled = true;

this.btn7 = document.createElement('button');
this.btn7.innerText = '7';
this.btn7.className = 'btn-numero'; 
```

3. Armar la tabla con JavaScript

```javascript
_construirTabla() {
    const tr = document.createElement('tr');
    tr.appendChild(this._crearTd(this.btn7));
    tr.appendChild(this._crearTd(this.btn8));
    // ... etc
    this.table.appendChild(tr);
} 
```
4. Mover la lógica dentro de la clase: Las funciones onBtnXClick ahora son métodos de la clase
```javascript
onBtn7Click() {
    this.display.value += '7';
}
```

5. Usar connectedCallback() para eventos
```javascript
connectedCallback() {
    this.btn7.onclick = this.onBtn7Click.bind(this);
    // ... resto de eventos
}
```
6. Registrar y usar el componente
```javascript
customElements.define('mi-calculadora', MiCalculadora);
```
```html
<body>
    <mi-calculadora></mi-calculadora>
</body>
```


### Antes vs. Ahora

- HTML estático > Elementos creados con document.createElement()
- JS global > JS encapsulado en class MiCalculadora
- window.onload = main > connectedCallback() del Web Component
- < table>... < /table>  >  < mi-calculadora> / < mi-calculadora>

# Beneficios :
- Reutilización: se puede poner <mi-calculadora> múltiples veces en la página
- Encapsulamiento: Toda la lógica vive dentro de la clase
- Mantenibilidad: Más fácil de modificar y extender
- Estándar web: Compatible con toda la web