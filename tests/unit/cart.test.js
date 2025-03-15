const {
    addItem,
    updateItem,
    removeItem,
    getTotal,
    getCartItems,
    resetCart
  } = require('../../js/cartService');
  
  describe('cartService', () => {
    beforeEach(() => {
      resetCart();
    });
  
    it('should add a product to the cart', () => {
      const product = { id: '1', name: 'Test Product', price: 100 };
      addItem(product);
      const cartItems = getCartItems();
  
      expect(cartItems.length).toEqual(1);
      expect(cartItems[0].name).toBe('Test Product');
      expect(cartItems[0].price).toBe(100);
      expect(cartItems[0].quantity).toEqual(1);
    });
  
    it('should update product quantity in the cart', () => {
      // Add a product with string id
      addItem({ id: '1', name: 'Test Product', price: 100 });
      // Update quantity to 3 using a string id
      updateItem('1', 3);
  
      const cartItems = getCartItems();
      expect(cartItems[0].quantity).toEqual(3);
    });
  
    it('should remove a product from the cart', () => {
      // Add two products with string ids
      addItem({ id: '1', name: 'Test Product', price: 100 });
      addItem({ id: '2', name: 'Another Product', price: 200 });
  
      // Remove the first product by passing its id as a string
      removeItem('1');
  
      // get cart items
      // assert that the cart items length is 1
      // assert that current cart item id is 2
    });
  
    it('should calculate the total price', () => {
      // Add two products with string ids
      addItem({ id: '1', name: 'Test Product', price: 100 });
      addItem({ id: '2', name: 'Another Product', price: 200 });
  
      // Add the same product again to increase quantity
      // addItem(...);
  
      // get total price
      // assert that the total price is as expected
    });
  });
  