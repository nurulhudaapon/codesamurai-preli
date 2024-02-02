// express routes for book
import express from "express"
import { prisma } from "../db"

const router = express.Router()

router.post('/', async (req, res) => {
  const { id, title, author, genre, price } = req.body
  const book = await prisma.books.create({
    data: {
      id,
      title,
      author,
      genre,
      price
    }
  })
  res.status(201).json(book);
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, author, genre, price } = req.body
  const book = await prisma.books.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title,
      author,
      genre,
      price
    }
  })
  if(!book) {
     res.status(404).json({"message": `book with id: ${id} was not found`})
  }
  else res.status(200).json(book);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const book = await prisma.books.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  if(!book)  res.status(404).json({"message": `book with id: ${id} was not found`})
  res.status(200).json(book)
})


router.get('/', async (req, res) => {
  const books = await prisma.books.findMany();
  res.status(200).json(books)
})

export const bookRouter = router;