import express from "express"
import { PrismaClient } from "@prisma/client"
import { bookRouter } from "./routes/book"

const app = express()
const PORT = 5000

const prisma = new PrismaClient()

app.use(express.json());

app.use('/books', bookRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})