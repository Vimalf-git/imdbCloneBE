import movieModel from "../../Model/Movie/Movie.js";
import actorModel from "../../Model/Actor/Actor.js"
import producerModel from "../../Model/producer/Producer.js"
import cloudnary from 'cloudinary'
import watchListModel from "../../Model/watchList/watchList.js";

const creatmovieList = async (req, res) => {
    try {
        cloudnary.config({
            cloud_name: "dfjc0pkpp",
            api_key: "588969669952431",
            api_secret: "SaArGafJGobXIJzjmYNoAKwaEY8"
        })


        let moveieRes = await movieModel.findOne({ movieName: req.body.moviename })
        if (!moveieRes) {


            if (req.file) {
                const result = await cloudnary.v2.uploader.upload(req.file.path)
                const movielist = new movieModel({
                    email:req.body.email,
                    movieName: req.body.moviename,
                    releaseYear: req.body.releaseYear,
                    actorName: req.body.actorname,
                    producerName: req.body.producerName,
                    desc: req.body.desc,
                    releaseYear: req.body.releaseYear,
                    rating: req.body.rating,
                    moviePic: result.url,
                    public_id: result.public_id
                })
                await movielist.save()
                res.status(200).send({ message: 'updated succesfully' })
            }
        }
        else {
            res.status(400).send({ message: 'movie already exist' })
        }


        let actorRes = await actorModel.findOne({ actorname: req.body.actorname });
        if (!actorRes) {
            const actorData = new actorModel({
                actorname: req.body.actorname,
                movieList: [req.body.moviename],
                bio: req.body.actorBio
            })
            await actorData.save()
        } else {
            let allprevdata = actorRes.movieList ? [...actorRes.movieList, req.body.moviename] : req.body.moviename
            actorRes.movieList = allprevdata;
            await actorRes.save()
        }

        let producerRes = await producerModel.findOne({ producername: req.body.producerName });
        if (!producerRes) {
            const producerData = new producerModel({
                producername: req.body.producerName,
                bio: req.body.producerBio,
                movieList: [req.body.moviename]
            })
            await producerData.save()
        } else {
            let allpreProducerMovie = producerRes.movieList ? [...producerRes.movieList, req.body.moviename] : req.body.moviename;
            producerRes.movieList = allpreProducerMovie;
            await producerRes.save()
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
        await movieModel.deleteOne({ _id: req.params.id });
        await watchListModel.deleteOne({ moviId: req.params.id });
        res.status(200).send({ message: 'deleted sucessfully' });
    } catch (error) {

    }
}
const updateMovie = async (req, res) => {
    try {
        let dbRes = await movieModel.findOne({ _id: req.body.id })
        let watchListRes = await watchListModel.findOne({ moviId: req.body.id })
        cloudnary.config({
            cloud_name: "dfjc0pkpp",
            api_key: "588969669952431",
            api_secret: "SaArGafJGobXIJzjmYNoAKwaEY8"
        })
        if (req.file) {
            const result = await cloudnary.v2.uploader.upload(req.file.path);
            dbRes.actorName = req.body.actorname ?? dbRes.actorName
            dbRes.releaseYear = req.body.releaseYear ?? dbRes.releaseYear
            dbRes.movieName = req.body.moviename ?? dbRes.movieName
            dbRes.producerName = req.body.producerName ?? dbRes.producerName
            dbRes.rating = req.body.rating ?? dbRes.rating
            dbRes.desc = req.body.desc ?? dbRes.desc
            dbRes.moviePic = result.url ?? dbRes.moviePic
            dbRes.public_id = result.public_id ?? dbRes.public_id

            if (watchListRes) {
                watchListRes.actorName = req.body.actornameo ?? dbRes.actorName
                watchListRes.releaseYear = req.body.releaseYear ?? dbRes.releaseYear
                watchListRes.movieName = req.body.moviename ?? dbRes.movieName
                watchListRes.producerName = req.body.producerName ?? dbRes.producerName
                watchListRes.rating = req.body.rating ?? dbRes.rating
                watchListRes.desc = req.body.desc ?? dbRes.desc
                watchListRes.moviePic = result.url ?? dbRes.moviePic
                watchListRes.public_id = result.public_id ?? dbRes.public_id
                await watchListRes.save()
            }
            await dbRes.save()

            res.status(200).send({ message: 'updated succesfully' })
        } else {
            dbRes.actorName = req.body.actorname ?? dbRes.actorName
            dbRes.releaseYear = req.body.releaseYear ?? dbRes.releaseYear
            dbRes.movieName = req.body.moviename ?? dbRes.movieName
            dbRes.producerName = req.body.producerName ?? dbRes.producerName
            dbRes.rating = req.body.rating ?? dbRes.rating
            dbRes.desc = req.body.desc ?? dbRes.desc
            if (watchListRes) {
                watchListRes.actorName = req.body.actornameo ?? dbRes.actorName
                watchListRes.releaseYear = req.body.releaseYear ?? dbRes.releaseYear
                watchListRes.movieName = req.body.moviename ?? dbRes.movieName
                watchListRes.producerName = req.body.producerName ?? dbRes.producerName
                watchListRes.rating = req.body.rating ?? dbRes.rating
                watchListRes.desc = req.body.desc ?? dbRes.desc
                await watchListRes.save()
            }

            await dbRes.save()
            res.status(200).send({ message: 'updated succesfully' })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getUpdateList = async (req, res) => {
    try {
        let UpdateListRes = await movieModel.findOne({ _id: req.params.id })
        res.status(200).send({ message: 'fetched successfully', UpdateListRes })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
const getActorProducer = async (req, res) => {
    try {
        let actorList = (await actorModel.find({}, { _id: 0, actorname: 1 })).map((e) => e.actorname)
        let producerList = await (await producerModel.find({}, { _id: 0, producername: 1 })).map((e) => e.producername)
        res.status(200).send({ message: 'fetched sucessfully', actorList, producerList })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}
export default { creatmovieList, getAllMovieList, getActorProducer, deleteMovie, updateMovie, getUpdateList }