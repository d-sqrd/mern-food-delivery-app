const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

router.post("/orderData", async (req, res) => {
  let data = req.body.orderData;
  console.log(`order-data-API-req-data = ${JSON.stringify(req.body)}`);
  await data.splice(0, 0, { orderDate: req.body.orderDate });
  let emailId = await Order.findOne({ email: req.body.email });
  if (emailId === null) {
    try {
      await Order.create({ email: req.body.email, orderData: [data] }).then(
        () => {
          res.json({ success: true });
        }
      );
    } catch (err) {
      console.log(`Error in orderData route!!!!`);
      res.send(`Server Error = ${err.message}`);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { orderData: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (err) {
      res.send(`Server Error = ${err.message}`);
    }
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    const orderData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: orderData });
  } catch (err) {
    console.log(`Error in myOrderData route...ERROR = ${err}`);
    res.json({ error: err });
  }
});

module.exports = router;
