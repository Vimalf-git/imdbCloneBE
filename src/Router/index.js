import express from 'express';
import userRoute from './UserRouter/User.js';
import movieRoute from './MovieRouter/Movie.js'
import Forget from './Forget/Forget.js';

const route = express();
route.use('/', userRoute);
route.use('/', movieRoute)
route.use('/forgetpass', Forget)
export default route;
