import { mongoose, Schema } from "mongoose";


const characterSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    name: String,
    status: String,
    species: String,
    type: String,
    gender: String,
    origin: Object,
    location: Object,
    image: String,
    episode: [String],
    url: String,
    created: String
});

const Character = new mongoose.model('Character', characterSchema);
export default Character;