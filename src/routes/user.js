import express from "express";
import { prisma } from '../../utils/prisma'

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
    res.status(400).json({ message: "" });
  }
});

export { router as userRouter };
