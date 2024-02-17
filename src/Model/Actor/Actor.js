import mongoose from "../index.js";

const schema=new mongoose.Schema({
    actorname:{type:String},
    movieList:{type:Array},
    DOB:{type:String},
    bio:{type:String}
},{
    versionKey:false
})
const actorModel=mongoose.model('actorModel',schema);

export default actorModel