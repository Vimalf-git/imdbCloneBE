import express from 'express'
import Movie from '../../Controller/MovieController/Movie.js';
import WatchList from '../../Controller/WatchList/WatchList.js';
import multer from "multer";
import movieModel from '../../Model/Movie/Movie.js';

const route = express();

const storage = multer.diskStorage({

    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage })

route.post('/createmovie', upload.single('file'), Movie.creatmovieList);
route.get('/getmovielist', Movie.getAllMovieList)
route.delete('/deletemovie/:id', Movie.deleteMovie)
route.put('/updatemovie', upload.single('file'), Movie.updateMovie);
route.post('/createwatchlist', WatchList.createWatchList)
route.get('/getwatchlist', WatchList.getWatchList)
route.delete('/removewatchlist/:id', WatchList.deleteWarchList)
route.get('/getwatchupdatelist/:id', Movie.getUpdateList);
route.get('/getactors',Movie.getActorProducer)
export default route