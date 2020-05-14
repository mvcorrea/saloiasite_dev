module.exports = (db) => {
  return Promise.all([
    db.User.create({
      name: "Marcelo Correa",
      phone: ["5585998009129","351963988554"],
      addr: { rua: "Rua Tomas Lopes, 104", cep: "60060260" },
      id: "U.11111111",
    }),
    db.User.create({
      name: "Carla Soledade",
      phone: ["5585981816046"],
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
    db.Product.create({
      id: "P.11111111",
      cat: "pratos",
      name: "Frango Assado",
      price: 22,
    }),
    db.Product.create({
      id: "P.22222222",
      cat: "pratos",
      name: "Frango Assado 1/2",
      price: 14,
    }),
    db.Product.create({
      id: "P.33333333",
      cat: "acompanhamentos",
      name: "Baião de Dois",
      price: 10,
    }),
    db.Product.create({
      id: "P.44444444",
      cat: "acompanhamentos",
      name: "Linguiça de Frango",
      price: 3,
    }),
    db.Product.create({
      id: "P.55555555",
      cat: "acompanhamentos",
      name: "Batata Frita",
      price: 3,
    }),
    db.Product.create({
      id: "P.66666666",
      cat: "bebidas",
      name: "Cerveja Devassa 600ml",
      price: 8,
    }),
    db.Product.create({
      id: "P.77777777",
      cat: "bebidas",
      name: "Cerveja Heineken 600ml",
      price: 12,
    }),
    db.OrderProduct.create({
      orderId: "O.11111111",
      productId: "P.11111111",
      options: "com piripiri",
    }),
    db.OrderProduct.create({
      orderId: "O.11111111",
      productId: "P.33333333",
      options: "somente com queijo",
    }),
    db.OrderProduct.create({
      orderId: "O.22222222",
      productId: "P.77777777",
    }),
    db.OrderProduct.create({
      orderId: "O.22222222",
      productId: "P.55555555",
    }),
    db.OrderProduct.create({
      orderId: "O.33333333",
      productId: "P.77777777",
    }),
    db.Message.create({
      id: "M.11111111",
      userId: "U.11111111",
      msg: {},
    }),
    db.Message.create({
      id: "M.22222222",
      userId: "U.11111111",
      msg: {},
    }),
  ]).catch((error) => console.log(error));
};
