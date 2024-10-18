import mongoose from 'mongoose'

const connectDatabase = () => {

    mongoose.connect( process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("MongoDB Atlas Connected")).catch((error) => console.log(error))
}

export default connectDatabase;
//EW9xvO6AIOFGoCwp