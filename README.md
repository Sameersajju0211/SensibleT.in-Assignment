# **Transactions Management API**

A Node.js application for managing users and transactions using SQLite3 as the database. The application provides APIs for creating, updating, and retrieving transaction records.  

Deployed at: [https://sensiblet-in-assignment.onrender.com](https://sensiblet-in-assignment.onrender.com)

---

## **Features**
- **Users**: Create and manage users.
- **Transactions**:
  - Create new transactions (DEPOSIT/WITHDRAWAL).
  - Retrieve all transactions for a user.
  - Update transaction status (PENDING/COMPLETED/FAILED).
  - Retrieve specific transaction details.

---

## **Technologies Used**
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **ORM**: sqlite
- **Testing**: Postman or cURL

---

## **Project Structure**

```
transactions-management-api/
│
├── index.js                 # Main application entry point
├── database.sql             # SQLite table creation commands
├── database.db              # SQLite database file (auto-created)
├── package.json             # Node.js project details and dependencies
├── .gitignore              
└── README.md                # Comprehensive guide to the project
```

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd transactions-management-api
```

### **2. Install Dependencies**
Ensure you have **Node.js** installed. Then run:
```bash
npm install
```

### **3. Run the Server Locally**
```bash
node index.js
```

The server will run at [http://localhost:3000](http://localhost:3000).  

For the deployed version, use [https://sensiblet-in-assignment.onrender.com](https://sensiblet-in-assignment.onrender.com).

---

## **API Endpoints**

### **1. Create a New User**
**POST** `/api/users/`  
Create a new user.  

**Request Body**:
```json
{
    "username": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

**Response**:
```json
{
    "id": 1,
    "username": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

**Example**:  
[https://sensiblet-in-assignment.onrender.com/api/users/](https://sensiblet-in-assignment.onrender.com/api/users/)

---

### **2. Create a New Transaction**
**POST** `/api/transactions/`  
Add a transaction for a specific user.  

**Request Body**:
```json
{
    "amount": 100.00,
    "transaction_type": "DEPOSIT",
    "user": 1
}
```

**Response**:
```json
{
    "id": 1,
    "amount": 100.00,
    "transaction_type": "DEPOSIT",
    "user_id": 1,
    "timestamp": "2024-11-19T10:00:00.000Z",
    "status": "PENDING"
}
```

**Example**:  
[https://sensiblet-in-assignment.onrender.com/api/transactions/](https://sensiblet-in-assignment.onrender.com/api/transactions/)

---

### **3. Retrieve All Transactions**
**GET** `/api/transactions/?user_id=1`  
Fetch all transactions for a user, ordered by the latest.

**Response**:
```json
{
    "transactions": [
        {
            "id": 1,
            "amount": 100.00,
            "transaction_type": "DEPOSIT",
            "user_id": 1,
            "timestamp": "2024-11-19T10:00:00.000Z",
            "status": "PENDING"
        }
    ]
}
```

**Example**:  
[https://sensiblet-in-assignment.onrender.com/api/transactions/?user_id=1](https://sensiblet-in-assignment.onrender.com/api/transactions/?user_id=1)

---

### **4. Retrieve Specific Transaction**
**GET** `/api/transactions/:transaction_id/`  
Fetch details of a specific transaction by its ID.

**Response**:
```json
{
    "id": 1,
    "amount": 100.00,
    "transaction_type": "DEPOSIT",
    "user_id": 1,
    "timestamp": "2024-11-19T10:00:00.000Z",
    "status": "PENDING"
}
```

**Example**:  
[https://sensiblet-in-assignment.onrender.com/api/transactions/1/](https://sensiblet-in-assignment.onrender.com/api/transactions/1/)

---

### **5. Update Transaction Status**
**PUT** `/api/transactions/:transaction_id/`  
Update the status of a transaction (e.g., `COMPLETED`, `FAILED`).  

**Request Body**:
```json
{
    "status": "COMPLETED"
}
```

**Response**:
```json
{
    "id": 1,
    "amount": 100.00,
    "transaction_type": "DEPOSIT",
    "user_id": 1,
    "timestamp": "2024-11-19T10:00:00.000Z",
    "status": "COMPLETED"
}
```

**Example**:  
[https://sensiblet-in-assignment.onrender.com/api/transactions/1/](https://sensiblet-in-assignment.onrender.com/api/transactions/1/)

---

## **Database Schema**

### **Users Table**
| Column    | Type    | Constraints          |
|-----------|---------|----------------------|
| id        | INTEGER | Primary Key          |
| username  | TEXT    | NOT NULL             |
| email     | TEXT    | UNIQUE, NOT NULL     |
| password  | TEXT    | -                    |

### **Transactions Table**
| Column           | Type       | Constraints                                   |
|-------------------|------------|-----------------------------------------------|
| id               | INTEGER    | Primary Key                                  |
| amount           | DECIMAL    | NOT NULL                                     |
| transaction_type | TEXT       | CHECK(DEPOSIT, WITHDRAWAL) NOT NULL          |
| user_id          | INTEGER    | Foreign Key (users.id)                       |
| timestamp        | DATETIME   | Default: CURRENT_TIMESTAMP                   |
| status           | TEXT       | CHECK(PENDING, COMPLETED, FAILED) NOT NULL   |

---

## **How to Test**

### **1. Using Postman**  
- Import the endpoints into Postman using the URLs listed above.
- Send requests with the required payload to test each feature.

### **2. Using cURL**  
Examples:

- **Create User**:
```bash
curl -X POST https://sensiblet-in-assignment.onrender.com/api/users/ -H "Content-Type: application/json" -d '{
    "username": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}'
```

- **Create Transaction**:
```bash
curl -X POST https://sensiblet-in-assignment.onrender.com/api/transactions/ -H "Content-Type: application/json" -d '{
    "amount": 100.00,
    "transaction_type": "DEPOSIT",
    "user": 1
}'
```

- **Retrieve Transactions**:
```bash
curl -X GET "https://sensiblet-in-assignment.onrender.com/api/transactions/?user_id=1"
```

- **Update Transaction Status**:
```bash
curl -X PUT https://sensiblet-in-assignment.onrender.com/api/transactions/1/ -H "Content-Type: application/json" -d '{
    "status": "COMPLETED"
}'
```

---

## **Future Enhancements**
- Add user authentication using JWT.
- Implement more transaction filters (date, status, etc.).
- Build a frontend interface to manage users and transactions.

---

Feel free to use this `README.md`. Let me know if you need further refinements! 🚀
