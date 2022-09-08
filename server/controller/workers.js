import express from "express";
import db from "../database/connect.js";
const Router = express.Router();
import upload from "../middleware/multer.js";

Router.post("/new", upload.single("photo"), async (req, res) => {
  try {
    req.body.photo = "/uploads/" + req.file.filename;

    await db.Workers.create(req.body);
    res.send("Naujas darbuotojas sukurtas");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Router.put("/edit/:id", upload.single("photo"), async (req, res) => {
  try {
    if (req.file) req.body.photo = req.file.filename;

    const workers = await db.Workers.findByPk(req.params.id);
    await workers.update(req.body);
    res.send("Darbuotojo info atnaujinta");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Router.get("/", async (req, res) => {
  try {
    const Workers = await db.Workers.findAll();
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

export default Router;
