//rectangulo en el centro del area de dibujo con rotate(Math.PI / 4).

class Model extends EventTarget {
    constructor() {
        super();
        this._angulo = 0;
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

    //Dibuja un rectangulo de 200x100 centrado
    //aplicando solo rotate(angulo). La rotacion es respecto al origen (0,0) del canvas,
    //por eso el rectangulo se desplaza en arco y no gira sobre su propio centro.
    showRotatedRectangulo(angulo) {
        let width = 200;
        let height = 100;
        let x = (this._canvas.width - width) / 2;
        let y = (this._canvas.height - height) / 2;

        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        //Referencia: rectangulo SIN rotar contorno punteado
        this._ctx.save();
        this._ctx.setLineDash([6, 4]);
        this._ctx.strokeStyle = 'gray';
        this._ctx.strokeRect(x, y, width, height);
        this._ctx.restore();

        //rectangulo rotado
        this._ctx.save();
        this._ctx.rotate(angulo);
        this._ctx.fillStyle = 'steelblue';
        this._ctx.fillRect(x, y, width, height);
        this._ctx.restore(); //la rotacion no afecta a lo que se dibuje despues
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
        this._view.showRotatedRectangulo(this._model.angulo);
    }

    disable() {
        this._model.removeEventListener('changed', this._onModelChanged);
    }

    onModelChanged() {
        this._view.showRotatedRectangulo(this._model.angulo);
    }
}

function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);

    myModel.angulo = Math.PI / 4; //45 grados 

    myController.enable();
    document.body.appendChild(myView);
}
window.onload = main;