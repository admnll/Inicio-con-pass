const cafesito = require('express');
const app = cafesito();


// Configuraciones
app.set('port', process.env.PORT || 3000 );

// Middlewares


// Rutas


// Archivos estáticos


app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
});