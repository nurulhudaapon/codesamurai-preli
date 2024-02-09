import express from "express";
import { prisma } from '../db.js'

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    train_id,
    train_name,
    capacity,
    stops
  } = req.body;

  try {
    const newTrain = await prisma.trains.create({
      data: {
        train_id,
        train_name,
        capacity,
        stops: {
          create: stops
        }
      }
    });

    res.status(201).json(newTrain);
  } catch (error) {
    res.status(400).json({ message: "" });
  }
});

export { router as trainRouter };
