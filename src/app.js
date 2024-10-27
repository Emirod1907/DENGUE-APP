import express, { urlencoded } from "express";
import  path  from "path";
import morgan from 'morgan';
import { dirname } from 'path'; // Import the dirname function from the path module
import mysql from 'mysql';
import myConnection from 'express-myconnection';
import router from "./routes/pacientes.js";

const __dirname = dirname(import.meta.url);

const app= express();

//settings
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'contraseña',
    port: 3306,
    database: 'dengue'
}, 'single'))
app.use(express.urlencoded({extended: false}));

//routes

const pacientesRoutes = router;
app.use( '/', pacientesRoutes);

//static files

app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen( app.get('port'),()=>{
    console.log('Server on port 3000');
});