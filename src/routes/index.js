import express from 'express';
import { Router } from 'express';

import multer from 'multer';

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

router.get('/perfil', (req, res) => {
    res.render('perfil.ejs');
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
    const { nombre, email, telefono } = req.body;
    const newCustomer = {
        Nombre: nombre,
        Email: email,
        Telefono: telefono
    };
    await pool.query('INSERT INTO clientes set ?', [newCustomer]);
     console.log(newCustomer);
})


router.post('/stats', async (req, res, next) => {
    const {  titulo, plan, fechas, zona, email } = req.body;
    const newAd = {
        titulo: titulo,
        plan: plan,
        fechas: fechas,
        zona: zona,
        email: email
    };
    await pool.query('INSERT INTO anuncios set ?', [newAd]);
    console.log(newAd);

})


export default router