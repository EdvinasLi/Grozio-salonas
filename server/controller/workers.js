import express from "express";
import db from "../database/connect.js";
const Router = express.Router();
import upload from "../middleware/multer.js";
import { workersValidator } from "../middleware/validate.js";

Router.post(
  "/new",
  upload.single("photo"),
  workersValidator,
  async (req, res) => {
    try {
      if (req.file) 
      
      req.body.photo = "/uploads/" + req.file.filename;

      await db.Workers.create(req.body);
      res.send("Naujas darbuotojas sukurtas");
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  }
);

Router.put(
  "/edit/:id",
  upload.single("photo"),
  workersValidator,
  async (req, res) => {
    try {
      if (req.file) req.body.photo = req.file.filename;

      const workers = await db.Workers.findByPk(req.params.id);
      await workers.update(req.body);
      res.send("Darbuotojo info atnaujinta");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

Router.get("/", async (req, res) => {
  try {
    const Workers = await db.Workers.findAll({
      include: { model: db.Saloons, attributes: ["name"] },
    });
    res.json(Workers);
  } catch (error) {
    console.log(error);
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const workers = await db.Workers.findByPk(req.params.id);
    await workers.destroy();
    res.send("Darbuotojas ištrintas");
  } catch (error) {
    console.log(error);
  }
});
Router.get('/edit/:id', async (req, res) => {
  try {
      const workers = await db.Workers.findByPk(req.params.id
      )
      res.json(workers)
  } catch (error){
    console.log(error)
      res.status(500).send('Įvyko serverio klaida')
  }
})

export default Router;
