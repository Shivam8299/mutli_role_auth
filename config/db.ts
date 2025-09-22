import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config();


const url = process.env.DB_URL || ""

const connectDB = async ():Promise<void> =>{
    try {
        await mongoose.connect(url)
        console.log("db connected successfully")

    } catch (error) {
        console.log("connnect failed",error)
        process.exit(1)
        
    }
}

export default connectDB