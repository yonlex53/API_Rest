import { mongoose, Schema } from "mongoose";

const episodeSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    name: String,
    air_date: String,
    episode: String,
    characters: [String],
    url: String,
    created: String
});

const Episode = new mongoose.model('Episode', episodeSchema);
export default Episode;