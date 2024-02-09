const TEST_CASES = [
  // Initial no data tests
  {
    name: "should return empty array",
    path: "/api/books",
    method: "get",
    body: undefined,

    expected: {
      status: 200,
      body: {
        books: [],
      },
    },
  },
  {
    name: "should return 404",
    path: "/api/books/343",
    method: "get",

    expected: {
      status: 404,
      body: {
        message: "book with id: 343 was not found",
      },
    },
  },

  // Create book
  //   {
  //     name: "should create a book",
  //     path: "/api/books",
  //     method: "post",
  //     body: {
  //       title: "The Hobbit",
  //     },
  //     expected: {
  //       status: 201,
  //       book: {
  //         id: 1,
  //         title: "The Hobbit",
  //       },
  //     },
  //   },
];

export {
  TEST_CASES
}