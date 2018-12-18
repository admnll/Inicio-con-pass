const cafesito = require('express');
const aplicacion = cafesito();

const ruta = require('path');
const manguito = require('mongoose');
const pasaporte = require('passport');
const flasheo = require('connect-flash');
const morgana = require('morgan');
const galleta = require('cookie-parser');
const modulin = require('body-parser');
const sesion = require('express-session');

const { url } = require('./config/database');

manguito.connect(url, {
    // useMongoClient: true  //Esto ya no sirve para versiones superiores a 5.x
    useNewUrlParser: true
});

// Para poder usar passport
require('./config/passport')(pasaporte);

    // Configuraciones
aplicacion.set('port', process.env.PORT || 3000 );

    // Las vistas están en la carpeta views
aplicacion.set('views', ruta.join(__dirname, 'views')); 

    //Motor de plantillas EJS
aplicacion.set('view engine', 'ejs'); 

// Middlewares
    // Usaremos Morgan para ver los mensajes por consola    
aplicacion.use(morgana('dev')); 
aplicacion.use(galleta());
aplicacion.use(modulin.urlencoded({extended: false}));
aplicacion.use(sesion({
    secret: 'passecreto',
    resave: false,
    saveUninitialized: false
}));

aplicacion.use(pasaporte.initialize());
aplicacion.use(pasaporte.session());
aplicacion.use(flasheo()); // Sirve para pasar mensajes entre HTMLs

// Rutas
require('./app/routes')(aplicacion, pasaporte);

// Archivos estáticos (HTML, CSS imagenes, etc)
aplicacion.use(cafesito.static(ruta.join(__dirname, 'public')));

aplicacion.listen(aplicacion.get('port'), () => {
    console.log('Servidor en el puerto', aplicacion.get('port'));
});