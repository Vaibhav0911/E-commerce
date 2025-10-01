# Testing Documentation

## Overview

This document provides comprehensive information about testing in the E-Commerce application, including unit tests, integration tests, and end-to-end testing strategies.

## Table of Contents

1. [Backend Testing](#backend-testing)
2. [Frontend Testing](#frontend-testing)
3. [Running Tests](#running-tests)
4. [Test Coverage](#test-coverage)
5. [Writing Tests](#writing-tests)
6. [Best Practices](#best-practices)
7. [Continuous Integration](#continuous-integration)

---

## Backend Testing

### Technology Stack

- **Jest**: Testing framework
- **Supertest**: HTTP assertion library
- **MongoDB Memory Server**: In-memory MongoDB for testing

### Test Structure

```
backend/
├── tests/
│   ├── unit/
│   │   ├── auth.test.js
│   │   └── product.test.js
│   └── integration/
│       └── cart-order.test.js
```

### Unit Tests

Unit tests focus on testing individual API endpoints in isolation.

#### Auth Tests (`tests/unit/auth.test.js`)

Tests authentication endpoints:
- User registration (signup)
- User login
- Get current user profile
- Token validation
- Error handling

**Example Test:**
```javascript
it('should register a new user successfully', async () => {
  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  const response = await request(app)
    .post('/api/auth/signup')
    .send(userData)
    .expect(201);

  expect(response.body.success).toBe(true);
  expect(response.body.data).toHaveProperty('token');
});
```

#### Product Tests (`tests/unit/product.test.js`)

Tests product CRUD operations:
- Get all products
- Get product by ID
- Create product (admin only)
- Update product (admin only)
- Delete product (admin only)
- Filter and search products

### Integration Tests

Integration tests verify that multiple components work together correctly.

#### Cart-Order Flow (`tests/integration/cart-order.test.js`)

Tests the complete user journey:
1. Add products to cart
2. Update cart quantities
3. Create order from cart
4. Verify cart is cleared
5. Retrieve order details

**Example Integration Test:**
```javascript
it('should complete full cart to order workflow', async () => {
  // Add to cart
  await request(app)
    .post('/api/cart')
    .set('Authorization', `Bearer ${userToken}`)
    .send({ productId, quantity: 2 });

  // Create order
  const orderResponse = await request(app)
    .post('/api/orders')
    .set('Authorization', `Bearer ${userToken}`)
    .send({ shippingAddress, paymentMethod });

  expect(orderResponse.body.success).toBe(true);
});
```

### Running Backend Tests

```bash
# Run all tests
cd backend
npm test

# Run tests in watch mode
npm run test:watch

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run with coverage report
npm test -- --coverage
```

### Test Configuration

Backend tests use Jest with the following configuration in `package.json`:

```json
{
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": ["/node_modules/"],
    "testTimeout": 30000
  }
}
```

---

## Frontend Testing

### Technology Stack

- **Vitest**: Fast unit test framework for Vite
- **React Testing Library**: React component testing
- **jsdom**: DOM implementation for Node.js
- **@testing-library/user-event**: User interaction simulation

### Test Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   └── ProductCard.test.jsx
│   └── setupTests.js
```

### Component Tests

#### ProductCard Tests (`src/components/ProductCard.test.jsx`)

Tests the ProductCard component:
- Renders product information correctly
- Displays product image
- Shows stock status
- Handles add to cart functionality
- Shows authentication messages
- Displays success/error messages
- Handles loading states

**Example Component Test:**
```javascript
it('should render product information correctly', () => {
  render(
    <BrowserRouter>
      <ProductCard product={mockProduct} />
    </BrowserRouter>
  );

  expect(screen.getByText('Test Product')).toBeInTheDocument();
  expect(screen.getByText('$99.99')).toBeInTheDocument();
});
```

### Running Frontend Tests

```bash
# Run all tests
cd frontend
npm test

# Run tests with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

### Test Configuration

Frontend tests use Vitest with configuration in `vite.config.js`:

```javascript
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
  }
})
```

---

## Test Coverage

### Backend Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

### Frontend Coverage Goals

- **Components**: > 70%
- **Critical Paths**: 100%
- **User Interactions**: > 80%

### Viewing Coverage Reports

**Backend:**
```bash
cd backend
npm test -- --coverage
```

Coverage report will be generated in `backend/coverage/` directory.

**Frontend:**
```bash
cd frontend
npm run test:coverage
```

Coverage report will be generated in `frontend/coverage/` directory.

---

## Writing Tests

### Backend Test Template

```javascript
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Your Test Suite', () => {
  it('should do something', async () => {
    const response = await request(app)
      .get('/api/endpoint')
      .expect(200);

    expect(response.body.success).toBe(true);
  });
});
```

### Frontend Test Template

```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import YourComponent from './YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <YourComponent />
      </BrowserRouter>
    );

    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const mockHandler = vi.fn();
    render(<YourComponent onClick={mockHandler} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandler).toHaveBeenCalled();
  });
});
```

---

## Best Practices

### General Testing Principles

1. **Test Behavior, Not Implementation**
   - Focus on what the component/API does, not how it does it
   - Test from the user's perspective

2. **Keep Tests Independent**
   - Each test should be able to run in isolation
   - Use `beforeEach` and `afterEach` for setup/cleanup

3. **Use Descriptive Test Names**
   - Test names should clearly describe what is being tested
   - Use "should" statements: `it('should return 404 for invalid ID')`

4. **Arrange-Act-Assert Pattern**
   ```javascript
   it('should do something', () => {
     // Arrange: Set up test data
     const data = { name: 'Test' };
     
     // Act: Perform the action
     const result = doSomething(data);
     
     // Assert: Verify the result
     expect(result).toBe(expected);
   });
   ```

5. **Test Edge Cases**
   - Empty inputs
   - Invalid data
   - Boundary conditions
   - Error scenarios

### Backend Testing Best Practices

1. **Use In-Memory Database**
   - Faster test execution
   - No external dependencies
   - Clean state for each test

2. **Test Authentication**
   - Test both authenticated and unauthenticated requests
   - Test different user roles (admin, user)

3. **Test Error Responses**
   - Verify correct status codes
   - Check error messages
   - Test validation errors

4. **Mock External Services**
   - Don't make real API calls in tests
   - Use mocks for email, payment gateways, etc.

### Frontend Testing Best Practices

1. **Use Testing Library Queries**
   - Prefer `getByRole` over `getByTestId`
   - Use semantic queries that match user behavior

2. **Test User Interactions**
   - Click events
   - Form submissions
   - Navigation

3. **Mock Context Providers**
   - Provide mock values for Auth, Cart contexts
   - Test different authentication states

4. **Test Accessibility**
   - Ensure components are accessible
   - Test keyboard navigation
   - Verify ARIA attributes

---

## Continuous Integration

### GitHub Actions Integration

Tests run automatically on every push and pull request via GitHub Actions.

**Workflow File:** `.github/workflows/deploy.yml`

```yaml
- name: Run Backend Tests
  run: |
    cd backend
    npm install
    npm test

- name: Run Frontend Tests
  run: |
    cd frontend
    npm install
    npm test
```

### Pre-commit Hooks (Optional)

You can add pre-commit hooks to run tests before committing:

**Install Husky:**
```bash
npm install --save-dev husky
npx husky install
```

**Add pre-commit hook:**
```bash
npx husky add .husky/pre-commit "cd backend && npm test"
```

---

## Troubleshooting

### Common Issues

#### 1. MongoDB Memory Server Timeout

**Problem:** Tests timeout when starting MongoDB Memory Server

**Solution:**
```javascript
// Increase timeout in test file
jest.setTimeout(60000);

// Or in package.json
{
  "jest": {
    "testTimeout": 60000
  }
}
```

#### 2. Port Already in Use

**Problem:** Server port is already in use

**Solution:**
- Tests use in-memory database, no need for running server
- Ensure no other instances are running
- Use different port in test environment

#### 3. React Testing Library Errors

**Problem:** "Not wrapped in act(...)" warnings

**Solution:**
```javascript
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText('Expected')).toBeInTheDocument();
});
```

#### 4. Module Not Found Errors

**Problem:** Cannot find module in tests

**Solution:**
```bash
# Install missing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Clear cache
npm test -- --clearCache
```

---

## Test Maintenance

### When to Update Tests

1. **Feature Changes**: Update tests when functionality changes
2. **Bug Fixes**: Add tests to prevent regression
3. **Refactoring**: Ensure tests still pass after refactoring
4. **New Features**: Write tests for new features before or during development (TDD)

### Test Review Checklist

- [ ] All tests pass locally
- [ ] Tests are independent and can run in any order
- [ ] Test names are descriptive
- [ ] Edge cases are covered
- [ ] Error scenarios are tested
- [ ] Code coverage meets minimum requirements
- [ ] No console errors or warnings
- [ ] Tests run in CI/CD pipeline

---

## Additional Resources

### Documentation

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Documentation](https://vitest.dev/)

### Testing Guides

- [Testing Best Practices](https://testingjavascript.com/)
- [React Testing Patterns](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [API Testing Guide](https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/)

---

## Summary

This E-Commerce application has comprehensive test coverage including:

- ✅ **Backend Unit Tests**: Auth, Products, Cart, Orders
- ✅ **Backend Integration Tests**: Complete user workflows
- ✅ **Frontend Component Tests**: ProductCard and more
- ✅ **Error Handling Tests**: All error scenarios covered
- ✅ **CI/CD Integration**: Automated testing on every commit

**Total Test Files**: 4
**Test Suites**: 10+
**Individual Tests**: 50+

Run tests regularly during development to catch issues early and maintain code quality!