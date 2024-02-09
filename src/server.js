import express from "express";
import { userRouter } from "./routes/user.js";
import { stationRouter } from "./routes/station.js";
import { trainRouter } from "./routes/train.js";
import { walletRouter } from "./routes/wallet.js";
import { graph, floydWarshall } from "./utils.js";
import { ticketRouter } from "./routes/ticket.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/stations", stationRouter);
app.use("/api/trains", trainRouter);
app.use("/api/wallets", walletRouter);
app.use("/api/tickets", ticketRouter);

// curl -X GET \
// "http://localhost:8000/api/routes?from=1&to=5&optimize=cost"
app.get("/api/routes", (req, res) => {
  const { from, to } = req.query;
  const optimized = req.query.optimize;
  if (optimized == "cost") {
    floydWarshall();
    res.status(200).json({
      total_cost: graph[from][to],
      // total_time: graph[from][to].time,
      // stations: graph[from][to].path,
    });
  } else if (optimized == "time") {
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
