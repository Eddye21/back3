import mongoose from "mongoose";
mongoose.set('strictQuery', true)

const dbConnect = async(link) => {
    try {
        await mongoose.connect(link)
        console.log(`Database connect`)
    } catch (error) {
        console.error(`Error connecting to database`, error.message)
        throw error
    }
}

export default dbConnect