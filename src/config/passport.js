const LocalStrategy = require('passport-local').Strategy;
//estrategiaLocal

const User = require('../app/models/user');

module.exports = function (passport) {

    passport.serializeUser(function(usuario, hecho){
        hecho(null, usuario.id);
    })

    passport.deserializeUser(function(id, hecho) {
        User.findById(id, function(err, user){
        hecho(err, user);
        });
    });


    // Signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    
        function (req, email, password, hecho) 
        {
            User.findOne({'local.email': email}, function (err, user)
            {
                if (err) 
                    { 
                        return hecho(err); 
                    }
                if (user) 
                    {
                        return hecho(null, false, req.flash('signupMessage', 'El email ya existe'));
                    } 
                
                else 
                    {
                        var newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generaHash(password);
                        newUser.save(function (err) 
                        {
                            if (err) {throw err;}
                            return hecho(null, newUser);
                        });
                    }
            })
        
        }));

    // Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    
        function (req, email, password, hecho) 
        {
            User.findOne({'local.email': email}, function (err, user)
            {
                if (err) 
                    { 
                        return hecho(err); 
                    }
                if (!user) // Si no existe el usuario
                    {
                        return hecho(null, false, req.flash('loginMessage', 'El usuario no existe'));
                    } 
                
                if (!user.validatePassword(password))
                    {
                        return hecho(null, false, req.flash('loginMessage','La contraseña no coincide'));
                    }   
                return hecho(null, user);
            })
        
        }));    

};