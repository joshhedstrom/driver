const path = require("path");
const authController = require('../controller/authController.js');


module.exports = function(app, passport) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })

    // app.get("/main.html", function(req, res) {
    //     res.redirect("/");
    // })

    // app.get("/trips.html", function(req, res) {
    //     res.redirect("/");
    // })

    // app.get("/user", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/main.html"));
    // })

    // app.get("/trips", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/trips.html"));
    // })


    //AUTH----------------------------------------------------------------------------------->>>>>>

    app.get('/signup', authController.signup);

    app.get('/login', authController.login);

    app.get('/user', isLoggedIn, authController.user);

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/logout', authController.logout);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/user',
        failureRedirect: '/signup'
    }));

    app.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/user',
        failureRedirect: '/login'
    }));

    app.all('*', function(req, res) {
        res.redirect("/");
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/login');
    }

}