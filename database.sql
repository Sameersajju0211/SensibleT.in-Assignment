-- CREATE TABLE users (
--     id INTEGER PRIMARY KEY AUTOINCREMENT, 
--     username TEXT NOT NULL,               
--     email TEXT UNIQUE NOT NULL,           
--     password TEXT                         
-- );

-- CREATE TABLE transactions (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,                   
--     amount DECIMAL(10, 2) NOT NULL,                         
--     transaction_type TEXT CHECK(transaction_type IN ('DEPOSIT', 'WITHDRAWAL')) NOT NULL, 
--     user_id INTEGER NOT NULL,                               
--     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,           
--     status TEXT CHECK(status IN ('PENDING', 'COMPLETED', 'FAILED')) NOT NULL, 
--     FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE 
-- );

-- INSERT INTO users (username, email, password) VALUES ('John Doe', 'john.doe@example.com', 'hashed_password');

-- INSERT INTO transactions (amount, transaction_type, user_id, status)
-- VALUES (100.00, 'DEPOSIT', 1, 'PENDING');

-- INSERT INTO transactions (amount, transaction_type, user_id, status)
-- VALUES (50.00, 'WITHDRAWAL', 1, 'COMPLETED');

select * from transactions;