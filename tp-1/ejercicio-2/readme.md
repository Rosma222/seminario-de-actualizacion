## Ejercicio 2
# Validador de Fecha de nacimiento

## Que hace:
1. Solicita al usuario ingresar una fecha de tipo DD/MM/YYYY
2. Al hacer click en botón "validar" chequea que sea fecha válida
3. Y tiene un contador de intentos fallidos
4. si es valida sale un alert diciendo: 
```txt
"Es fecha valida"
```
6. Si se ingresa la fecha en un formato incorrecto, el alert será:
```txt
Formato inválido. Use DD/MM/YYYY. Este es su intento fallido número: X
```
7. Si no es valida porque el numero de dia o mes fue mal ingresado sale un alert diciendo: 
```txt
"FECHA INCORRECTA - Este es su intento fallido número: X"
```
8. Si no es fecha valida porque es una fecha futura el alert dirá:
```txt
"FECHA FUTURA - No puede ser fecha de nacimiento. Este es su intento fallido número: X"
```

## Obtiene fecha y hora actual del sistema:
```js
const hoy = new Date();  
```

## Fija la hora a medianoche:
De no hacerlo por ej 03/05/2026 00:00:00 sería menor que 03/05/2026 14:30:00 y marcaría como " fecha futura" un día que en realidad es hoy.
```js
hoy.setHours(0, 0, 0, 0);  
```

## El objeto Date se comparan con > o < 
Y normalizadas las horas. Si la fecha ingresada es > a hoy (futura) entra al if y se cuenta como fallido.
```js
if (fecha > hoy)  
```