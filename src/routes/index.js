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


router.get('/clientes', function (req, res) {
    pool.getConnection(function(error) {
        if(error) console.log(error);
        pool.query("SELECT DISTINCT Email FROM clientes" ,  function(error, result){
            if(error) console.log(error);
            res.render('./clientes.ejs', { clients: result} )
        })
    
})});



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
            user: 'comercialcrmarketing@gmail.com',
            pass: 'eqvfoogzwqmoagep'
        },
        tls: {
            ciphers: "SSLv3",
        },
    });


    var mailOptions = {
        from: 'comercialcrmarketing@gmail.com',
        to: 'comercialcrmarketing@gmail.com',
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




router.post('/infoclientemobile', upload.single('uploaded_file'), async (req, res, next) => {
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
            user: 'comercialcrmarketing@gmail.com',
            pass: 'eqvfoogzwqmoagep'
        },
        tls: {
            ciphers: "SSLv3",
        },
    });


    var mailOptions = {
        from: 'comercialcrmarketing@gmail.com',
        to: 'comercialcrmarketing@gmail.com',
        subject: 'ZONA ha recibido un nuevo cliente mobile',
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
     res.render('confirmacion.ejs')
})




 


router.get('/admin', async (req, res, next) => {

    pool.getConnection(function(error) {
        if(error) console.log(error);
        pool.query("SELECT * FROM clientes" ,  function(error, result){
       
        if(error) console.log(error);
        res.render('./admin.ejs', { clients: result} )


        })
    
})});


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


router.get('/busquedad',  function (req, res) {

    var buscar = req.query.inquiry;
    console.log(buscar);
    pool.getConnection(function(error) {
        if(error) console.log(error);
        pool.query("SELECT * FROM clientes WHERE Email LIKE ? OR Nombre LIKE ? OR Telefono LIKE ? OR titulo LIKE ? OR plan LIKE ?" , [buscar, buscar, buscar, buscar, buscar], function(error, result){
        if(error) console.log(error);
        res.render('./adminbusquedad.ejs', { resultadobusquedad: result} )


        }) 
    
})});


router.get('/anuncios', function (req, res) {
    pool.getConnection(function(error) {
        if(error) console.log(error); 
        pool.query("SELECT Email, COUNT(*)>0 AS Repetition FROM clientes GROUP BY Email" ,  function(error, result){
            if(error) console.log(error);
            console.log(result)
            res.render('./anuncios.ejs', { clients: result} );
        });
})});



router.post('/cambios', async (req, res, next) => {
    const  {confirmemail, cambiossolicitados, confirmtitulo }  = req.body; 
    const newcambio = {
        Email: confirmemail,
        Título: confirmtitulo,
        cambios: cambiossolicitados
    }
    await pool.query('INSERT INTO cambiossolicitados set ?', [newcambio]);
 
    res.render('confirmacion.ejs')
  
})


router.post('/mensajes', async (req, res, next) => {
    const  {Nombre, Email, Mensaje }  = req.body; 
    const newMensaje = {
       Nombre,
       Email,
       Mensaje
    }
    await pool.query('INSERT INTO mensajes set ?', [newMensaje]);
 
    res.render('confirmacion.ejs')
  
})



router.get('/mensajes', (req, res) => {

    pool.getConnection(function(error) {
        if(error) console.log(error);
        pool.query("SELECT * FROM mensajes", function(error, result){
        if(error) console.log(error);
        res.render('mensajes.ejs', { clients: result} );
        })
    
})});



router.get('/disponibilidad', (req, res) => {
   
    pool.getConnection(function(error) {
        if(error) console.log(error);
        pool.query("SELECT * FROM clientesenero2023", function(error, result){
        if(error) console.log(error);

        res.render('disponibilidad.ejs', { clients: result} ); 
        })
    
    })});




router.post('/updatestatus', async (req, res, next) => {
    const {idstatus} = req.body
    await pool.query("UPDATE clientes SET status = 'Aprobado' WHERE ID = ?", [idstatus], function(error, result){
    res.redirect('/admin') 
})});


router.post('/cancelarad', async (req, res, next) => {
    const {idstatus} = req.body
    await pool.query("UPDATE clientes SET status = 'Cancelado' WHERE ID = ?", [idstatus], function(error, result){
    res.redirect('/admin') 
})});



router.post('/actualizarespacio', async (req, res, next) => {
    const diaactualizar = req.body.actualizar;
    const espacioactualizar = req.body.actualizarespacio;
    await pool.query("UPDATE clientesenero2023 SET Ocupados = ? WHERE Dia = ?", [espacioactualizar, diaactualizar], function(error, result){
    res.redirect('/disponibilidad') 
})});








export default router;