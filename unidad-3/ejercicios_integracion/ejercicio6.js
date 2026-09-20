function ejercicio6( canvas, figura ){
	let ctx = canvas.getContext('2d');
	
	if(figura.tipo === "circulo") {
            ctx.beginPath();
            ctx.arc(figura.x,figura.y,figura.radio, 0,2 * Math.PI);
            ctx.stroke();
        }

    if(figura.tipo === "poligono") {
            ctx.beginPath();
            ctx.moveTo(figura.puntos[0].x,figura.puntos[0].y);        
            for(let i=1;i<figura.puntos.length;i++) {
                ctx.lineTo(figura.puntos[i].x,figura.puntos[i].y);    
            }
            ctx.closePath();
            ctx.stroke();
        }}

