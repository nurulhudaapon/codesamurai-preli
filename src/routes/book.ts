// express routes for book
import express from "express"
import { prisma } from "../db"

const router = express.Router()

router.get('/', async (req, res) => {
  const books = await prisma.books.findMany()
  res.json(books)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const book = await prisma.books.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  res.json(book)
})

router.post('/', async (req, res) => {
  const { title, author } = req.body
  const book = await prisma.books.create({
    data: {
      title,
      author
    }
  })
  res.json(book)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, author } = req.body
  const book = await prisma.books.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title,
      author
    }
  })
  res.json(book)
})

// search for books fields
router.get('/search/', async (req, res) => {
  const { title } = req.params
  const books = await prisma.books.findMany({
    where: {
      title: {
        contains: title
      }
    }
  })
  res.json(books)
})

export const bookRouter = router;