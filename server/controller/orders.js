import express from "express";
import db from "../database/connect.js";
import { ordersValidator } from "../middleware/validate.js";
const Router = express.Router();

Router.post("/new", ordersValidator, async (req, res) => {
  try {
    await db.Orders.create(req.body);
    res.send("Naujas uzsakymas sukurtas");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Router.put("/edit/:id", ordersValidator, async (req, res) => {
  try {
    const order = await db.Orders.findByPk(req.params.id);
    await order.update(req.body);
    res.send("Paslauga sekmingai atnaujinta");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Admino uzsakymu sarasas
Router.get("/", async (req, res) => {
  try {
    const Orders = await db.Orders.findAll();
    res.json(Orders);
  } catch (error) {
    console.log(error);
  }
});
//VartotojuUzsakymu sarasas
Router.get("/user/", async (req, res) => {
  const user_Id = 1;
  try {
    const Orders = await db.Orders.findAll({
      where: { user_Id: user_Id },
    });
    res.json(Orders);
  } catch (error) {
    console.log(error);
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const orders = await db.Orders.findByPk(req.params.id);
    await orders.destroy();
    res.send("uzsakymas sekmingai ištrintas");
  } catch (error) {
    console.log(error);
  }
});

export default Router;
