// imagen con 3 filtros nativos simultaneos dentro de save()/restore(),
//sin que los filtros afecten a las figuras que se dibujan despues.

class Model extends EventTarget {
    constructor() {
        super();
        this._src = '';
        this._x = 0;
        this._y = 0;
        this._filter = 'none';
    }

    set src(new_src) {
        if (this._src !== new_src) {
            this._src = new_src;
            this.changed();
        }
    }

    get src() {
        return this._src;
    }

    set x(new_x) {
        if (this._x !== new_x) {
            this._x = new_x;
            this.changed();
        }
    }

    get x() {
        return this._x;
    }

    set y(new_y) {
        if (this._y !== new_y) {
            this._y = new_y;
            this.changed();
        }
    }

    get y() {
        return this._y;
    }

    set filter(new_filter) {
        if (this._filter !== new_filter) {
            this._filter = new_filter;
            this.changed();
        }
    }

    get filter() {
        return this._filter;
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

    //dibuja la imagen en (x, y) aplicando el filtro indicado.
    //El filtro vive solo dentro del bloque save()/restore().
    mostrarImagenFiltrada(image, x, y, filter) {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._ctx.save();
        this._ctx.filter = filter;
        this._ctx.drawImage(image, x, y);
        this._ctx.restore(); //vuelve al estado anterior: el filtro ya no esta activo
    }

    //Aqui se dibujan un circulo y un rectangulo x fuera del bloque save / DESPUES del restore.
    //para comprobar, si se ven nitidas el filtro no se paso .
    mostrarFigurasPrueba() {
        this._ctx.fillStyle = 'pink';
        this._ctx.fillRect(500, 100, 200, 100);

        this._ctx.beginPath();
        this._ctx.arc(600, 350, 80, 0, 2 * Math.PI);
        this._ctx.fillStyle = 'lightblue';
        this._ctx.fill();
        this._ctx.stroke();
    }

    clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
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
        this._image = null;
        this._onModelChanged = this.onModelChanged.bind(this);
        this._onImageLoad = this.onImageLoad.bind(this);
        this._onImageError = this.onImageError.bind(this);
    }

    enable() {
        this._model.addEventListener('changed', this._onModelChanged);
        this._cargarImagen();
    }

    disable() {
        this._model.removeEventListener('changed', this._onModelChanged);
        if (this._image !== null) {
            this._image.onload = null;
            this._image.onerror = null;
            this._image = null;
        }
    }

    //Crea el objeto Image y pide la carga de la textura segun el estado del modelo
    _cargarImagen() {
        if (this._model.src === '') {
            this._view.clear();
            return;
        }

        if (this._image !== null) {
            this._image.onload = null;
            this._image.onerror = null;
        }

        this._image = new Image();
        this._image.onload = this._onImageLoad;
        this._image.onerror = this._onImageError;
        this._image.src = this._model.src; //el src se asigna al final: la carga inicia aqui
    }

    onModelChanged() {
        this._cargarImagen();
    }

    //Solo cuando la textura termino de cargar es seguro dibujarla
    onImageLoad() {
        this._view.mostrarImagenFiltrada(this._image, this._model.x, this._model.y, this._model.filter);
        this._view.mostrarFigurasPrueba();
    }

    onImageError() {
        console.error('No se pudo cargar la imagen: ' + this._model.src);
    }
}

function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);

    myModel.src = 'PyF.png'; 
    myModel.x = 50;
    myModel.y = 100;
    myModel.filter = 'brightness(120%) contrast(150%) blur(2px)';

    myController.enable();
    document.body.appendChild(myView);
}
window.onload = main;