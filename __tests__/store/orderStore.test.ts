import { useOrderStore } from "@/src/store/orderStore";

const product = { id: "p1", name: "Espresso", image: null, price: 3.5 };
const product2 = { id: "p2", name: "Cappuccino", image: null, price: 4.5 };

beforeEach(() => {
  useOrderStore.getState().clearOrder();
});

describe("addItem", () => {
  it("adds a new item with quantity 1", () => {
    useOrderStore.getState().addItem(product);
    const { items } = useOrderStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      productId: "p1",
      quantity: 1,
      price: 3.5,
    });
  });

  it("increments quantity when the same item is added again", () => {
    useOrderStore.getState().addItem(product);
    useOrderStore.getState().addItem(product);
    const { items } = useOrderStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it("adds multiple different items independently", () => {
    useOrderStore.getState().addItem(product);
    useOrderStore.getState().addItem(product2);
    expect(useOrderStore.getState().items).toHaveLength(2);
  });
});

describe("removeItem", () => {
  it("removes the item by productId", () => {
    useOrderStore.getState().addItem(product);
    useOrderStore.getState().removeItem("p1");
    expect(useOrderStore.getState().items).toHaveLength(0);
  });

  it("only removes the matching item", () => {
    useOrderStore.getState().addItem(product);
    useOrderStore.getState().addItem(product2);
    useOrderStore.getState().removeItem("p1");
    const { items } = useOrderStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].productId).toBe("p2");
  });
});

describe("updateQuantity", () => {
  it("updates the quantity of an existing item", () => {
    useOrderStore.getState().addItem(product);
    useOrderStore.getState().updateQuantity("p1", 5);
    expect(useOrderStore.getState().items[0].quantity).toBe(5);
  });

  it("removes the item when quantity reaches 0", () => {
    useOrderStore.getState().addItem(product);
    useOrderStore.getState().updateQuantity("p1", 0);
    expect(useOrderStore.getState().items).toHaveLength(0);
  });

  it("removes the item when quantity is negative", () => {
    useOrderStore.getState().addItem(product);
    useOrderStore.getState().updateQuantity("p1", -1);
    expect(useOrderStore.getState().items).toHaveLength(0);
  });
});

describe("clearOrder", () => {
  it("removes all items and resets the client name", () => {
    useOrderStore.getState().addItem(product);
    useOrderStore.getState().setClientName("Alice");
    useOrderStore.getState().clearOrder();
    const { items, clientName } = useOrderStore.getState();
    expect(items).toHaveLength(0);
    expect(clientName).toBe("");
  });
});
