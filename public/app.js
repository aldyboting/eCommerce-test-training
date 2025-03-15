document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const productForm = document.getElementById('productForm');
  const productList = document.getElementById('productList');
  const cartElement = document.getElementById('cart');
  const totalElement = document.getElementById('total');
  const notification = document.getElementById('notification');
  const userGreeting = document.getElementById('userGreeting');

  // Keep track of logged-in user
  let currentUser = null;

  // Helper function to format prices in Rupiah
  function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  }

  // Show notification instead of using alert
  function showNotification(message, duration = 3000) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, duration);
  }

  // Update the "Hi, username!" greeting
  function updateUserGreeting(username) {
    if (username) {
      userGreeting.textContent = `Hi, ${username}!`;
    } else {
      userGreeting.textContent = '';
    }
  }

  // Registration
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    const res = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    showNotification(await res.text());
  });

  // Login
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const responseText = await res.text();

    if (res.ok) {
      // Login successful
      currentUser = username;
      updateUserGreeting(currentUser);
      showNotification(responseText);
    } else {
      // Login failed
      showNotification(responseText);
    }
  });

  // Add Product
  productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;

    const res = await fetch('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Date.now().toString(), name, price }),
    });

    showNotification(await res.text());
    loadProducts();
  });

  // Load products from backend and display them
  async function loadProducts() {
    const res = await fetch('/products');
    const products = await res.json();
    productList.innerHTML = '';

    products.forEach(product => {
      const li = document.createElement('li');
      // Format the price in Rupiah
      li.textContent = `${product.name} - ${formatRupiah(product.price)}`;

      const button = document.createElement('button');
      button.textContent = 'Add to Cart';
      button.addEventListener('click', async () => {
        await addToCart(product);
        updateCart();
      });

      li.appendChild(button);
      productList.appendChild(li);
    });
  }

  // Add product to cart
  async function addToCart(product) {
    await fetch('/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  }

  // Update cart display
  async function updateCart() {
    const res = await fetch('/cart');
    const cartItems = await res.json();
    cartElement.innerHTML = '';

    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
      const li = document.createElement('li');
      // Format each item price in Rupiah
      li.textContent = `${item.name} - ${formatRupiah(item.price)} x ${item.quantity}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', async () => {
        await removeFromCart(item.id);
        updateCart();
      });

      li.appendChild(removeButton);
      cartElement.appendChild(li);
    });

    // Display total in Rupiah
    totalElement.textContent = formatRupiah(total);
  }

  // Remove product from cart
  async function removeFromCart(productId) {
    await fetch(`/cart/${productId}`, {
      method: 'DELETE',
    });
  }

  // Initial load of products
  loadProducts();
});
