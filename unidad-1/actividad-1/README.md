## Calculadora en HTML, CSS y JavaScript

Calculadora con las operaciones básicas utilizando tecnologías HTML, CSS y JavaScript.

## Características 
** Operaciones básicas: Suma, resta, multiplicación y división.

** Gestión de decimales: Soporta números flotantes.

** Protección de errores: Manejo de división por cero y redondeo para evitar errores de coma.

## Estructura
El código está organizado en tres capas principales dentro de un único archivo:

1. Estructura (HTML) Utiliza una tabla (<table>) para organizar los botones de forma cuadriculada, como el teclado de una calculadora física. El componente principal es un <input> de tipo texto con el atributo readonly, para impidir que el usuario escriba directamente y así usar los botones.
2. Estilo (CSS) Flexbox en el body para que la calculadora esté siempre centrada. Los botones tienen efectos active que simulan el click de la tecla. Colores: Azul: Números y coma. Verde: Operadores. Naranja: Signo igual (=).Rojo: borrado.
3. Lógica (JavaScript) su estado es gestionado por 4 variables: 
valorActual: Lo que se muestra en pantalla.
valorAnterior: El primer número almacenado antes de presionar un operador.
operacion: El símbolo de la operación deseada
debeResetearDisplay: Un booleano que decide si el próximo número debe añadirse o reemplaza al actual.

## Funciones:
agregarNumero() Gestiona la entrada de dígitos

agregarOperacion() Guarda el valor actual, define la operación y prepara el display para el segundo número.

calcular() Realiza la operacion con un switch y un redondeo de 8 decimales.

borrar() Resetea todas las variables.
