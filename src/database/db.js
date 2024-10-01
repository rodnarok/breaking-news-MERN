import mongoose from 'mongoose'

const connectDatabase = () => {

    mongoose.connect("mongodb+srv://rootadmin:EW9xvO6AIOFGoCwp@cluster0.zoru38t.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("MongoDB Atlas Connected")).catch((error) => console.log(error))
}

export default connectDatabase;
//EW9xvO6AIOFGoCwp