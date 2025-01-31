import mongoose from "mongoose";

async function dbConnect() {
    //mongodb+srv://<db_username>:<db_password>@cluster0.lbasw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    let connectMongodb= await mongoose.connect(`mongodb+srv://${process.env.ADMIN}:${process.env.PASSWORD}@cluster0.lbasw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    try {
        if (connectMongodb) {
            console.log("DB connect sucessfull: ", connectMongodb.Connection.host);
        }
    }
    catch (err) {
        console.log("DB Not connect");
    }
}

export default dbConnect;