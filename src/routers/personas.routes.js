import {router} from 'express'  
import pool from '../database.js'  

const router = router();   


router.get ('/list', async(req, res) => {
try { 
    cons [result] = await pool.query('SELECT * FROM personas');
    res.render('personas/list', {personas: result})
}  catch (error) {
    res.status (500).json({ message: error. message}) ; 

}

}); 

router.get('/edit/:id', async (req,res) =>{
    try  {
        const {id} = req. params 
          const [persona] = await pool.query('SELECT * FROM personas ');
        
        res.render('personas/list', {persona: result}) 


    } catch(error)  {
        res.status(500).json({ message: error,message});
    }
});

export default router;