/* --------------------------------- import --------------------------------- */ 
import exprees from 'express' 
import morgan from 'morgan'; 

import {join,dirname} from 'path'
import {fileURLToPath} from 'url'
import {engine} from 'express-handlebars' 
import personasRoutes from './routes/personas.routes.js'
/* ----------------------------- initialization ----------------------------- */
const app =  exprees(); 
const __dirname =  dirname(fileURLToPath(import.meta.url));

/* --------------------------------- setting -------------------------------- */
app.set('port' , process.env.PORT || 3000)  


app.set('views', join(__dirname, 'views')) 
app.engine(' .hbs', engine({
    defaultLayout: 'main', 
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),   
    extname: '.hbs'

}));
app.set( 'view engine', ',hbs'); 

/* ------------------------------- Middlewares ------------------------------ */
app.use(morgan('dev'));
app.use(exprees.urlencoded({ extended: false })) ; 
app.use(exprees.json());  
/* --------------------------------- routers -------------------------------- */
app.get('/inicio', (red, res) => {
    res.render('index')
}); 
app.use(personasRoutes);

/* ------------------------------ public files ------------------------------ */
app.use(exprees.static(join(__dirname, 'public'))) 


/* ------------------------------- run server ------------------------------- */
app.listen(app.get('port'), () =>  {
    console.log('server listening on port', app.get('port'));
});