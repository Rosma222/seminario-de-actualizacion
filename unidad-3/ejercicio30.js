//Deformacion lateral horizontal (Skew X)
//con ctx.transform(1, 0, tanX, 1, 0, 0), convierte un cuadrado en un paralelogramo

class Model extends EventTarget {
    constructor() {
        super();
        this._skewAngulo = 0;
    }

    set skewAngulo(new_angulo) {
        if (this._skewAngulo !== new_angulo) {
            this._skewAngulo = new_angulo;
            this.changed();
        }
    }

    get skewAngulo() {
        return this._skewAngulo;
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

    //dibujo un cuadrado de 150x150 en (100, 100) se aplica inclinacion oblicua sobre el eje X.
    //Matriz transform(a, b, c, d, e, f) = transform(1, 0, tan(angulo), 1, 0, 0):
    //cada punto (x, y) pasa a (x + tan(angulo) * y, y). Los puntos mas abajo (y mayor)
    //se desplazan mas hacia la derecha, y los lados horizontales se conservan.
    showSkewedSquare(skewAngulo) {
        let side = 150;
        let tanX = Math.tan(skewAngulo);

        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._ctx.save();
        this._ctx.transform(1, 0, tanX, 1, 0, 0);
        this._ctx.fillStyle = 'steelblue';
        this._ctx.fillRect(100, 100, side, side);
        this._ctx.strokeRect(100, 100, side, side);
        this._ctx.restore(); //la deformacion no afecta a lo que se dibuje despues
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
        this._view.showSkewedSquare(this._model.skewAngulo);
    }

    disable() {
        this._model.removeEventListener('changed', this._onModelChanged);
    }

    onModelChanged() {
        this._view.showSkewedSquare(this._model.skewAngulo);
    }
}

function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);

    myModel.skewAngulo = Math.PI / 6; //30 grados 
    myController.enable();
    document.body.appendChild(myView);
}
window.onload = main;