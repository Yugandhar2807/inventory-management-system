// In-memory mock database for development when MySQL is unavailable
let mockDatabase = {
  users: [],
  products: [],
  categories: [],
  suppliers: [],
  orders: [],
  order_items: [],
  transactions: []
};

let idCounters = {
  users: 1,
  products: 1,
  categories: 1,
  suppliers: 1,
  orders: 1,
  order_items: 1,
  transactions: 1
};

// Initialize with sample data
const initializeMockData = () => {
  // Sample users
  mockDatabase.users = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', password: '$2a$10$zRLzGxZg3EzYfDzZgPzZkOsqS9HFz9rDLbgPzZkOsqS9HFz9rDL', role: 'admin', created_at: new Date() },
    { id: 2, name: 'Staff User', email: 'staff@example.com', password: '$2a$10$zRLzGxZg3EzYfDzZgPzZkOsqS9HFz9rDLbgPzZkOsqS9HFz9rDL', role: 'staff', created_at: new Date() }
  ];

  // Sample categories
  mockDatabase.categories = [
    { id: 1, name: 'Electronics', description: 'Electronic products', created_at: new Date() },
    { id: 2, name: 'Furniture', description: 'Furniture items', created_at: new Date() },
    { id: 3, name: 'Clothing', description: 'Clothing items', created_at: new Date() }
  ];

  // Sample suppliers
  mockDatabase.suppliers = [
    { id: 1, name: 'Tech Supplier Co.', email: 'contact@techsupply.com', phone: '555-0001', address: '123 Tech Street', created_at: new Date() },
    { id: 2, name: 'Furniture World', email: 'info@furnitureworld.com', phone: '555-0002', address: '456 Furniture Ave', created_at: new Date() }
  ];

  // Sample products
  mockDatabase.products = [
    { id: 1, name: 'Laptop', category: 'Electronics', supplier: 'Tech Supplier Co.', stock: 50, price: 999.99, created_at: new Date() },
    { id: 2, name: 'Office Chair', category: 'Furniture', supplier: 'Furniture World', stock: 25, price: 299.99, created_at: new Date() },
    { id: 3, name: 'T-Shirt', category: 'Clothing', supplier: 'Tech Supplier Co.', stock: 100, price: 29.99, created_at: new Date() }
  ];

  // Sample orders
  mockDatabase.orders = [
    { id: 1, customer_name: 'John Doe', order_date: new Date(), status: 'Completed' },
    { id: 2, customer_name: 'Jane Smith', order_date: new Date(), status: 'Pending' }
  ];

  idCounters = {
    users: 3,
    products: 4,
    categories: 4,
    suppliers: 3,
    orders: 3,
    order_items: 1,
    transactions: 1
  };
};

// Mock Query function that mimics MySQL behavior
export const mockQuery = (sql, params, callback) => {
  // Convert to lowercase for easier matching
  const sqlLower = sql.toLowerCase().trim();

  try {
    // SELECT queries
    if (sqlLower.startsWith('select')) {
      handleSelect(sql, params, callback);
    }
    // INSERT queries
    else if (sqlLower.startsWith('insert')) {
      handleInsert(sql, params, callback);
    }
    // UPDATE queries
    else if (sqlLower.startsWith('update')) {
      handleUpdate(sql, params, callback);
    }
    // DELETE queries
    else if (sqlLower.startsWith('delete')) {
      handleDelete(sql, params, callback);
    }
    // CREATE TABLE queries (ignore for mock)
    else if (sqlLower.startsWith('create')) {
      callback(null, { affectedRows: 0 });
    }
    else {
      callback(null, []);
    }
  } catch (error) {
    callback(error, null);
  }
};

const handleSelect = (sql, params, callback) => {
  const sqlLower = sql.toLowerCase();
  
  // SELECT * FROM users WHERE email = ?
  if (sqlLower.includes('from users')) {
    if (sqlLower.includes('where email')) {
      const user = mockDatabase.users.find(u => u.email === params[0]);
      callback(null, user ? [user] : []);
    } else if (sqlLower.includes('where id')) {
      const user = mockDatabase.users.find(u => u.id == params[0]);
      callback(null, user ? [user] : []);
    } else {
      callback(null, mockDatabase.users);
    }
  }
  // SELECT * FROM products
  else if (sqlLower.includes('from products')) {
    if (sqlLower.includes('where id')) {
      const product = mockDatabase.products.find(p => p.id == params[0]);
      callback(null, product ? [product] : []);
    } else {
      callback(null, mockDatabase.products);
    }
  }
  // SELECT * FROM categories
  else if (sqlLower.includes('from categories')) {
    if (sqlLower.includes('where id')) {
      const category = mockDatabase.categories.find(c => c.id == params[0]);
      callback(null, category ? [category] : []);
    } else {
      callback(null, mockDatabase.categories);
    }
  }
  // SELECT * FROM suppliers
  else if (sqlLower.includes('from suppliers')) {
    if (sqlLower.includes('where id')) {
      const supplier = mockDatabase.suppliers.find(s => s.id == params[0]);
      callback(null, supplier ? [supplier] : []);
    } else {
      callback(null, mockDatabase.suppliers);
    }
  }
  // SELECT * FROM orders
  else if (sqlLower.includes('from orders')) {
    if (sqlLower.includes('where id')) {
      const order = mockDatabase.orders.find(o => o.id == params[0]);
      callback(null, order ? [order] : []);
    } else {
      callback(null, mockDatabase.orders);
    }
  }
  // SELECT * FROM transactions
  else if (sqlLower.includes('from transactions')) {
    callback(null, mockDatabase.transactions);
  }
  else {
    callback(null, []);
  }
};

const handleInsert = (sql, params, callback) => {
  const sqlLower = sql.toLowerCase();

  if (sqlLower.includes('into users')) {
    const [name, email, password, role] = params;
    const newUser = {
      id: idCounters.users++,
      name,
      email,
      password,
      role: role || 'staff',
      created_at: new Date()
    };
    mockDatabase.users.push(newUser);
    callback(null, { insertId: newUser.id, affectedRows: 1 });
  }
  else if (sqlLower.includes('into products')) {
    const [name, category, supplier, stock, price] = params;
    const newProduct = {
      id: idCounters.products++,
      name,
      category,
      supplier,
      stock,
      price,
      created_at: new Date()
    };
    mockDatabase.products.push(newProduct);
    callback(null, { insertId: newProduct.id, affectedRows: 1 });
  }
  else if (sqlLower.includes('into categories')) {
    const [name, description] = params;
    const newCategory = {
      id: idCounters.categories++,
      name,
      description,
      created_at: new Date()
    };
    mockDatabase.categories.push(newCategory);
    callback(null, { insertId: newCategory.id, affectedRows: 1 });
  }
  else if (sqlLower.includes('into suppliers')) {
    const [name, email, phone, address] = params;
    const newSupplier = {
      id: idCounters.suppliers++,
      name,
      email,
      phone,
      address,
      created_at: new Date()
    };
    mockDatabase.suppliers.push(newSupplier);
    callback(null, { insertId: newSupplier.id, affectedRows: 1 });
  }
  else if (sqlLower.includes('into orders')) {
    const [customer_name, status] = params;
    const newOrder = {
      id: idCounters.orders++,
      customer_name,
      order_date: new Date(),
      status: status || 'Pending'
    };
    mockDatabase.orders.push(newOrder);
    callback(null, { insertId: newOrder.id, affectedRows: 1 });
  }
  else if (sqlLower.includes('into transactions')) {
    const [product_id, type, quantity] = params;
    const newTransaction = {
      id: idCounters.transactions++,
      product_id,
      type,
      quantity,
      created_at: new Date()
    };
    mockDatabase.transactions.push(newTransaction);
    callback(null, { insertId: newTransaction.id, affectedRows: 1 });
  }
  else {
    callback(null, { insertId: 0, affectedRows: 0 });
  }
};

const handleUpdate = (sql, params, callback) => {
  const sqlLower = sql.toLowerCase();

  if (sqlLower.includes('update products')) {
    const [name, category, supplier, stock, price, id] = params;
    const product = mockDatabase.products.find(p => p.id == id);
    if (product) {
      product.name = name;
      product.category = category;
      product.supplier = supplier;
      product.stock = stock;
      product.price = price;
      callback(null, { affectedRows: 1 });
    } else {
      callback(null, { affectedRows: 0 });
    }
  }
  else if (sqlLower.includes('update categories')) {
    const [name, description, id] = params;
    const category = mockDatabase.categories.find(c => c.id == id);
    if (category) {
      category.name = name;
      category.description = description;
      callback(null, { affectedRows: 1 });
    } else {
      callback(null, { affectedRows: 0 });
    }
  }
  else if (sqlLower.includes('update suppliers')) {
    const [name, email, phone, address, id] = params;
    const supplier = mockDatabase.suppliers.find(s => s.id == id);
    if (supplier) {
      supplier.name = name;
      supplier.email = email;
      supplier.phone = phone;
      supplier.address = address;
      callback(null, { affectedRows: 1 });
    } else {
      callback(null, { affectedRows: 0 });
    }
  }
  else if (sqlLower.includes('update orders')) {
    const [status, id] = params;
    const order = mockDatabase.orders.find(o => o.id == id);
    if (order) {
      order.status = status;
      callback(null, { affectedRows: 1 });
    } else {
      callback(null, { affectedRows: 0 });
    }
  }
  else if (sqlLower.includes('quantity =') && sqlLower.includes('where id')) {
    // Handle stock update for transactions
    const regex = /quantity = quantity (\+|-) \?/i;
    const match = sql.match(regex);
    if (match) {
      const operator = match[1];
      const [qty, productId] = params;
      const product = mockDatabase.products.find(p => p.id == productId);
      if (product) {
        if (operator === '+') {
          product.stock += qty;
        } else {
          product.stock -= qty;
        }
        callback(null, { affectedRows: 1 });
      } else {
        callback(null, { affectedRows: 0 });
      }
    } else {
      callback(null, { affectedRows: 0 });
    }
  }
  else {
    callback(null, { affectedRows: 0 });
  }
};

const handleDelete = (sql, params, callback) => {
  const sqlLower = sql.toLowerCase();
  const id = params[0];

  if (sqlLower.includes('from products')) {
    const index = mockDatabase.products.findIndex(p => p.id == id);
    if (index !== -1) {
      mockDatabase.products.splice(index, 1);
      callback(null, { affectedRows: 1 });
    } else {
      callback(null, { affectedRows: 0 });
    }
  }
  else if (sqlLower.includes('from categories')) {
    const index = mockDatabase.categories.findIndex(c => c.id == id);
    if (index !== -1) {
      mockDatabase.categories.splice(index, 1);
      callback(null, { affectedRows: 1 });
    } else {
      callback(null, { affectedRows: 0 });
    }
  }
  else if (sqlLower.includes('from suppliers')) {
    const index = mockDatabase.suppliers.findIndex(s => s.id == id);
    if (index !== -1) {
      mockDatabase.suppliers.splice(index, 1);
      callback(null, { affectedRows: 1 });
    } else {
      callback(null, { affectedRows: 0 });
    }
  }
  else if (sqlLower.includes('from orders')) {
    const index = mockDatabase.orders.findIndex(o => o.id == id);
    if (index !== -1) {
      mockDatabase.orders.splice(index, 1);
      callback(null, { affectedRows: 1 });
    } else {
      callback(null, { affectedRows: 0 });
    }
  }
  else {
    callback(null, { affectedRows: 0 });
  }
};

initializeMockData();

export default mockDatabase;
