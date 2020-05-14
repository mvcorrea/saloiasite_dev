console.log("in controllers");

module.exports = (router) => {
  const users = require("./users");
  const orders = require("./orders");
  const deliveries = require("./delivery");
  const products = require("./product");
  const messages = require("./message");

  // -----
  // Create a new User
  router.post("/user", users.createUser);
  // Retrieve all Users
  router.get("/user", users.findAllUsers);
  // Find one User
  router.get("/user/:id", users.findUser);
  // Find or Create one User by its phone
  router.get("/user/phone/:phone", users.findUserPhone);

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

  // -----
  // Create a new Product
  //router.post("/prd", products.createProduct);
  // Retrieve all Delivery
  router.get("/prd", products.findAllProducts);
  // Find one Delivery
  router.get("/prd/:id", products.findProduct);

  // -----
  // Create a new Message
  router.post("/msg", messages.createMessage);
  // Retrieve all Delivery
  router.get("/msg", messages.findAllMessages);
  // Find one Delivery
  //router.get("/msg/:id", messages.findMessage);
};
