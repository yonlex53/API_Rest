import { mongoose, Schema } from "mongoose";

const locationSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    name: String,
    type: String,
    dimension: String,
    residents: [String],
    url: String,
    created: String
});

const Location = new mongoose.model('Location', locationSchema);
export default Location;