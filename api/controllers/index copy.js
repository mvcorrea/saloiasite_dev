console.log("in controllers");

const router = require("express").Router();

const users = require("./users");
const orders = require("./orders");
const deliveries = require("./delivery");

// -----
// Create a new User
router.post("/user", users.createUser);
// Retrieve all Users
router.get("/user", users.findAllUsers);
// Find one User
router.get("/user/:id", users.findUser);

// -----
// Create a new Order
router.post("/order", orders.createOrder);
// Retrieve all Orders
router.get("/order", orders.findAllOrders);
// Find one Order
router.get("/order/:id", orders.findOrder);

// -----
// Create a new Delivery
router.post("/dlv", deliveries.createDelivery);
// Retrieve all Delivery
router.get("/dlv", deliveries.findAllDeliveries);
// Find one Delivery
router.get("/dlv/:id", deliveries.findDelivery);


module.exports = { users, orders, deliveries };
