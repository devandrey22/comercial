import express from 'express';
import router from './routes/index.js'
import path, {dirname, join} from 'path'
import { fileURLToPath } from "url"


const app = express();



//VIEWS

const __dirname = dirname(fileURLToPath(import.meta.url))
app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views')) 

//STATICS


app.use(express.static(join(__dirname, 'public')))


//ROUTES
app.use(router);



app.listen(process.env.PORT || 2000)
console.log('Server is listening on port', process.env.PORT || 2000);