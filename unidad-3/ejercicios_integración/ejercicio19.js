class CakeGraph {
    constructor(jsonData) {
        // Medidas fijas 
        this.x = 400;
        this.y = 300;
        this.radio = 200;
        
        // si no es un array, se asigna un array vacío
        this.datos = Array.isArray(jsonData.datos) ? jsonData.datos : []; 
        this.tipo = "cakegraph";
    }

    draw(ctx, lineWidth, lineType) {
        ctx.lineWidth = lineWidth;
        
        if (lineType === 'dashed') {
            ctx.setLineDash([10, 5]);
        } else if (lineType === 'dotted') {
            ctx.setLineDash([3, 3]);
        } else {
            ctx.setLineDash([]);
        }

        // Calcular el total de los datos
        let total = this.datos.reduce((acc, val) => acc + (typeof val === 'number' ? val : val.valor), 0);
        
        if (total === 0) {
            console.warn("El total es 0. No se puede dibujar el gráfico.");
            return;
        }
        
        let anguloInicio = 0;

        for (let i = 0; i < this.datos.length; i++) {
            let valor = typeof this.datos[i] === 'number' ? this.datos[i] : this.datos[i].valor;
            let anguloPorcion = (valor / total) * 2 * Math.PI;
            let anguloFin = anguloInicio + anguloPorcion;

            // Generar color HEX aleatorio 
            let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.arc(this.x, this.y, this.radio, anguloInicio, anguloFin);
            ctx.closePath();

            ctx.fillStyle = randomColor;
            ctx.fill();
            ctx.stroke(); //bordes respetando el estilo de línea

            anguloInicio = anguloFin;
        }
        
        ctx.setLineDash([]); // Restaurar estado
    }
}

function ejercicio19(canvas, figura) {
    let ctx = canvas.getContext('2d');
    
    // Verificación para CakeGraph
    if (figura && figura.tipo === "cakegraph" && typeof figura.draw === 'function') {
        figura.draw(ctx, figura.lineWidth, figura.lineType);
        return;
    }
    
    // Lógica p/ Círculo y Polígono
    ctx.lineWidth = figura.lineWidth ;
    if (figura.lineType === 'dashed') {
        ctx.setLineDash([10, 5]);
    } else if (figura.lineType === 'dotted') {
        ctx.setLineDash([3, 3]);
    } else {
        ctx.setLineDash([]);
    }
    
    if (figura.tipo === "circulo") {
        if (figura.x !== undefined && figura.y !== undefined && figura.radio !== undefined) {
            ctx.beginPath();
            ctx.arc(figura.x, figura.y, figura.radio, 0, 2 * Math.PI);
            ctx.stroke();
            } 
        } else if (figura.tipo === "poligono") {
        if (Array.isArray(figura.puntos) && figura.puntos.length > 0) {
            ctx.beginPath();
            ctx.moveTo(figura.puntos[0].x, figura.puntos[0].y);        
            for (let i = 1; i < figura.puntos.length; i++) {
                ctx.lineTo(figura.puntos[i].x, figura.puntos[i].y);    
            }
            ctx.closePath();
            ctx.stroke();
        } 
    }
    
    ctx.setLineDash([]);
}