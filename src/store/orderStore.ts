import { create } from "zustand";

export interface CartItem {
  productId: string;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
}

interface OrderStore {
  clientName: string;
  items: CartItem[];
  setClientName: (name: string) => void;
  addItem: (product: {
    id: string;
    name: string;
    image: string | null;
    price: number;
  }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  clientName: "",
  items: [],

  setClientName: (clientName) => set({ clientName }),

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1,
          },
        ],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),

  updateQuantity: (productId, qty) =>
    set((state) => ({
      items:
        qty <= 0
          ? state.items.filter((i) => i.productId !== productId)
          : state.items.map((i) =>
              i.productId === productId ? { ...i, quantity: qty } : i
            ),
    })),

  clearOrder: () => set({ clientName: "", items: [] }),
}));
