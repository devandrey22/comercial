import express from 'express';
import router from './routes/index.js'
import path, {dirname, join} from 'path'
import { fileURLToPath } from "url"
import session from "express-session";
import MySQLStore from "express-mysql-session";
import pool from './database.js';


import multer from 'multer';

const app = express();



app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//VIEWS

const __dirname = dirname(fileURLToPath(import.meta.url))
app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views')) 

//STATICS


app.use(express.static(join(__dirname, 'public')))


//ROUTES
app.use(router);



//MIDDLEWARES


app.use(session({ //para configurar la sesion
    secret: 'ZONA', //como va a guardar la sesion
    resave: false, //para que no se empiece a renovar la sesión
    saveUninitialized: false, //para que no se reestablezca la sesion
    store: new MySQLStore({host: 'us-cdbr-east-06.cleardb.net',
    
    database: 'heroku_512db339e82573c',
    user: 'b619de97e9fb35',
    password: '0e94fd5b'}) //en donde guardar la sesion. base de datos o servidor, en este caso base de datos, importar express-mysql-session
}));



app.listen(process.env.PORT || 2000)
console.log('Server is listening on port', process.env.PORT || 2000);

