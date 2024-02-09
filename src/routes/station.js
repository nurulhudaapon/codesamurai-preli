import express from "express";
import { prisma } from '../db.js'

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    station_id,
    station_name,
    longitude,
    latitude,
  } = req.body;

  try {
    const newStation = await prisma.stations.create({
      data: {
        station_id,
        station_name,
        longitude,
        latitude,
      }
    });
    res.status(201).json(newStation);
  } catch (error) {
    res.status(400).json({ message: "" });
  }
});

export { router as stationRouter };
