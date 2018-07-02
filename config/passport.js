const bCrypt = require('bcrypt-nodejs');

module.exports = (passport, user)=> {

    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=> {
        User.findById(id).then(user => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });

    });

    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },

        (req, username, password, done) => {
            const generateHash = password => {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    username: username
                }
            }).then(user => {

                if (user) {
                    return done(null, false, req.flash('message', 'That username is already taken'));
                } else {
                    let userPassword = generateHash(password);
                    console.log("hashed: ", userPassword)
                    let data = {
                        username: username,
                        password: userPassword,
                    };

                    User.create(data).then((newUser, created) => {
                        if (!newUser) {
                            return done(null, false);
                        }

                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },

        (req, username, password, done) => {
            let User = user;
            const isValidPassword = (userpass, password) => {
                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({
                where: {
                    username: username
                }
            }).then(user => {

                if (!user) {
                    return done(null, false, req.flash('message', 'Username does not exist'));
                }

                if (!isValidPassword(user.password, password)) {
                    return done(null, false, req.flash('message', 'Incorrect password.'));
                }

                let userinfo = user.get();

                return done(null, userinfo);

            }).catch(err => {
                console.log("Error:", err); 
                return done(null, false, req.flash('message', 'Something went wrong with your Sign in'));
            });
        }
    ));

}