import mongoose from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
})

UserSchema.pre("save", async function (next){
    this.password = await bcrypt.hash(this.password, 10)
    next(); //aqui diz para o programa seguir em frente para criar a model e exportar
});

const User = mongoose.model("User", UserSchema);

export default User