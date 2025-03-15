# eCommerce Project

A simple eCommerce demo application built with Node.js, Express, and vanilla JavaScript. This project is designed to showcase **unit tests**, **integration tests**, and optionally **end-to-end tests**.

## Features
- **User Authentication**: Registration and login using sessions.
- **Product Management**: Add, list, and retrieve products (in-memory storage).
- **Shopping Cart**: Add, update, remove items, and view total cost.
- **Order Checkout**: Demonstrates a simple checkout process with optional email confirmation.
- **Modular Routes & Services**: Separation of business logic (services) from Express routes.
- **Testing Support**:
  - **Unit Tests**: Validate individual service functions.
  - **Integration Tests**: Test Express routes end-to-end using Supertest.
  - **End-to-End (E2E) Tests**: Managed separately using Playwright.

## Installation & Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/ecommerce-project.git
    cd ecommerce-project
    ```

## System Requirements
- Node.js v22+
- npm v11+

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` File** (at the project root):
    ```env
    PORT=8082
    EMAIL_USER=your_gmail_account@gmail.com
    EMAIL_PASS=your_app_specific_password
    ```
    - Email credentials are required only if you enable real email confirmation.
    - Gmail accounts with 2FA require an [App Password](https://support.google.com/accounts/answer/185833).

4. **Start the Server**:
    ```bash
    npm start
    ```
    - The server will start on the specified `PORT` in `.env`, defaulting to `8082`.

5. **Access the Application**:
    - Open `http://localhost:8082` in your browser.

## Usage
- **Register/Login** to access the application.
- **Add Products** via the product form (stored in memory).
- **Add to Cart** by clicking "Add to Cart".
- **View Cart** to see selected items and total price.
- **Checkout** via a `/checkout` endpoint (manual request or UI customization required).

## Testing

Run different test categories with the following npm scripts:

### **Unit Tests** (Jest)
```bash
npm run test:unit
```
- Tests individual service logic (cart, product, authentication).

### **Integration Tests** (Supertest + Jest)
```bash
npm run test:integration
```
- Tests Express routes end-to-end in-memory.

### **System Testing** (End-to-End with Playwright)
E2E tests for this project are managed using Playwright. To run the system tests:
1. Open the `e2e` folder in a separate window in VSCode.
2. In the `e2e` folder, run:
    ```bash
    npx playwright test
    ```

## Project Structure
```
ecommerce-project/
├── js/
│   ├── authService.js      // User authentication logic
│   ├── cartService.js      // Shopping cart logic
│   ├── productService.js   // Product management logic
├── routes/
│   ├── authRoutes.js       // /auth endpoints
│   ├── cartRoutes.js       // /cart endpoints
│   ├── productRoutes.js    // /products endpoints
├── public/
│   ├── app.js              // Frontend JavaScript
│   ├── styles.css          // Basic styling
├── tests/
│   ├── unit/               // Unit tests
│   │   ├── cart.test.js
│   │   ├── product.test.js
│   │   └── user.test.js
│   ├── integration/        // Integration tests
│   │   └── app.integration.test.js
│   ├── e2e/                // E2E tests (optional)
├── .env                    // Environment variables (not committed)
├── .gitignore
├── index.html              // Main frontend page
├── package.json
├── server.js               // Express app setup
├── startServer.js          // Server entry point
```

## Contributing
1. Fork this repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Make your changes and commit:
    ```bash
    git commit -m "Add feature"
    ```
4. Push to your branch:
    ```bash
    git push origin feature-name
    ```
5. Open a Pull Request on GitHub.

## License
This project is licensed under the MIT License.

## Contact
For inquiries or collaboration, please email **aldyboting@gmail.com**.
