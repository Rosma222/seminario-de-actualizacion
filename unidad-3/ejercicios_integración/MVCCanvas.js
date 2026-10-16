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
        
        // Contenedor de controles dinámicos
        this._controlsContainer = document.createElement('div');
        this._controlsContainer.style.margin = '10px 0';
        
        this.appendChild(this._controlsContainer);
        this.appendChild(this._canvas);
        
        // para saber que controles mostrar
        this._ejercicioActual = null;
    }
    
   
    cambiarEjercicio(tipo) {
        if (this._ejercicioActual !== null && this._ejercicioActual !== tipo) {
            this.solicitarLimpieza();
        }
        this._ejercicioActual = tipo;
        this._controlsContainer.innerHTML = ''; // Limpiar controles y figuras anteriores
        
        if (tipo === 'ejercicio06') {
            // Botón cargarFigura6
            const btnCargar = document.createElement('button');
            btnCargar.textContent = 'Cargar Figura';
            btnCargar.onclick = () => this.cargarFigura06();
            this._controlsContainer.appendChild(btnCargar);
            
            
        } 
        else if (tipo === 'ejercicio12') {
            // Label y select para tipo de línea
            const labelTipo = document.createElement('label');
            labelTipo.textContent = 'Tipo de línea: ';
            const selectTipo = document.createElement('select');
            selectTipo.innerHTML = `
                <option value="solid">Continua</option>
                <option value="dashed">Punteada</option>
                <option value="dotted">Discontinua</option>
            `;
            this._controlsContainer.appendChild(labelTipo);
            this._controlsContainer.appendChild(selectTipo);
            this._controlsContainer.appendChild(document.createTextNode('  '));
            
            // Label e input para grosor
            const labelGrosor = document.createElement('label');
            labelGrosor.textContent = 'Grosor (px): ';
            const inputGrosor = document.createElement('input');
            inputGrosor.type = 'number';
            inputGrosor.min = '1';
            inputGrosor.max = '50';
            inputGrosor.value = '2';
            inputGrosor.style.width = '60px';
            this._controlsContainer.appendChild(labelGrosor);
            this._controlsContainer.appendChild(inputGrosor);
            
            // referencias para cargarFigura12 
            this._lineTypeSelect = selectTipo;
            this._lineWidthInput = inputGrosor;
            
            // Botón Cargar cargarFigura12
            const btnCargar = document.createElement('button');
            btnCargar.textContent = 'Cargar Figura';
            btnCargar.onclick = () => this.cargarFigura12();
            this._controlsContainer.appendChild(btnCargar);
        }
        else if (tipo === 'ejercicio19') {
            // Selector de figura (círculo, polígono, cakegraph)
            const selectFigura = document.createElement('select');
            selectFigura.innerHTML = `
                <option value="circulo">Círculo</option>
                <option value="poligono">Polígono</option>
                <option value="cakegraph">CakeGraph</option>
            `;
            this._controlsContainer.appendChild(selectFigura);
            this._controlsContainer.appendChild(document.createTextNode('  '));
            
            // Botón Cargar usa cargarFigura19
            const btnCargar = document.createElement('button');
            btnCargar.textContent = 'Cargar Figura';
            btnCargar.onclick = () => this.cargarFigura19(selectFigura.value);
            this._controlsContainer.appendChild(btnCargar);
        }
    }
    
    
    cargarFigura06(){   
        let texto = prompt("Ingrese JSON");  
        if(texto === null) return;
        try {   
            let figura = JSON.parse(texto);
            this.dispatchEvent(new CustomEvent('request', { detail: figura }));
        } catch(error) {
            alert("El JSON ingresado no es válido.");
        }
    }
    
    cargarFigura12() {    
        let texto = prompt("Ingrese JSON");  
        if (texto === null) return;
        try {   
            let figura = JSON.parse(texto);
            if (this._lineWidthInput && this._lineTypeSelect) {
                figura.lineWidth = parseInt(this._lineWidthInput.value);
                figura.lineType = this._lineTypeSelect.value;
            }
            this.dispatchEvent(new CustomEvent('request', { detail: figura }));
        } catch (error) {
            alert("El JSON ingresado no es válido.");
        }
    }
    
    cargarFigura19(tipo) {
        let mensaje = "Ingrese JSON";
        let ejemploJSON = "{}";

        if (tipo === 'cakegraph') {
            mensaje = "Ingrese JSON (para cakegraph solo datos)";
            ejemploJSON = '{"datos": [10, 20, 30, 40]}';
        } else if (tipo === 'circulo') {
            mensaje = "Ingrese JSON para Círculo";
            ejemploJSON = '{"x": 400, "y": 300, "radio": 100}';
        } else if (tipo === 'poligono') {
            mensaje = "Ingrese JSON para Polígono";
            ejemploJSON = '{"puntos": [{"x": 100, "y": 100}, {"x": 200, "y": 100}, {"x": 150, "y": 200}]}';
        }

        let texto = prompt(mensaje, ejemploJSON);
        if (texto === null) return;

        try {
            let data = JSON.parse(texto);
            let figura;
            if (tipo === 'cakegraph') {
                figura = new CakeGraph(data);
            } else {
                figura = data;
                figura.tipo = tipo;
            }
            // Estilos globales 
            if (this._lineWidthInput) figura.lineWidth = parseInt(this._lineWidthInput.value);
            if (this._lineTypeSelect) figura.lineType = this._lineTypeSelect.value;
            
            this.dispatchEvent(new CustomEvent('request', { detail: figura }));
        } catch (error) {
            alert("El JSON ingresado no es válido.");
        }
    }
    
    solicitarLimpieza() {
        this.dispatchEvent(new CustomEvent('clear'));
    }
    
    render(figuras) {
        this.clear();
        for (const fig of figuras) {
            if (fig.tipo === 'cakegraph') {
                ejercicio19(this._canvas, fig);
            } else {
                ejercicio12(this._canvas, fig);
            }
        } 
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    
    connectedCallback() {}
    disconnectedCallback() {}
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