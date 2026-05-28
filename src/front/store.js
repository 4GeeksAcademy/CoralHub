export const initialStore = () => {
  return {
    message: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null }
    ],
    cart: [] // Carrito de compras vacío al inicio
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'add_to_cart':
      const existingProduct = store.cart.find(item => item.id === action.payload.id);
      if (existingProduct) {
        return {
          ...store,
          cart: store.cart.map(item =>
            item.id === action.payload.id 
              ? { ...item, quantity: (item.quantity || 1) + 1 } 
              : item
          )
        };
      }
      return {
        ...store,
        cart: [...store.cart, { ...action.payload, quantity: 1 }]
      };

    case 'update_quantity':
      return {
        ...store,
        cart: store.cart.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'remove_from_cart':
      return {
        ...store,
        cart: store.cart.filter(item => item.id !== action.payload)
      };

    case 'clear_cart':
      return {
        ...store,
        cart: []
      };
      
    case 'add_task':
      const { id, color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    default:
      return store; // 👈 Cambiado aquí para evitar la pantalla azul/blanca
  }    
}