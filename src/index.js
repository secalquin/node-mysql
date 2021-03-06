const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json()); //FORMAT JSON AUTO


//Routes
app.use(require('./routes/products'));


// Starting the server
app.listen(app.get('port'), () => {
	//console.log('Server on port',app.get('port'));
});