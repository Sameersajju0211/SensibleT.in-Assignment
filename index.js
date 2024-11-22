const express = require('express');
const app = express();
const path = require('path');
const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const db_path = path.join(__dirname,'database.db');
let db = null;

const initializeDBAndServer = async ()=>{
    try{
        db = await open({
            filename: db_path,
            driver: sqlite3.Database
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    }catch(e){
        console.log(`Database error: ${e.message}`);
        process.exit(1);
    }
};
initializeDBAndServer();

app.use(express.json());
app.use(cors());

// 1. POST /api/transactions/ - Create a new transaction
app.post('/api/transactions/', async (req, res) => {
    const { amount, transaction_type, user } = req.body;

    try {
        const userExists = await db.get(`SELECT id FROM users WHERE id = ?`, [user]);
        if (!userExists) {
            return res.status(400).send({ error: 'User does not exist' });
        }

        const createTransactionQuery = `
            INSERT INTO transactions (amount, transaction_type, user_id, status)
            VALUES (?, ?, ?, 'PENDING');
        `;
        const result = await db.run(createTransactionQuery, [amount, transaction_type, user]);

        const transactionId = result.lastID;
        const transaction = await db.get(`SELECT * FROM transactions WHERE id = ?`, [transactionId]);
        res.status(201).send(transaction);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// 2. GET /api/transactions/ - Retrieve all transactions for a specific user
app.get('/api/transactions/', async (req, res) => {
    const { user_id } = req.query;

    try {
        const transactions = await db.all(
            `SELECT * FROM transactions WHERE user_id = ? ORDER BY timestamp DESC`,
            [user_id]
        );

        if (transactions.length === 0) {
            return res.status(404).send({ message: 'No transactions found for the user.' });
        }

        res.status(200).send({ transactions });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// 3. PUT /api/transactions/{transaction_id}/ - Update the status of a transaction
app.put('/api/transactions/:transaction_id/', async (req, res) => {
    const { transaction_id } = req.params;
    const { status } = req.body;

    try {
        if (!['COMPLETED', 'FAILED'].includes(status)) {
            return res.status(400).send({ error: 'Invalid status value.' });
        }

        const updateQuery = `
            UPDATE transactions
            SET status = ?
            WHERE id = ?
        `;
        const result = await db.run(updateQuery, [status, transaction_id]);

        if (result.changes === 0) {
            return res.status(404).send({ error: 'Transaction not found.' });
        }

        const updatedTransaction = await db.get(`SELECT * FROM transactions WHERE id = ?`, [transaction_id]);
        res.status(200).send(updatedTransaction);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// 4. GET /api/transactions/{transaction_id}/ - Retrieve details of a specific transaction
app.get('/api/transactions/:transaction_id/', async (req, res) => {
    const { transaction_id } = req.params;

    try {
        const transaction = await db.get(`SELECT * FROM transactions WHERE id = ?`, [transaction_id]);

        if (!transaction) {
            return res.status(404).send({ error: 'Transaction not found.' });
        }

        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// 5. User Creation API
app.post('/api/users/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const createUserQuery = `
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?);
        `;
        const result = await db.run(createUserQuery, [username, email, password]);

        const userId = result.lastID;
        const user = await db.get(`SELECT * FROM users WHERE id = ?`, [userId]);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
