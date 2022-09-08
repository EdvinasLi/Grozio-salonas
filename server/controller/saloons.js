import express from "express";
import db from "../database/connect.js";
const Router = express.Router();

Router.post("/new", async (req, res) => {
  try {
    await db.Saloons.create(req.body);
    res.send("Naujas Salonas sukurtas");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Router.put("/edit/:id", async (req, res) => {
  try {
    const saloon = await db.Saloons.findByPk(req.params.id);
    await saloon.update(req.body);
    res.send("Salonas sekmingai atnaujintas");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Router.get("/", async (req, res) => {
  try {
    const Saloons = await db.Saloons.findAll();
    res.json(Saloons);
  } catch (error) {
    console.log(error);
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const saloon = await db.Saloons.findByPk(req.params.id);
    await saloon.destroy();
    res.send("Salonas ištrintas");
  } catch (error) {
    console.log(error);
  }
});

export default Router;
