// express routes for book
import express from "express";
import { prisma } from "../db";

const router = express.Router();

router.post("/", async (req, res) => {
  const { id, title, author, genre, price } = req.body;

  try {
    const book = await prisma.books.create({
      data: {
        id,
        title,
        author,
        genre,
        price,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: "error creating book" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, price } = req.body;
  const book = await prisma.books.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      author,
      genre,
      price,
    },
  });

  if (!book) {
    res.status(404).json({ message: `book with id: ${id} was not found` });
  } else res.status(200).json(book);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await prisma.books.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!book)
    res.status(404).json({ message: `book with id: ${id} was not found` });
  else res.status(200).json(book);
});

router.get('/', async (req, res) => {

  let {
    title,
    author,
    genre,
    sort,
    order,
  } = req.query;

  const option: Parameters<typeof prisma.books.findMany>[0] = {
    where: {},
    orderBy: {}
  };

  if (!sort) sort = 'id';
  if (!order) order = 'asc';

  if (!option.where) return;

  if (title) {
    option.where.title = title as string;
  }

  if (author) {
    option.where.author = author as string;
  }

  if (genre) {
    option.where.genre = genre as string;
  }

  if (sort) {
    option.orderBy = {
      [sort as string]: String(order || 'asc').toLowerCase()
    }
  }

  const books = await prisma.books.findMany(option);

  res.status(200).json({ books })
})

export const bookRouter = router;
