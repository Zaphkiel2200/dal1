// Definimos la clase del componente
class FortniteItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Shadow DOM para encapsulación
      this.itemData = null; // Aquí guardaremos los datos del JSON
    }
  
    // Método para cargar datos desde el JSON (simulado)
    async loadItemData(itemId) {
      // Simulamos un JSON grande con múltiples ítems
      const fortniteDB = {
        "status": 200,
        "data": {
          "br": [
            {
              "id": "Backpack_AbstractMirror",
              "name": "Metal Gear Mk. II",
              "description": "Backs you up on the battlefield.",
              "type": { "displayValue": "Back Bling" },
              "rarity": { "displayValue": "Gaming Legends Series" },
              "images": { "icon": "https://via.placeholder.com/200" }
            },
            {
              "id": "Weapon_Scar",
              "name": "SCAR",
              "description": "Rifle de asalto preciso.",
              "type": { "displayValue": "Arma" },
              "rarity": { "displayValue": "Épica" },
              "images": { "icon": "https://via.placeholder.com/200" }
            }
          ]
        }
      };
  
      // Buscamos el ítem por ID
      this.itemData = fortniteDB.data.br.find(item => item.id === itemId);
      this.render();
    }
  
    // Método para renderizar el componente
    render() {
      if (!this.itemData) {
        this.shadowRoot.innerHTML = `<p>Ítem no encontrado</p>`;
        return;
      }
  
      this.shadowRoot.innerHTML = `
        <style>
          .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 16px;
            max-width: 250px;
            font-family: Arial, sans-serif;
            background: white;
          }
          .card img {
            width: 100%;
            border-radius: 4px;
          }
          .rarity {
            color: #5328d6;
            font-weight: bold;
          }
        </style>
        <div class="card">
          <img src="${this.itemData.images.icon}" alt="${this.itemData.name}">
          <h3>${this.itemData.name}</h3>
          <p>${this.itemData.description}</p>
          <p><strong>Tipo:</strong> ${this.itemData.type.displayValue}</p>
          <p class="rarity">${this.itemData.rarity.displayValue}</p>
        </div>
      `;
    }
  
    // Observamos el atributo "item-id" para cambios
    static get observedAttributes() {
      return ['item-id'];
    }
  
    // Cuando el atributo cambia, cargamos los datos
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'item-id' && newValue) {
        this.loadItemData(newValue);
      }
    }
  }
  
  // Registramos el componente personalizado
  customElements.define('fortnite-item', FortniteItem);