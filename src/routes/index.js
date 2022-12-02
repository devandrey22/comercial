import express from 'express';
import { Router } from 'express';

const router = Router()

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

export default router