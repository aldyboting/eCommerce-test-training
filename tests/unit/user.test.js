const { registerUser, loginUser, resetUsers } = require('../../js/authService');

describe('User Authentication Service', () => {
  beforeEach(() => {
    resetUsers();
  });

  it('should register a new user', () => {
    const message = registerUser('testuser', 'password123');
    expect(message).toEqual('User registered');
  });

  it('should not register a user with an existing username', () => {
    // see the product.test.js as the sample reference for implementation
    // ...
  });

  it('should login an existing user', () => {
    registerUser('testuser', 'password123');

    // Login with created user
    // Assert that the login message is as expected
  });

  it('should not login with invalid credentials', () => {
    registerUser('testuser', 'password123');
    expect(() => loginUser('invaliduser', 'wrongpassword')).toThrow('Invalid credentials');
  });
});
