class Model extends EventTarget {
    constructor() {
        super();
        this.figuras = []; //almacena array de figuras        
    }
   
    changed() {
        this.dispatchEvent(new CustomEvent('changed'));
    }

    addFigura(figura) {   
        this.figuras.push(figura); //agrega la figura al array de figuras
        this.changed();
    }
    
    clear() {       //limpia el array de figuras
        this.figuras = [];
        this.changed();
    }
}

class View extends HTMLElement {
    constructor() 
    {
        super();
        this._canvas = document.createElement('canvas');
        this._canvas.width = 800;
        this._canvas.height = 600;
        this._canvas.style.border = '1px solid black';
        this.ctx = this._canvas.getContext('2d');

        this.appendChild(this._canvas);
    }
    
    cargarFigura(){    
        let texto = prompt("Ingrese JSON");  
        if(texto === null){    // Si presiono Cancelar no hace nada
            return;
        }
        try{   
        let figura = JSON.parse(texto);    // Convertimos el texto JSON en objeto
        this.dispatchEvent(new CustomEvent( 'request',{ detail: figura}));
        }
    
        catch(error){
            alert("El JSON ingresado no es válido."); //x Si el JSON está mal escrito
        }
    }

    solicitarLimpieza(){
        this.dispatchEvent(new CustomEvent( 'clear')); //Solicita al controlador limpiar el canvas
    }


    render( figuras ){   // Recibe el array de figuras y las dibuja en el canvas
        this.clear();
        for ( const fig of figuras) {  //fig: 1objeto q representa 1figura
            ejercicio6(this._canvas, fig);  // Llama la función ejercicio6 p/dibujar c/figura
        } 
    }

    clear(){
        this.ctx.clearRect(0,0,this._canvas.width,this._canvas.height );
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
        this._onViewRequest = this.onViewRequest.bind(this);
        this._onViewClear   = this.onViewClear.bind(this);
    }

    enable() {
        this._model.addEventListener('changed', this._onModelChanged);
        this._view.addEventListener('request', this._onViewRequest);
        this._view.addEventListener('clear', this._onViewClear);
    }

    disable() {
        this._model.removeEventListener('changed', this._onModelChanged);
        this._view.removeEventListener('request', this._onViewRequest);
        this._view.removeEventListener('clear', this._onViewClear);
    }

    onModelChanged() {   // Le pasamos todas las figuras a la View
        this._view.render(this._model.figuras );      
    }

    onViewRequest(event) {
            this._model.addFigura(event.detail);
        }

    onViewClear() {
        this._model.clear();
    }
}