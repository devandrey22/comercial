import express from 'express';
import { Router } from 'express';
import path, {dirname, join} from 'path'
import { fileURLToPath } from "url"
import multer from 'multer';
import nodemailer from 'nodemailer';
import pool from '../database.js'; 

const router = Router()
const app = express();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })
  
const upload = multer({ storage: storage })

router.post('/stats', upload.single('uploaded_file'), function (req, res) {
    console.log(req.file, req.body)

   
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'alissatradingrobot@gmail.com',
            pass: 'oyufffxxyfehqayv'
        },
        tls: {
            ciphers: "SSLv3",
        },
    });


    var mailOptions = {
        from: 'alissatradingrobot@gmail.com',
        to: 'alertasmarketz@gmail.com',
        subject: 'ZONA ha recibido un nuevo anuncio',
        text: 'Revísalo pronto'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.render('confirmacion.ejs')
});
 

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/campanas', (req, res) => {
    res.render('campanas.ejs');
});

router.get('/como', (req, res) => {
    res.render('como.ejs');
});

router.get('/nosotros', (req, res) => {
    res.render('nosotros.ejs');
});

router.get('/alquiler', (req, res) => {
    res.render('alquiler.ejs');
});

router.get('/anunciate', (req, res) => {
    res.render('anunciate.ejs');
});


router.get('/admin', (req, res) => {
    res.render('admin.ejs');
});

router.get('/disponibilidad', (req, res) => {
    res.render('disponibilidad.ejs');
});

router.get('/clientes', (req, res) => {
    res.render('clientes.ejs');
});


router.get('/mensajes', (req, res) => {
    res.render('mensajes.ejs');
});

router.get('/anuncios', (req, res) => {
    res.render('anuncios.ejs');
});


router.get('/contactanos', (req, res) => {
    res.render('contactanos.ejs');
});


// POSTS


router.post('/infocliente', async (req, res, next) => {
    const { nombre, email, telefono, titulo, plan, fechas, zona } = req.body;
    const newCustomer = {
        Nombre: nombre,
        Email: email,
        Telefono: telefono,
        titulo: titulo,
        plan: plan,
        fechas: fechas,
        zonas: zona,
    };
    await pool.query('INSERT INTO clientes set ?', [newCustomer]);

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'alissatradingrobot@gmail.com',
            pass: 'oyufffxxyfehqayv'
        },
        tls: {
            ciphers: "SSLv3",
        },
    });


    var mailOptions = {
        from: 'alissatradingrobot@gmail.com',
        to: 'alertasmarketz@gmail.com',
        subject: 'ZONA ha recibido un nuevo cliente',
        text: 'Contáctalo pronto'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

     console.log(newCustomer);
  
})


/* 
router.get('/perfil',  function (req, res) {
    pool.getConnection(function(err) {
    var sql = 'SELECT * from clientes';

     pool.query(sql, function(error, result){
       
        if(error) console.log(error);

        res.render('./perfil.ejs' , { clients: result})

        })
    
})}); 
 */

router.get('/search-email',  function (req, res) {

    pool.getConnection(function(err) {
        var sql = 'SELECT * from anuncios';
    
         pool.query(sql, function(error, result){
           
            if(error) console.log(error);
    
            res.render('./search-email.ejs' , { clients: result})
    
            })
        
})});


router.get('/search',  function (req, res) {

    var email = req.query.email;
    console.log(email);
    pool.getConnection(function(error) {
        if(error) console.log(error);
        pool.query("SELECT * FROM clientes WHERE Email LIKE ?" , [email], function(error, result){
       
        if(error) console.log(error);
        res.render('./search-email.ejs', { clients: result} )


        })
    
})});



export default router

/* 

router.get('/perfil',  function (req, res) {
    pool.getConnection(function(err) {
    var sql = 'SELECT * from clientes';

     pool.query(sql, function(error, result){
       
        if(error) console.log(error);

        res.render('./perfil.ejs' , { clients: result})

        })
    
})});  */


/* 

router.get('/search',  function (req, res) {

    var email = req.query.email;

    pool.getConnection(function(error) {
        if(error) console.log(error);
        pool.query("SELECT * FROM clientes WHERE Email LIKE ?" , [email], function(error, result){
       
        if(error) console.log(error);
        res.render('./perfil', { clients: result} )


        })
    
})});
 */