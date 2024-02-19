import mongoose from "../index.js";


const scheme = new mongoose.Schema({
    moviId:{type:String},
    movieName: { type: String },
    releaseYear: { type: String },
    plot: { type: String },
    desc: { type: String },
    actorName: { type: String },
    producerName: { type: String },
    rating: { type: Number },
    moviePic: { type: String },
    public_id: { type: String }
}, {
    versionKey: false
})

const watchListModel = mongoose.model('WatchList', scheme)
export default watchListModel