import express from "express";
import { prisma } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { station_id, station_name, longitude, latitude } = req.body;

  try {
    const newStation = await prisma.stations.create({
      data: {
        station_id,
        station_name,
        longitude,
        latitude,
      },
    });
    res.status(201).json(newStation);
  } catch (error) {
    res.status(400).json({ message: "" });
  }
});

// List All Stations
router.get("/", async (req, res) => {
  const stations = await prisma.stations.findMany();
  res.status(200).json({ stations });
});

// List All Trains at a Station
router.get("/:station_id/trains", async (req, res) => {
  const { station_id } = req.params;
  const station = await prisma.stations.findUnique({
    where: {
      station_id: parseInt(station_id),
    },
    include: {
      stops: {
        include: {
          arrival_time: true,
          departure_time: true,
        },
        orderBy: [
          {
            departure_time: "asc",
          },
          {
            arrival_time: "asc",
          },

          {
            id: "asc",
          },
        ],
        include: {
          train: {
            select: {
              train_id: true,
            },
          },
        },
      },
    },
  });

  if (!station)
    return res
      .status(404)
      .json({ message: `station with id: ${station_id} was not found` });

  const mappedStation = {
    station_id: station.station_id,
    trains: station.stops.map((stop) => {
      return {
        train_id: stop.train.train_id,
        arrival_time: stop.arrival_time,
        departure_time: stop.departure_time,
      };
    }),
  };
  return res.status(200).json(mappedStation);
});

export { router as stationRouter };
