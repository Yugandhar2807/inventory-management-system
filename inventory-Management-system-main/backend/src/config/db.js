import { mockQuery } from "./mockDb.js";

console.log("✅ Using in-memory mock database for development");
console.log("📝 Demo mode: All data is temporary and will NOT persist after restart");
console.log("✨ All API endpoints are fully functional with sample data\n");

// Mock database object that mimics MySQL connection
const db = {
  query: mockQuery,
  connect: (callback) => callback ? callback() : null,
  on: (event, callback) => {},
  end: (callback) => callback ? callback() : null
};

export default db;
export { db as database };