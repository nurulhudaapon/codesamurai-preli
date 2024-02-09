import express from "express";
import { prisma } from "../db.js";

const router = express.Router();

/**
 Users can use their wallet balance to purchase tickets from stations A to B. The cost is calculated as the sum of
the fares for each pair of consecutive stations along the route. Upon successful purchase, your API should
respond with the station in order visited by one or more trains and the remaining wallet balance. If the wallet
does not have sufficient funds, respond with an error specifying the shortage amount. If it is impossible to
reach station B from station A within the day or due to a lack of trains, respond with an error specifying that no
tickets are available.
Note: The user may want to change the train at a particular station for a cheaper trip. Partial scoring will be
awarded if your API fails to find an optimal route. You can assume that the start and destination stations will
always differ, and the user must complete the trip within the current day.
Request Specification
URL: /api/tickets
Method: POST
Request model:

{
"wallet_id": int, # user's wallet id (same as user id)
"time_after": string, # time (24 hours hh:mm) after which user
wants to purchase a ticket
"station_from": int, # station_id for the starting station
"station_to": int # station_id for the destination station
}

Successful Response
Upon successful operation, your API must return a 201 status code with the generated ticket ID, remaining
balance, wallet ID, and a list of all stations in order of visits. You should also include each station's train ID and
arrival and departure schedules in the output object. Departure time should follow the same time format as in
the input model. For the first station, the arrival time should be null, and for the last station, the departure
time should be null.
Response status: 201 - Created
Response model

{
"ticket_id": int, # generate a unique integer ticket
ID
"wallet_id": int, # user's wallet id (same as user
id)
"balance": integer, # remaining balance
"stations": [
{
"station_id": integer, # station's numeric id

"train_id": integer, # train's id user is riding
"arrival_time": string, # arrival time
"departure_time": string # departure time
},
...
]
}

Failed Response
Insufficient balance
If the wallet has insufficient balance for purchasing the ticket, respond with HTTP 402 - Payment Required and
a message showing the shortage amount.
Response status: 402 - Payment Required
Response model

{
"message": "recharge amount: {shortage_amount} to purchase the thicket"
}

Replace {shortage_amount} with the amount the user is short of the ticket's cost.

Note: This amount may vary depending on whether you can find an optimal-cost route for the user. Sub-
optimal solutions may be awarded with partial scores.

Unreachable station
If it is impossible to reach the destination station from the starting station, output a message with HTTP 403 -
Forbidden and a message for the user.
Response status: 403 - Forbidden
Response model

{
"message": "no ticket available for station: {station_from} to station:
{station_to}"
}

Replace {station_from} and {station_to} as specified in the input model.
Examples

Let's look at some example requests and responses.
Example request:
Request URL: [PUT] http://localhost:8000/api/tickets
Content Type: application/json
Request Body:

{
"wallet_id": 3,
"time_after": "10:55",
"station_from": 1,
"station_to": 5
}

Example successful response:
Content Type: application/json
HTTP Status Code: 201
Response Body:

{
"ticket_id": 101,
"balance": 43,
"wallet_id": 3,
"stations": [
{
"station_id": 1,
"train_id": 3,
"departure_time": "11:00",
"arrival_time": null,
},
{
"station_id": 3,
"train_id": 2,
"departure_time": "12:00",
"arrival_time": "11:55"
},
{
"station_id": 5,
"train_id": 2,
"departure_time": null,
"arrival_time": "12:25"
}

]
}

Example request for no tickets:
Request URL: [PUT] http://localhost:8000/api/tickets
Content Type: application/json
Request Body:

{
"wallet_id": 3,
"time_after": "10:55",
"station_from": 1,
"station_to": 5
}

Example failed response:
Content Type: application/json
HTTP Status Code: 403
Response Body:

{
"message": "no ticket available for station: 1 to station: 5"
}

Example request for insufficient funds:
Request URL: [PUT] http://localhost:8000/api/tickets
Content Type: application/json
Request Body:

{
"wallet_id": 3,
"time_after": "10:55",
"station_from": 1,
"station_to": 5
}

Example failed response:

Content Type: application/json
HTTP Status Code: 402
Response Body:

{
"message": "recharge amount: 113 to purchase the ticket"
}
 */

router.post("/", async (req, res) => {
  const { wallet_id, time_after, station_from, station_to } = req.body;
    const wallet = await prisma.users.findUnique({
    where: {
      user_id: wallet_id,
    },
  });

  const availableStops = await prisma.stops.findMany({
    where: {
      station_id: {
        in: [+station_from, +station_to],
      }
    },
  });

  const stopCosts = availableStops.map((stop) => +stop.fare);
  const cost = stopCosts.reduce((acc, curr) => acc + curr, 0);

  const trains = await prisma.trains.findMany({
    where: {
      stops: {
        every: {
          station_id: {
            in: [+station_from, +station_to],
          },
        },
      },
    },
  });

  const availableTickets = await prisma.station_tickets.findMany({
    where: {
      station_id: {
        in: [+station_from, +station_to],
      }
    },
  });


  if (!availableTickets?.length) {
    return res.status(403).json({
      message: `no ticket available for station: ${station_from} to station: ${station_to}`,
    });
  }


  if (wallet.balance < cost) {
    return res.status(402).json({
      message: `recharge amount: ${cost - wallet.balance} to purchase the ticket`,
    });
  }



  const stationsInOrder = await prisma.stations.findMany({
    where: {
      station_id: {
        in: [+station_from, +station_to],
      }
    }
  });

  res.status(201).json({
    ticket_id: ticket.id,
    balance: balance - cost,
    wallet_id,
    stations: stationsInOrder.map((station) => ({
      station_id: station.station.id,
      train_id: station.train.id,
      arrival_time: station.arrival_time,
      departure_time: station.departure_time,
    })),
  });
});

export { router as ticketRouter };
