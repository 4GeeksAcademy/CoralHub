export const initialStore = () => {
  return {
    message: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null }
    ],
    // 1. Intentamos cargar el carrito guardado; si no existe, iniciamos vacío []
    cart: JSON.parse(localStorage.getItem("cart")) || [] 
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'set_cart':
      // Guardamos en localStorage cuando sobreescribimos el carrito completo
      localStorage.setItem("cart", JSON.stringify(action.payload));
      return {
        ...store,
        cart: action.payload
      };

    case 'add_to_cart': {
      const existingProduct = store.cart.find(item => item.id === action.payload.id);
      let updatedCart;

      if (existingProduct) {
        updatedCart = store.cart.map(item =>
          item.id === action.payload.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      } else {
        updatedCart = [...store.cart, { ...action.payload, quantity: 1 }];
      }

      // Guardamos el nuevo carrito en localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...store,
        cart: updatedCart
      };
    }

    case 'update_quantity': {
      const updatedCart = store.cart.map(item => 
        item.id === action.payload.id 
          ? { ...item, quantity: action.payload.quantity } 
          : item
      ).filter(item => item.quantity > 0);

      // Guardamos el nuevo carrito en localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...store,
        cart: updatedCart
      };
    }

    case 'remove_from_cart': {
      const updatedCart = store.cart.filter(item => item.id !== action.payload);

      // Guardamos el nuevo carrito en localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...store,
        cart: updatedCart
      };
    }

    case 'clear_cart':
      // Al vaciar el carrito, también limpiamos el almacenamiento local
      localStorage.setItem("cart", JSON.stringify([]));
      return {
        ...store,
        cart: []
      };
      
    case 'add_task': {
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    }


    default:
      return store;
  }    
}