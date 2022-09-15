import express from "express";
import db from "../database/connect.js";
import { servicesValidator } from "../middleware/validate.js";
const Router = express.Router();
Router.post("/new", servicesValidator, async (req, res) => {
  try {
    await db.Services.create(req.body);
    res.send("Naujas paslauga sukurta");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Router.put("/edit/:id", servicesValidator, async (req, res) => {
  try {
    const services = await db.Services.findByPk(req.params.id);
    await services.update(req.body);
    res.send("Paslauga sekmingai atnaujinta");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Router.get("/", async (req, res) => {
  try {
    const Services = await db.Services.findAll({
      include:{model:  db.Saloons,
      attributes: ['name']}
    });
    res.json(Services);
  } catch (error) {
    console.log(error);
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const services = await db.Services.findByPk(req.params.id);
    await services.destroy();
    res.send("Paslauga ištrinta");
  } catch (error) {
    console.log(error);
  }
});
Router.get('/edit/:id', async (req, res) => {
  try {
      const service = await db.Services.findByPk(req.params.id
      )
      res.json(service)
  } catch (error){
    console.log(error)
      res.status(500).send('Įvyko serverio klaida')
  }
})

export default Router;
