const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL Connection
const pool = new Pool({
    user: 'u3m7grklvtlo6',
    host: '35.209.89.182',
    database: 'dbzvtfeophlfnr',
    password: 'AekAds@24',
    port: 5432,
});

// Show Form & Records
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM sales_customer");
        res.render("index", { customers: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error fetching data");
    }
});

// Insert Data
app.post("/add", async (req, res) => {
    const { company_name, customer_name, customer_email, total_spend, screen_quantity, payment_date, payment_mode, payment_status } = req.body;
    const sql = "INSERT INTO sales_customer (company_name, customer_name, customer_email, total_spend, screen_quantity, payment_date, payment_mode, payment_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    try {
        await pool.query(sql, [company_name, customer_name, customer_email, total_spend, screen_quantity, payment_date, payment_mode, payment_status]);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send("Error adding data");
    }
});

// Update Data
app.post("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { company_name, customer_name, customer_email, total_spend, screen_quantity, payment_date, payment_mode, payment_status } = req.body;
    const sql = "UPDATE sales_customer SET company_name=$1, customer_name=$2, customer_email=$3, total_spend=$4, screen_quantity=$5, payment_date=$6, payment_mode=$7, payment_status=$8 WHERE id=$9";
    try {
        await pool.query(sql, [company_name, customer_name, customer_email, total_spend, screen_quantity, payment_date, payment_mode, payment_status, id]);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send("Error updating data");
    }
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
