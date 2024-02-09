import express from "express";
import { prisma } from '../db.js'

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    user_id,
    user_name,
    balance
  } = req.body;

  try {
    const newUser = await prisma.users.create({
      data: {
        user_id,
        user_name,
        balance
      }
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "" });
  }
});

export { router as userRouter };
