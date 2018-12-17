const cafesito = require('express');
const aplicacion = cafesito();

const ruta = require('path');
const manguito = require('mongoose');
const pasaporte = require('passport');
const flasheo = require('connect-flash');
const morgana = require('morgan');
const galleta = require('cookie-parser');
const modulin = require('body-parser');
const sesion = require(express-session);


// Configuraciones
aplicacion.set('port', process.env.PORT || 3000 );


// Middlewares


// Rutas


// Archivos estáticos


aplicacion.listen(aplicacion.get('port'), () => {
    console.log('Servidor en el puerto', aplicacion.get('port'));
});