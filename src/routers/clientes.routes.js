import { Router } from 'express'
import pool from '../database.js'
import multer from 'multer';
import path from 'path'

const router = Router();

const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {                          //Mayor o = 0 y Menor que 1
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({storage})

router.get('/add', (req, res) => {
    res.render('clientes/add')
});

router.post('/add', upload.single('file') , async (req, res) => {
    try {
        const { name, lastname, Nit, observacion } = req.body
        let newCliente = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            newCliente = { name, lastname, Nit, observacion, imagen}
        }else{
            newCliente = {name, lastname, Nit, observacion}
        }
        await pool.query('INSERT INTO clientes SET ?', [newCliente]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM clientes');
        res.render('clientes/list', { clientes: result })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [clientes] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
        const clienteEdit = cliente[0]
        res.render('clientes/edit', { cliente: clienteEdit })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/edit/:id',  upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, Nit, observacion } = req.body
        let editClientes = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            editClientes = { name, lastname, Nit, observacion, imagen}
        }else{
            editPersona = {name, lastname, Nit, observacion}
        }
        await pool.query('UPDATE clientes SET ? WHERE id = ?', [editClientes, id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;