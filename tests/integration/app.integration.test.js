const request = require('supertest');
const app = require('../../server');
const { resetUsers } = require('../../js/authService');
const { resetProducts } = require('../../js/productService');
const { resetCart } = require('../../js/cartService');

describe('Integration Tests', () => {
  // Before each test, reset the in-memory data
  beforeEach(() => {
    resetUsers();
    resetProducts();
    resetCart();
  });

  it('should register and login a user', async () => {
    // Register a user
    const registerRes = await request(app)
      .post('/auth/register')
      .send({ username: 'user@example.com', password: 'password123' });
    expect(registerRes.status).toBe(201);
    expect(registerRes.text).toBe('User registered');

    // Use an agent to persist cookies across requests for login
    const agent = request.agent(app);
    const loginRes = await agent
      .post('/auth/login')
      .send({ username: 'user@example.com', password: 'password123' });
    expect(loginRes.status).toBe(200);
    expect(loginRes.text).toBe('Login successful');
  });

  it('should add a product and retrieve it', async () => {
    // Add a product
    const productId = Date.now().toString();
    const addRes = await request(app)
      .post('/products')
      .send({ id: productId, name: 'Test Product', price: 100 });
    expect(addRes.status).toBe(201);
    expect(addRes.text).toBe('Product added');

    // Get the list of products and verify the new product is present
    const getRes = await request(app).get('/products');
    expect(getRes.status).toBe(200);
    expect(getRes.body.length).toBeGreaterThan(0);
    expect(getRes.body[0].name).toBe('Test Product');
  });

  it('should add items to the cart and update the total', async () => {
    // First, add a product so it can be added to the cart
    const productId = Date.now().toString();
    await request(app)
      .post('/products')
      .send({ id: productId, name: 'Test Product', price: 100 });

    // Add the product to the cart twice to simulate increasing quantity
    await request(app)
      .post('/cart')
      .send({ id: productId, name: 'Test Product', price: 100 });
    await request(app)
      .post('/cart')
      .send({ id: productId, name: 'Test Product', price: 100 });

    // Retrieve the cart and verify that the quantity is updated
    const cartRes = await request(app).get('/cart');
    expect(cartRes.status).toBe(200);
    expect(cartRes.body.length).toBe(1);
    expect(cartRes.body[0].quantity).toBe(2);

    // Verify the total price is correct
    const totalRes = await request(app).get('/cart/total');
    expect(totalRes.status).toBe(200);
    expect(totalRes.body.total).toBe(200);
  });

  it('should remove an item from the cart', async () => {
    // Add a product and then add it to the cart
    const productId = Date.now().toString();
    await request(app)
      .post('/products')
      .send({ id: productId, name: 'Test Product', price: 100 });
    await request(app)
      .post('/cart')
      .send({ id: productId, name: 'Test Product', price: 100 });

    // Remove the product from the cart
    const removeRes = await request(app).delete(`/cart/${productId}`);
    expect(removeRes.status).toBe(200);
    expect(removeRes.text).toBe('Item removed from cart');

    // Verify the cart is empty
    const cartRes = await request(app).get('/cart');
    expect(cartRes.status).toBe(200);
    expect(cartRes.body.length).toBe(0);
  });

  it('should checkout an order', async () => {
    // Use an agent to simulate a user session
    const agent = request.agent(app);

    // Register and login the user
    await agent
      .post('/auth/register')
      .send({ username: 'user@example.com', password: 'password123' });
    await agent
      .post('/auth/login')
      .send({ username: 'user@example.com', password: 'password123' });

    // Add a product
    const productId = Date.now().toString();
    await agent
      .post('/products')
      .send({ id: productId, name: 'Test Product', price: 100 });

    // Add product to the cart
    await agent
      .post('/cart')
      .send({ id: productId, name: 'Test Product', price: 100 });

    // Prepare order data and checkout
    const orderPayload = {
      items: [{ id: productId, name: 'Test Product', price: 100, quantity: 1 }],
      total: 100
    };

    const checkoutRes = await agent.post('/checkout').send(orderPayload);
    expect(checkoutRes.status).toBe(201);
    expect(checkoutRes.text).toBe('Order placed');
  });
});
