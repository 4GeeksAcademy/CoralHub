export const initialStore = () => {
  return {
    message: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null }
    ],
    cart: [] // 🛒 Aquí se guardarán los productos seleccionados
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
      // Verificar si el producto ya está en el carrito para no duplicarlo, o aumentar su cantidad
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
      // Si es nuevo, lo agregamos con cantidad = 1
      return {
        ...store,
        cart: [...store.cart, { ...action.payload, quantity: 1 }]
      };

    case 'clear_cart':
      // Al realizar la compra limpiaremos el carrito
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
      throw Error('Unknown action.');
  }    
}