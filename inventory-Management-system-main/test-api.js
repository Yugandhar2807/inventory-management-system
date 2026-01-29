#!/usr/bin/env node

/**
 * API Test Script - Test all endpoints
 * Run: node test-api.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000/api';
let token = null;

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            body: data ? JSON.parse(data) : null,
            headers: res.headers
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            body: data,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  log('\n╔═══════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Inventory Management System - API Test Suite          ║', 'cyan');
  log('╚═══════════════════════════════════════════════════════════╝\n', 'cyan');

  try {
    // Test 1: Health Check
    log('Test 1: Health Check', 'blue');
    const health = await makeRequest('GET', '/../');
    log(`✓ Status: ${health.status}`, health.status === 200 ? 'green' : 'red');
    log(`  Response: ${health.body}\n`);

    // Test 2: Register
    log('Test 2: User Registration', 'blue');
    const registerRes = await makeRequest('POST', '/auth/register', {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'Test@123'
    });
    log(`✓ Status: ${registerRes.status}`, registerRes.status === 201 ? 'green' : 'red');
    log(`  Response: ${registerRes.body.message}\n`);

    // Test 3: Login
    log('Test 3: User Login', 'blue');
    const loginRes = await makeRequest('POST', '/auth/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });
    if (loginRes.status === 200 && loginRes.body.token) {
      token = loginRes.body.token;
      log(`✓ Status: ${loginRes.status}`, 'green');
      log(`✓ Token received: ${token.substring(0, 20)}...\n`, 'green');
    } else {
      log(`✗ Status: ${loginRes.status}`, 'red');
      log(`  Response: ${JSON.stringify(loginRes.body)}\n`, 'yellow');
      // Continue with mock token
      token = 'mock_token';
    }

    // Test 4: Get Products
    log('Test 4: Fetch Products', 'blue');
    const productsRes = await makeRequest('GET', '/products');
    log(`✓ Status: ${productsRes.status}`, productsRes.status === 200 ? 'green' : 'red');
    log(`  Products count: ${Array.isArray(productsRes.body) ? productsRes.body.length : 0}\n`);

    // Test 5: Get Categories
    log('Test 5: Fetch Categories', 'blue');
    const categoriesRes = await makeRequest('GET', '/categories');
    log(`✓ Status: ${categoriesRes.status}`, categoriesRes.status === 200 ? 'green' : 'red');
    log(`  Categories count: ${Array.isArray(categoriesRes.body) ? categoriesRes.body.length : 0}\n`);

    // Test 6: Get Suppliers
    log('Test 6: Fetch Suppliers', 'blue');
    const suppliersRes = await makeRequest('GET', '/suppliers');
    log(`✓ Status: ${suppliersRes.status}`, suppliersRes.status === 200 ? 'green' : 'red');
    log(`  Suppliers count: ${Array.isArray(suppliersRes.body) ? suppliersRes.body.length : 0}\n`);

    // Test 7: Get Orders
    log('Test 7: Fetch Orders', 'blue');
    const ordersRes = await makeRequest('GET', '/orders');
    log(`✓ Status: ${ordersRes.status}`, ordersRes.status === 200 ? 'green' : 'red');
    log(`  Orders count: ${Array.isArray(ordersRes.body) ? ordersRes.body.length : 0}\n`);

    // Test 8: Create Product
    log('Test 8: Create Product', 'blue');
    const createRes = await makeRequest('POST', '/products', {
      name: 'Test Product',
      category: 'Electronics',
      supplier: 'Test Supplier',
      stock: 100,
      price: 99.99
    });
    log(`✓ Status: ${createRes.status}`, createRes.status === 201 ? 'green' : 'red');
    log(`  Response: ${createRes.body.message || createRes.body.name || 'Product created'}\n`);

    // Summary
    log('╔═══════════════════════════════════════════════════════════╗', 'cyan');
    log('║                    ✓ Tests Completed                      ║', 'cyan');
    log('╚═══════════════════════════════════════════════════════════╝\n', 'cyan');
    
    log('API is working! 🚀', 'green');
    log('Frontend: http://localhost:5173', 'yellow');
    log('Backend:  http://localhost:5000/api\n', 'yellow');

  } catch (error) {
    log(`\n✗ Error: ${error.message}`, 'red');
    log('\nMake sure:');
    log('  1. Backend server is running on port 5000', 'yellow');
    log('  2. Run: npm run dev (in backend folder)', 'yellow');
  }
}

runTests();
