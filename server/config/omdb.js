import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const omdb = axios.create({
  baseURL: process.env.OMDB_BASE_URL,
  params: {
    apikey: process.env.OMDB_API_KEY,
  },
})

export default omdb