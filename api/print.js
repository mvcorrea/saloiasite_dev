const escpos = require("escpos");
escpos.Network = require("escpos-network");

const device = new escpos.Network("192.168.88.21");
//const options = { encoding: "GB18030" };
const options = { encoding: "utf8" };

const printer = new escpos.Printer(device, options);
//const printer = new escpos.Printer(device);

device.open(function (error) {
  printer
    .font("a")
    .align("ct")
    .style("bu")
    .size(3, 2)
    .text("+qBarato")
    .size(1, 1)
    .text("(085)99800.9129")
    .feed()
    .font("b")
    .tableCustom([
      { text: "Order", width: 0.22, aligh: "LEFT" },
      { text: "User", width: 0.22, align: "LEFT" },
      { text: "Delivery", width: 0.22, align: "LEFT" },
      { text: "Date", width: 0.34, aligh: "RIGHT" },
    ])
    .tableCustom([
      { text: "O.11111111", width: 0.22, align: "LEFT" },
      { text: "U.11111111", width: 0.22, align: "LEFT" },
      { text: "D.11111111", width: 0.22, align: "LEFT" },
      { text: "2020-05-08 03:48:12", width: 0.34, aligh: "RIGHT" },
    ])
    //.table(["O.11111111", "U.11111111", "2020-05-08 03:48:12"])
    .feed()

    // .text("The quick brown fox jumps over the lazy dog")
    // .text("敏捷的棕色狐狸跳过懒狗")
    // .barcode("1234567", "EAN8")
    // .table(["One", "Two", "Three"])
    // .tableCustom(
    //   [
    //     { text: "Left", align: "LEFT", width: 0.33, style: "B" },
    //     { text: "Center", align: "CENTER", width: 0.33 },
    //     { text: "Right", align: "RIGHT", width: 0.33 },
    //   ],
    //   { encoding: "cp857", size: [1, 1] } // Optional
    // )
    .tableCustom([
      { text: "Item", width: 0.65, align: "LEFT" },
      { text: "Quant", width: 0.1, align: "RIGHT" },
      { text: "Price", width: 0.2, align: "RIGHT" },
    ])
    .drawLine()
    .tableCustom([
      {
        text: "The quick brown fox jumps over",
        align: "LEFT",
        width: 0.65,
      },
      {
        text: "99.00",
        align: "RIGHT",
        width: 0.1,
      },
      {
        text: "290.00",
        align: "RIGHT",
        width: 0.2,
      },
    ])
    .tableCustom([
      {
        text: "123456789012345678901234567890123456",
        align: "LEFT",
        width: 0.65,
      },
      {
        text: "1.00",
        align: "RIGHT",
        width: 0.1,
      },
      {
        text: "1190.00",
        align: "RIGHT",
        width: 0.2,
      },
    ])
    .tableCustom([
      {
        text: "The quick brown fox jumps over the",
        align: "LEFT",
        width: 0.65,
      },
      {
        text: "8.00",
        align: "RIGHT",
        width: 0.1,
      },
      {
        text: "22.00",
        align: "RIGHT",
        width: 0.2,
      },
    ])
    .drawLine()
    .font("a")
    .size(1, 1)
    .tableCustom([
      { text: "Subtotal:", align: "LEFT" },
      { text: "R$ 1502.00", align: "RIGHT" },
    ])
    .feed()
    .size(2, 1)
    .tableCustom([
      { text: "Total:", width: 0.15, align: "LEFT" },
      { text: "R$ 1502.00", width: 0.35, align: "RIGHT" },
    ])
    .feed()
    .font("b")
    .text("!footer message!")
    .feed()
    .cut()
    .close();
  // .qrimage("https://github.com/song940/node-escpos", function (err) {
  //   this.cut();
  //   this.close();
  // });
});
