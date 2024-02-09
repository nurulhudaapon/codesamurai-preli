import express from "express"
import { bookRouter } from "./routes/book"

const app = express()
const PORT = 8000

app.use(express.json());

app.use('/api/books', bookRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})