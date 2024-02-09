const TEST_CASES = [
  // Data Models
  // User API tests
  {
    name: "should add a users",
    path: "/api/users",
    method: "post",
    body: {
      user_id: 1,
      user_name: "Fahim",
      balance: 100,
    },
    expected: {
      status: 201,
      body: {
        user_id: 1,
        user_name: "Fahim",
        balance: 100,
      },
    },
  },
  // Feature API tests
  // Station API tests
  {
    only: true,
    name: "List all stations - empty array",
    path: "/api/stations",
    method: "get",
    body: undefined,
    expected: {
      status: 200,
      body: {
        stations: [],
      },
    },
  },
  {
    name: "should create a station",
    path: "/api/stations",
    method: "post",
    body: {
      station_id: 1,
      station_name: "Dhaka GPO",
      longitude: 90.399452,
      latitude: 23.777176,
    },
    expected: {
      status: 201,
      body: {
        station_id: 1,
        station_name: "Dhaka GPO",
        longitude: 90.399452,
        latitude: 23.777176,
      },
    },
  },
  {
    name: "should create a station",
    path: "/api/stations",
    method: "post",
    body: {
      station_id: 2,
      station_name: "Motijheel",
      longitude: 90.417458,
      latitude: 23.73333,
    },
    expected: {
      status: 201,
      body: {
        station_id: 2,
        station_name: "Motijheel",
        longitude: 90.417458,
        latitude: 23.73333,
      },
    },
  },
  {
    name: "should create a station",
    path: "/api/stations",
    method: "post",
    body: {
      station_id: 3,
      station_name: "Rajarbagh",
      longitude: 90.4166667,
      latitude: 23.7333333,
    },
    expected: {
      status: 201,
      body: {
        station_id: 3,
        station_name: "Rajarbagh",
        longitude: 90.4166667,
        latitude: 23.7333333,
      },
    },
  },
  {
    name: "List all stations - success",
    path: "/api/stations",
    method: "get",
    body: undefined,
    expected: {
      status: 200,
      body: {
        stations: [
          {
            station_id: 1,
            station_name: "Dhaka GPO",
            longitude: 90.399452,
            latitude: 23.777176,
          },
          {
            station_id: 2,
            station_name: "Motijheel",
            longitude: 90.417458,
            latitude: 23.73333,
          },
          {
            station_id: 3,
            station_name: "Rajarbagh",
            longitude: 90.4166667,
            latitude: 23.7333333,
          },
        ],
      },
    },
  },
  {
    name: "List trains passing through a station - no stations",
    path: "/api/stations/4/trains",
    method: "get",
    body: undefined,
    expected: {
      status: 404,
      body: {
        "message": "station with id: 4 was not found"
        }
    },
  },
  {
    name: "should create a train",
    path: "/api/trains",
    method: "post",
    body: {
      train_id: 1,
      train_name: "Mahanagar 123",
      capacity: 200,
      stops: [
        {
          station_id: 1,
          arrival_time: null,
          departure_time: "07:00",
          fare: 0,
        },
        {
          station_id: 3,
          arrival_time: "07:45",
          departure_time: "07:50",
          fare: 20,
        },
        {
          station_id: 4,
          arrival_time: "08:30",
          departure_time: null,
          fare: 30,
        },
      ],
    },
    expected: {
      status: 201,
      body: {
        train_id: 1,
        train_name: "Mahanagar 123",
        capacity: 200,
        stops: [
          {
            station_id: 1,
            arrival_time: null,
            departure_time: "07:00",
            fare: 0,
          },
          {
            station_id: 3,
            arrival_time: "07:45",
            departure_time: "07:50",
            fare: 20,
          },
          {
            station_id: 4,
            arrival_time: "08:30",
            departure_time: null,
            fare: 30,
          },
        ],
      },
    },
  },
  {
    name: "List trains passing through a station - success",
    path: "/api/stations/1/trains",
    method: "get",
    body: undefined,
    expected: {
      status: 200,
      body: {
        station_id: 1,
        trains: [
          {
            train_id: 1,
            arrival_time: null,
            departure_time: "07:00",
          },
          {
            train_id: 2,
            arrival_time: "06:55",
            departure_time: "07:00",
          },
          {
            train_id: 3,
            arrival_time: "07:30",
            departure_time: "08:00",
          },
        ],
      },
    },
  },

  // Wallet API tests
  {
    name: "Get wallet balance - success",
    path: "/api/wallets/1",
    method: "get",
    body: undefined,
    expected: {
      status: 200,
      body: {
        wallet_id: 1,
        balance: 100,
        wallet_user: {
          user_id: 1,
          user_name: "Fahim",
        },
      },
    },
  },
  {
    name: "Get wallet balance - wallet not found",
    path: "/api/wallets/67",
    method: "get",
    body: undefined,
    expected: {
      status: 404,
      body: {
        message: "wallet with id: 67 was not found",
      },
    },
  },
  {
    name: "Add funds to wallet - success",
    path: "/api/wallets/1",
    method: "put",
    body: {
      recharge: 150,
    },
    expected: {
      status: 200,
      body: {
        wallet_id: 1,
        balance: 250,
        wallet_user: {
          user_id: 1,
          user_name: "Fahim",
        },
      },
    },
  },
  {
    name: "Add funds to wallet - wallet not found",
    path: "/api/wallets/67",
    method: "put",
    body: {
      recharge: 150,
    },
    expected: {
      status: 404,
      body: {
        message: "wallet with id: 67 was not found",
      },
    },
  },
  {
    name: "Add funds to wallet - invalid amount",
    path: "/api/wallets/1",
    method: "put",
    body: {
      recharge: 3,
    },
    expected: {
      status: 400,
      body: {
        message: "invalid amount: 3",
      },
    },
  },

  // Ticketing API tests
  {
    name: "Purchase ticket - success",
    path: "/api/tickets",
    method: "post",
    body: {
      wallet_id: 3,
      time_after: "10:55",
      station_from: 1,
      station_to: 5,
    },
    expected: {
      status: 201,
      body: {
        ticket_id: 101,
        balance: 43,
        wallet_id: 3,
        stations: [
          {
            station_id: 1,
            train_id: 3,
            departure_time: "11:00",
            arrival_time: null,
          },
          {
            station_id: 3,
            train_id: 2,
            departure_time: "12:00",
            arrival_time: "11:55",
          },
          {
            station_id: 5,
            train_id: 2,
            departure_time: null,
            arrival_time: "12:25",
          },
        ],
      },
    },
  },
  {
    name: "Purchase ticket - no ticket available",
    path: "/api/tickets",
    method: "post",
    body: {
      wallet_id: 3,
      time_after: "10:55",
      station_from: 1,
      station_to: 5,
    },
    expected: {
      status: 403,
      body: {
        message: "no ticket available for station: 1 to station: 5",
      },
    },
  },
  {
    name: "Purchase ticket - insufficient balance",
    path: "/api/tickets",
    method: "post",
    body: {
      wallet_id: 3,
      time_after: "10:55",
      station_from: 1,
      station_to: 5,
    },
    expected: {
      status: 402,
      body: {
        message: "recharge amount: 113 to purchase the ticket",
      },
    },
  },

  // Planning API tests
  {
    name: "Plan optimal route - success",
    path: "/api/routes?from=1&to=5&optimize=cost",
    method: "get",
    body: undefined,
    expected: {
      status: 200,
      body: {
        total_cost: 101,
        total_time: 85,
        stations: [
          {
            station_id: 1,
            train_id: 3,
            departure_time: "11:00",
            arrival_time: null,
          },
          {
            station_id: 3,
            train_id: 2,
            departure_time: "12:00",
            arrival_time: "11:55",
          },
          {
            station_id: 5,
            train_id: null,
            departure_time: null,
            arrival_time: "12:25",
          },
        ],
      },
    },
  },
  {
    name: "Plan optimal route - no routes available",
    path: "/api/routes?from=1&to=5&optimize=cost",
    method: "get",
    body: undefined,
    expected: {
      status: 403,
      body: {
        message: "no routes available from station: 1 to station: 5",
      },
    },
  },
];

export { TEST_CASES };
