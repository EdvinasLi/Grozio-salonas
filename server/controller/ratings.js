import express from "express";
import db from "../database/connect.js";
import { ratingsValidator } from "../middleware/validate.js";

const router = express.Router();

router.post("/worker/:id", ratingsValidator, async (req, res) => {
  req.body.workerId = req.params.id;
  try {
    await db.Ratings.create(req.body);
    res.status(200).send("Ivertinimas sekmingai issaugotas");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
