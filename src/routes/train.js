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
      }
    });

    for (let index = 0; index < stops.length; index++) {
      await prisma.stops.create({
        data: {
          arrival_time: stops[index].arrival_time,
          departure_time: stops[index].departure_time,
          fare: stops[index].fare,
          train: {
            connect: {
              train_id,
            }
          },
          station: {
            connect: {
              station_id: stops[index].station_id,
            }
          }
        }
      })
    }

    const times = stops.flatMap((stop) => ([stop.arrival_time, stop.departure_time])).filter(Boolean).sort();
    const startTime = times[0];
    const endTime = times[times.length - 1]

    res.status(201).json({
      ...newTrain,
      "service_start": startTime,
      "service_ends": endTime,
      "num_stations": stops.length
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "" });
  }
});

export { router as trainRouter };
