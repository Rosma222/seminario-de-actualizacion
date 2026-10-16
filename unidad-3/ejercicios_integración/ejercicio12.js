function ejercicio12(canvas, figura) {
    let ctx = canvas.getContext('2d');
    
    // Aplicar propiedades de estilo de línea
    ctx.lineWidth = figura.lineWidth || 2;  // Valor predeterminado de 2 si no se proporciona
    
    // Configurar el patrón de línea según el tipo
    if (figura.lineType === 'dashed') {
        ctx.setLineDash([10, 5]); // 10px línea, 5px espacio
    } else if (figura.lineType === 'dotted') {
        ctx.setLineDash([3, 3]); // 3px línea, 3px espacio
    } else {
        ctx.setLineDash([]); // Línea sólida
    }
    
    if (figura.tipo === "circulo") {
        ctx.beginPath();
        ctx.arc(figura.x, figura.y, figura.radio, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    if (figura.tipo === "poligono") {
        ctx.beginPath();
        ctx.moveTo(figura.puntos[0].x, figura.puntos[0].y);        
        for (let i = 1; i < figura.puntos.length; i++) {
            ctx.lineTo(figura.puntos[i].x, figura.puntos[i].y);    
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    // Restaurar el patrón de línea para no afectar otros dibujos
    ctx.setLineDash([]);
}