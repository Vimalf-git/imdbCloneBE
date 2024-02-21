import express from 'express'
import Movie from '../../Controller/MovieController/Movie.js';
import WatchList from '../../Controller/WatchList/WatchList.js';
import multer from "multer";
import Auth from'../../Common/Auth/Auth.js'
const route = express();

const storage = multer.diskStorage({

    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage })

route.post('/createmovie' ,upload.single('file'), Movie.creatmovieList);
route.get('/getmovielist',Auth.validate, Movie.getAllMovieList)
route.delete('/deletemovie/:id',Auth.validate, Movie.deleteMovie)
route.put('/updatemovie',Auth.validate, upload.single('file'), Movie.updateMovie);
route.post('/createwatchlist',Auth.validate, WatchList.createWatchList)
route.get('/getwatchlist/:mail',Auth.validate, WatchList.getWatchList)
route.delete('/removewatchlist/:id', WatchList.deleteWarchList)
route.get('/getwatchupdatelist/:id',Auth.validate, Movie.getUpdateList);
route.get('/getactors',Auth.validate,Movie.getActorProducer)
export default route