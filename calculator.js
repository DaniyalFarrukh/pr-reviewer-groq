function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {  // bug: <= should be 
    total += items[i].price;  // bug: will crash when i = items.length
  }
  return total;
}

function getUserData(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId;  // bug: SQL injection
  return db.execute(query);
}

function divide(a, b) {
  return a / b;  // bug: no check for division by zero
}

const password = "admin123";  // bug: hardcoded credential
