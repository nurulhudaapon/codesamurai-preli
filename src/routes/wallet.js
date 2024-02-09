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
    wallet_id: wallet_id,
    balance: users.balance,
    wallet_user: {
      user_id: users.user_id,
      user_name: users.user_name,
    },
  };

  return res.status(200).json(wallet);
});

/**
 Add Wallet Balance
Add funds to the user's wallet. Added fund must be an integer within range 100 - 10000 Taka. Any value out of
range should be responded with appropriate errors.
Request Specification
URL: /api/wallets/{wallet_id} # Wallet ID is part of the path parameter.

Method: PUT
Request model:

{
"recharge": integer # Fund to be added to the wallet
}

Successful Response
Upon successful operation, your API must return a 200 status code with the updated wallet objects.
Response status: 200 - Ok
Response model

{
"wallet_id": integer, # user's wallet id
"balance": integer, # user's wallet balance
"wallet_user":
{
"user_id": integer, # user's numeric id
"user_name": string # user's full name
}
}

Failed Response
If a wallet does not exist with the given ID, your API must return a 404 status code with a message.
Response status: 404 - Not Found
Response model

{
"message": "wallet with id: {wallet_id} was not found"
}

Replace {wallet_id} with the wallet ID from request.
If the recharge amount is out of range (not between 100 and 10000), then return a 400 status code with
a message.
Response status: 400 - Bad Request
Response model

{
"message": "invalid amount: {recharge_amount}"
}

Replace {recharge_amount} with the amount that was sent with the request body.
Examples
Let's look at some example requests and response.
Example request:
Request URL: [PUT] http://localhost:8000/api/wallets/1
Content Type: application/json
Request Body:

{
"recharge": 150
}

Example success response:
Content Type: application/json
HTTP Status Code: 200
Response Body:

{
"wallet_id": 1,
"wallet_balance": 250,
"wallet_user": {
"user_id": 1,
"user_name": "Fahim"
}
}

Example request when wallet does not exist:
Request URL: [GET] http://localhost:8000/api/wallets/67
Content Type: application/json
Request Body:

{
"recharge": 150
}

Example failed response:
Content Type: application/json
HTTP Status Code: 404
Response Body:

{
"message": "wallet with id: 67 was not found"
}

Example request when amount is out of range:
Request URL: [GET] http://localhost:8000/api/wallets/1
Content Type: application/json
Request Body:

{
"recharge": 3
}

Example failed response:
Content Type: application/json
HTTP Status Code: 400
Response Body:

{
"message": "invalid amount: 3"
}
 */

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
    wallet_id: wallet_id,
    balance: updatedUser.balance,
    wallet_user: {
      user_id: updatedUser.user_id,
      user_name: updatedUser.user_name,
    },
  };

  return res.status(200).json(wallet);
});


export { router as walletRouter };
