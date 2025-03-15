const {
  addProduct,
  getProducts,
  resetProducts
} = require('../../js/productService');

describe('Product Service', () => {
  beforeEach(() => {
    resetProducts();
  });

  it('should add a new product', () => {
    const message = addProduct('1', 'Test Product', 100);
    expect(message).toBe('Product added');

    const products = getProducts();
    expect(products.length).toBe(1);
    expect(products[0]).toEqual({ id: '1', name: 'Test Product', price: 100 });
  });

  it('should not add a product with an existing id', () => {
    // Add step to add product with the same id


    expect(() => addProduct('1', 'Another Product', 150)).toThrow('Product already exists');
  });

  it('should get all products', () => {
    addProduct('1', 'First Product', 100);
    addProduct('2', 'Second Product', 200);

    // First, get all products
    // Then, assert that the products length is as expected
    // Then, assert that the product names are as expected
  });
});
