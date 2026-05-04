## Ejercicio 1
# Saludo en JavaScript y WebComponents

## Que hace:
Solicita al usuario:
1. Nombre
2. Apellido
Y muestra x pantalla:
* Apellido en MAYÚSCULAS.
* Nombre con solo la Primera letra en mayúscula, sin importar como lo ingrese el usuario
```txt
¡Buenos días APELLIDO, Nombre!
```

## 1. Crear el Web Component
```js
class SaludoApp extends HTMLElement
```

## 2. Lo registramos
```js
customElements.define('saludo-app', SaludoApp);
```

## 3. Shadow DOM
Encapsula el HTML y CSS.
```js
const shadow = this.attachShadow({ mode: 'open' });
```

## 4. Convertir apellido a mayúsculas
```js
apellido.toUpperCase()
```
## 5. Convertir el nombre con la primera en mayusculas sola y el resto no
```js
nombre.toLowerCase()
```

```js
nombre.charAt(0).toUpperCase() + nombre.slice(1)
```
