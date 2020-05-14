console.log("in api");
const db = require("./models");
const router = require("express").Router();
const saloia = require("./controllers")(router);
//const seed = require("./seed")(db);

db.sequelize
  //.sync({ force: false, alter: true })
  .sync({ force: false })
 // .then(() => seed1())
  .then(() => console.log("Drop and re-sync db (for testing)."));




// db.sequelize
//     .drop()
//     .sync();
//   .then(() => {
//     return db.sequelize.sync();
//   })
//   .then(() => seed1());

//   .sync()
//   .then(() => {
//     return db.sequelize.drop();
//   })
//   .then(() => seed1());

//    .query("SET FOREIGN_KEY_CHECKS = 0")
//    .then(() => { return db.sequelize.sync({ force: true }) })
//    .then(() => { return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1') })
//    .then(() => console.log("Drop and re-sync db (for testing)."));

router.get("/", (req, res) => {
  res.send("use:<br> /user (get/post)<br> /post (get/post)");
});

// // -----
// // Create a new User
// router.post("/user", saloia.users.createUser);
// // Retrieve all Users
// router.get("/user", saloia.users.findAllUsers);
// // Find one User
// router.get("/user/:id", saloia.users.findUser);

// // -----
// // Create a new Order
// router.post("/order", saloia.orders.createOrder);
// // Retrieve all Orders
// router.get("/order", saloia.orders.findAllOrders);
// // Find one Order
// router.get("/order/:id", saloia.orders.findOrder);

// // -----
// // Create a new Delivery
// router.post("/dlv", saloia.deliveries.createDelivery);
// // Retrieve all Delivery
// router.get("/dlv", saloia.deliveries.findAllDeliveries);
// // Find one Delivery
// router.get("/dlv/:id", saloia.deliveries.findDelivery);


/*
curl -i -X POST -H "Content-Type: application/json" -d '{"phone": "5585998009129", "id": "U.11111111", "name": "Marcelo Correa"}' localhost:5002/api/user
curl -i -X POST -H "Content-Type: application/json" -d '{"id":"O.11111111", "userid": "U.11111111"}' localhost:5002/api/order
*/

const seed1 = () => {
  return Promise.all([
    db.User.create({
      name: "Marcelo Correa",
      phone: "5585998009129",
      addr: { rua: "Rua Tomas Lopes, 104", cep: "60060260" },
      id: "U.11111111",
    }),
    db.User.create({
      name: "Carla Soledade",
      phone: "5585981816046",
      addr: { rua: "Rua Tomas Lopes, 104", cep: "60060260" },
      active: false,
      id: "U.22222222",
    }),
    db.Delivery.create({
      id: "D.11111111",
    }),
    db.Delivery.create({
      id: "D.22222222",
    }),
    db.Order.create({
      id: "O.11111111",
      userId: "U.11111111",
      deliveryId: "D.11111111",
    }),
    db.Order.create({
      id: "O.22222222",
      userId: "U.11111111",
      deliveryId: "D.22222222",
    }),
    db.Order.create({
      id: "O.33333333",
      userId: "U.22222222",
      deliveryId: "D.22222222",
    }),
    db.Order.create({
        id: "O.44444444",
        userId: "U.22222222",
      }),
  ]).catch((error) => console.log(error));
};


module.exports = router;
