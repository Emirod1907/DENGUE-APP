import express, { urlencoded } from "express";
import  path  from "path";
import morgan from 'morgan';
import {fileURLToPath } from 'url';
import { dirname, join } from 'path'; // Import the dirname function from the path module
import mysql from 'mysql';
import myConnection from 'express-myconnection';
import router from "./routes/pacientes.js";

// const __dirname = dirname(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app= express();

//settings
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '1234',
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
    console.log('Server on port 3001');
});