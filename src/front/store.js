export const initialStore = () => {
  return {
    message: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null },
    ],
    cart: {
      items: [],
      total: 0,
      count: 0,
    },
    cartLoading: false,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    // 🛒 Reemplaza el carrito completo (lo usamos cuando hacemos fetch al backend)
    case "set_cart":
      return {
        ...store,
        cart: {
          items: action.payload.items || [],
          total: action.payload.total || 0,
          count: action.payload.count || 0,
        },
      };

    // Loading state para mostrar spinners en el carrito
    case "set_cart_loading":
      return {
        ...store,
        cartLoading: action.payload,
      };

    // Limpia el carrito (después de un checkout exitoso)
    case "clear_cart":
      return {
        ...store,
        cart: {
          items: [],
          total: 0,
          count: 0,
        },
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo,
        ),
      };

    default:
      throw Error("Unknown action.");
  }
}
