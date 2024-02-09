import express from "express";
import { prisma } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, user_name, balance } = req.body;

  const newUser = await prisma.users.create({
    data: {
      user_id,
      user_name,
      balance,
    },
  });
  res.status(201).json(newUser);
});

export { router as userRouter };
