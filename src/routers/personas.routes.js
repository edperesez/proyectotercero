import {router} from 'express'  
import pool from '../database.js'  

const router = router();   


router.get ('/list', async(req, res) => { 
res.render('personas/add') 

}); 

router.post('/add', async (req, res) =>{
try  { 

const {name,lastname, age} = req.body 
const newPersona = {
name, lastname, age  

}  

await pool.query('INSERT INTO personas SET ?', [newPersona]);
res.redirect('/list');

}  catch (error) {
res.status(500). json({ message: error.message });

}

}); 

router.post('/edit/:id', async (req,res) =>{
try  {
        const {id} = req. params 
        const {name,lastname,age} = req.body 
        const editpersona = {name,lastname,age} 
                            name,
                            lastname,
                            age

                        }
    
        await pool.query('UPDATE personas SET ? WHERE id = ?', [id]);
        res.redirect('/list'); 
}       catch (error){
        res.status(500).json({ message: error.message});
}


    catch (error)  {
        res.status(500).json({ message: error,message});
    } 

});
