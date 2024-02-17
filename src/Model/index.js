import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
try {
    mongoose.connect(`${process.env.dburl}/${process.env.dbname}`)
} catch (error) {
}

export default mongoose