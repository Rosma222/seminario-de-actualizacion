class Model extends EventTarget {
    constructor() {
        super();
        this._src = '';  
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

    //dibuja la imagen escalada al ancho y alto del canvas
    mostrarImagenEscalada(image) {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.drawImage(image, 0, 0, this._canvas.width, this._canvas.height);
    }

    //limpia el lienzo
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
        this._view.mostrarImagenEscalada(this._image);
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

    myController.enable();
    document.body.appendChild(myView);
}
window.onload = main;