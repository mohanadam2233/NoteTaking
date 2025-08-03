import mongoose from 'mongoose';

export const connectDB= async () => { 
    try {
    await mongoose.connect("mongodb+srv://mohanadam2233:oJodR8JSJrFB44R8@cluster0.bdiu3kh.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0")
    console.log("MongoDB connected successfully");   
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}