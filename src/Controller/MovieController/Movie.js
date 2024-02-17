import movieModel from "../../Model/Movie/Movie.js";
import cloudnary from 'cloudinary'

const creatmovieList = async (req, res) => {
    try {
        cloudnary.config({
            cloud_name: "dfjc0pkpp",
            api_key: "588969669952431",
            api_secret: "SaArGafJGobXIJzjmYNoAKwaEY8"
        })
        if (req.file) {
            const result = await cloudnary.v2.uploader.upload(req.file.path)
            const movielist = new movieModel({
                movieName: req.body.moviename,
                releaseYear: req.body.releaseYear,
                actorName: req.body.actorname,
                producerName: req.body.producerName,
                desc: req.body.desc,
                releaseYear: req.body.releaseYear,
                rating:req.body.rating,
                moviePic: result.url,
                public_id: result.public_id
            })
            await movielist.save()
            res.status(200).send({ message: 'updated succesfully' })
        }

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getAllMovieList = async (req, res) => {
    try {
        let DbrRes = await movieModel.find();
        res.status(200).send({ message: "data fetced successfully", data: DbrRes })
    } catch (error) {
        res.status(500).send({ error: error.message })

    }
}

const deleteMovie = async (req, res) => {
    try {
        let dbRes=await movieModel.deleteOne({_id:req.params.id});
        res.status(200).send({message:'deleted sucessfully'});
    } catch (error) {

    }
}
const updateMovie=async(req,res)=>{
    try {
       let dbRes= await movieModel.findOne({_id:req.body.id})
        cloudnary.config({
            cloud_name: "dfjc0pkpp",
            api_key: "588969669952431",
            api_secret: "SaArGafJGobXIJzjmYNoAKwaEY8"
        })
        if (req.file) {
            const result = await cloudnary.v2.uploader.upload(req.file.path);
            dbRes.actorName=req.body.actorname??dbRes.actorName
            dbRes.releaseYear=req.body.releaseYear??dbRes.releaseYear
            dbRes.movieName=req.body.moviename??dbRes.movieName
            dbRes.producerName=req.body.producerName??dbRes.producerName
            dbRes.rating=req.body.rating??dbRes.rating
            dbRes.desc=req.body.desc??dbRes.desc
            dbRes.moviePic=result.url??dbRes.moviePic
            dbRes.public_id=result.public_id ??dbRes.public_id
            await dbRes.save()
            res.status(200).send({ message: 'updated succesfully' })
        }else{
            dbRes.actorName=req.body.actorname??dbRes.actorName
            dbRes.releaseYear=req.body.releaseYear??dbRes.releaseYear
            dbRes.movieName=req.body.moviename??dbRes.movieName
            dbRes.producerName=req.body.producerName??dbRes.producerName
            dbRes.rating=req.body.rating??dbRes.rating
            dbRes.desc=req.body.desc??dbRes.desc
            await dbRes.save()
            res.status(200).send({ message: 'updated succesfully' })
        }

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}
export default { creatmovieList, getAllMovieList, deleteMovie,updateMovie }