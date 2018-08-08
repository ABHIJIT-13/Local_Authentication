module.exports = function(app, passport ){
	//HOME-PAGE with login links
	app.get('/',function(req,res){
		res.render('index.ejs')
	});

	//LOGIN

	app.get('/login',function(req,res){
		//render the page and pass any flash data if it exists
		res.render('login.ejs',{message : req.flash('loginMessage')});
	});

	//process the login form
	app.post('/login',passport.authenticate('local-login',{
		successRedirect : '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));
	

	app.get('/signup',function(req,res){
		//render the page and pass any flash data if it exists
		res.render('signup.ejs',{message: req.flash('signupMessage') });

	});
	//process the signup form
   app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	
	//now the profile must be protected and thus we use 
	//the isLoggedIn function to check the authentication
	app.get('/profile',isLoggedIn,function(req,res){
		res.render('profile.ejs',{
			user : req.user //get the user out of session and pass to template
		});
	});

	//LOGOUT----------------------------------------------

	app.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});

};

function isLoggedIn(req,res,next){
	//is authenticated is a passport function
	if (req.isAuthenticated())
		return next();
	//if they are not then redirect to homepage
	res.redirect('/');
}