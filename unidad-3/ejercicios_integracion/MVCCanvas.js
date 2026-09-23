class Model extends EventTarget {
    constructor() {
        super();
        this.figuras = [];
    }
    
    changed() {
        this.dispatchEvent(new CustomEvent('changed'));
    }
    
    addFigura(figura) {   
        this.figuras.push(figura);
        this.changed();
    }
    
    clear() {
        this.figuras = [];
        this.changed();
    }
}

class View extends HTMLElement {
    constructor() {
        super();
        this._canvas = document.createElement('canvas');
        this._canvas.width = 800;
        this._canvas.height = 600;
        this._canvas.style.border = '1px solid black';
        this.ctx = this._canvas.getContext('2d');
        
        // Crear contenedor para los controles
        this._controls = document.createElement('div');
        this._controls.style.margin = '10px 0';
        
        // Input para tipo de línea
        this._lineTypeLabel = document.createElement('label');
        this._lineTypeLabel.textContent = 'Tipo de línea: ';
        this._lineTypeSelect = document.createElement('select');
        this._lineTypeSelect.innerHTML = `
            <option value="solid">Continua</option>
            <option value="dashed">Punteada</option>
            <option value="dotted">Discontinua</option>
        `;
        this._controls.appendChild(this._lineTypeLabel);
        this._controls.appendChild(this._lineTypeSelect);
        this._controls.appendChild(document.createTextNode('  ')); 
        
        // Input para grosor de línea
        this._lineWidthLabel = document.createElement('label');
        this._lineWidthLabel.textContent = 'Grosor (px): ';
        this._lineWidthInput = document.createElement('input');
        this._lineWidthInput.type = 'number';
        this._lineWidthInput.min = '1';
        this._lineWidthInput.max = '50';
        this._lineWidthInput.value = '2';
        this._lineWidthInput.style.width = '60px';
        this._controls.appendChild(this._lineWidthLabel);
        this._controls.appendChild(this._lineWidthInput);
        
        this.appendChild(this._controls);
        this.appendChild(this._canvas);
    }
    
    cargarFigura6(){    
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
    
    cargarFigura12() {    
        let texto = prompt("Ingrese JSON");  
        if (texto === null) {
            return;
        }
        try {   
            let figura = JSON.parse(texto);
            
            // Anexar propiedades de estilo de línea desde los inputs
            figura.lineWidth = parseInt(this._lineWidthInput.value);
            figura.lineType = this._lineTypeSelect.value;
            
            this.dispatchEvent(new CustomEvent('request', { detail: figura }));
        }
        catch (error) {
            alert("El JSON ingresado no es válido.");
        }
    }
    
    solicitarLimpieza() {
        this.dispatchEvent(new CustomEvent('clear'));
    }
    
    render(figuras) {
        this.clear();
        for (const fig of figuras) {
            ejercicio12(this._canvas, fig);
        } 
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
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
        this._onViewClear = this.onViewClear.bind(this);
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
    
    onModelChanged() {
        this._view.render(this._model.figuras);      
    }
    
    onViewRequest(event) {
        this._model.addFigura(event.detail);
    }
    
    onViewClear() {
        this._model.clear();
    }
}
