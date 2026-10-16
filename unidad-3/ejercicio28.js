// translate(x, y) + rotate(angulo), en ese orden estricto,
//para que un poligono rote sobre su propio centro geometrico.

class Model extends EventTarget {
    constructor() {
        super();
        this._puntos = [];
        this._angulo = 0;
    }

    set puntos(new_puntos) {
        if (this._puntos !== new_puntos) {
            this._puntos = new_puntos;
            this.changed();
        }
    }

    get puntos() {
        return this._puntos;
    }

    set angulo(new_angulo) {
        if (this._angulo !== new_angulo) {
            this._angulo = new_angulo;
            this.changed();
        }
    }

    get angulo() {
        return this._angulo;
    }

    changed() {
        this.dispatchEvent(new CustomEvent('changed'));
    }
}

class View extends HTMLElement {
    constructor() {
        super();
        this._canvas = document.createElement('canvas');
        this._canvas.width = 800;
        this._canvas.height = 600;
        this._canvas.style.border = '1px solid black';

        this._ctx = this._canvas.getContext('2d');

        this.appendChild(this._canvas);
    }

    //Centro geometrico del poligono: promedio de sus vertices
    _centerOf(puntos) {
        let sumX = 0;
        let sumY = 0;
        for (let i = 0; i < puntos.length; i++) {
            sumX += puntos[i].x;
            sumY += puntos[i].y;
        }
        return { x: sumX / puntos.length, y: sumY / puntos.length };
    }

    //Dibuja el poligono rotado 'angulo' sobre su propio centro.
    //- translate: el origen del sistema de coordenadas pasa a ser el centro del poligono.
    //-  rotate: como el origen ya es el centro, el giro ocurre sobre el propio poligono.
    //Los vertices se dibujan relativos a ese centro (se les resta el centro).
    showRotatedPolygon(puntos, angulo) {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        if (puntos.length < 3) {
            return;
        }

        let center = this._centerOf(puntos);

        this._ctx.save();
        this._ctx.translate(center.x, center.y);
        this._ctx.rotate(angulo);

        this._ctx.beginPath();
        this._ctx.moveTo(puntos[0].x - center.x, puntos[0].y - center.y);
        for (let i = 1; i < puntos.length; i++) {
            this._ctx.lineTo(puntos[i].x - center.x, puntos[i].y - center.y);
        }
        this._ctx.closePath();

        this._ctx.fillStyle = 'steelblue';
        this._ctx.fill();
        this._ctx.stroke();

        this._ctx.restore(); //la traslacion y la rotacion no afectan a lo que se dibuje despues
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }
}
customElements.define('x-view', View);


class Controller {
    constructor(view, model) {
        this._view = view;
        this._model = model;
        this._onModelChanged = this.onModelChanged.bind(this);
    }

    enable() {
        this._model.addEventListener('changed', this._onModelChanged);
        this._view.showRotatedPolygon(this._model.puntos, this._model.angulo);
    }

    disable() {
        this._model.removeEventListener('changed', this._onModelChanged);
    }

    onModelChanged() {
        this._view.showRotatedPolygon(this._model.puntos, this._model.angulo);
    }
}

function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);

    //Pentagono regular de radio 120 con centro en (500, 250)
    let puntos = [];
    for (let i = 0; i < 5; i++) {
        let a = -Math.PI / 2 + i * 2 * Math.PI / 5;
        puntos.push({ x: 500 + 120 * Math.cos(a), y: 250 + 120 * Math.sin(a) });
    }

    myModel.puntos = puntos;
    myModel.angulo = Math.PI / 4; //45 grados 

    myController.enable();
    document.body.appendChild(myView);
}
window.onload = main;