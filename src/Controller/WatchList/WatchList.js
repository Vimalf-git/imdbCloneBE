import watchListModel from '../../Model/watchList/watchList.js'


const createWatchList = async (req, res) => {

    try {
        const watchList = new watchListModel({
            moviId:req.body._id,
            movieName: req.body.movieName,
            releaseYear: req.body.releaseYear,
            actorName: req.body.actorName,
            producerName: req.body.producerName,
            desc: req.body.desc,
            releaseYear: req.body.releaseYear,
            moviePic: req.body.moviePic,
            public_id: req.body.public_id,
            rating:req.body.rating??0
        })
        await watchList.save()
        res.status(200).send({ message: 'updated succesfully' })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getWatchList = async (req, res) => {
    try {
        let dbRes = await watchListModel.find();
        if (dbRes)
            res.status(200).send({ message: 'fetched sucessfully', data: dbRes })
        else
            res.status(400).send({ message: 'no data found' })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const deleteWarchList=async(req,res)=>{
    try {
        await watchListModel.deleteOne({_id:req.params.id});
        res.status(200).send({message:'deleted sucessfully'});
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}
export default { createWatchList, getWatchList,deleteWarchList }