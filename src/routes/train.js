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

    // await prisma.stops.create({
    //   data: {
    //     arrival_time: stops[0].arrival_time,
    //     departure_time: stops[0].departure_time,
    //     fare: stops[0].fare,
    //     train: {
    //       connect: {
    //         train_id,
    //       }
    //     },
    //     station: {
    //       connect: {
    //         station_id: stops[0].station_id,
    //       }
    //     }
    //   }
    // })

    const newTrain = await prisma.trains.create({
      data: {
        train_id,
        train_name,
        capacity,
      }
    });

    await Promise.all(
      stops.map((stop) => {
        return prisma.stops.create({
          data: {
            arrival_time: stop.arrival_time,
            departure_time: stop.departure_time,
            fare: stop.fare,
            train: {
              connect: {
                train_id,
              }
            },
            station: {
              connect: {
                station_id: stop.station_id,
              }
            }
          }
        })
      })
    );

    res.status(201).json(newTrain);

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "" });
  }
});

export { router as trainRouter };
