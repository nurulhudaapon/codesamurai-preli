import express from "express"
import { userRouter } from "./routes/user.js"
import { stationRouter } from "./routes/station.js";
import { trainRouter } from "./routes/train.js";
import { walletRouter } from "./routes/wallet.js";

const app = express()
const PORT = 8000

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/stations', stationRouter);
app.use('/api/trains', trainRouter);
app.use('/api/wallets', walletRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})