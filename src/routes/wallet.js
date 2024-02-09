import express from "express";
import { prisma } from "../db.js";

const router = express.Router();

router.get("/:wallet_id", async (req, res) => {
  const { wallet_id } = req.params;
  const users = await prisma.users.findUnique({
    where: {
      user_id: parseInt(wallet_id),
    },
    select: {
      user_id: true,
      user_name: true,
      balance: true,
    },
  });

  if (!users)
    return res
      .status(404)
      .json({ message: `wallet with id: ${wallet_id} was not found` });
  const wallet = {
    wallet_id: +wallet_id,
    balance: users.balance,
    wallet_user: {
      user_id: users.user_id,
      user_name: users.user_name,
    },
  };

  return res.status(200).json(wallet);
});

router.put("/:wallet_id", async (req, res) => {
  const { wallet_id } = req.params;
  const { recharge } = req.body;
  if (recharge < 100 || recharge > 10000) {
    return res.status(400).json({ message: `invalid amount: ${recharge}` });
  }
  const user = await prisma.users.findUnique({
    where: {
      user_id: parseInt(wallet_id),
    },
  });

  if (!user)
    return res
      .status(404)
      .json({ message: `wallet with id: ${wallet_id} was not found` });

  const updatedUser = await prisma.users.update({
    where: {
      user_id: parseInt(wallet_id),
    },
    data: {
      balance: user.balance + recharge,
    },
  });

  const wallet = {
    wallet_id: +wallet_id,
    balance: updatedUser.balance,
    wallet_user: {
      user_id: updatedUser.user_id,
      user_name: updatedUser.user_name,
    },
  };

  return res.status(200).json(wallet);
});

export { router as walletRouter };
