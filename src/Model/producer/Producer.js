import mongoose from "../index.js";

const schema=new mongoose.Schema({
    producername:{type:String},
    movieList:{type:Array},
    DOB:{type:String},
    bio:{type:String}
},{
    versionKey:false
})
const producerModel=mongoose.model('producerModel',schema);

export default producerModel