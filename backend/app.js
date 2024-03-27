import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import { RegisterModel } from './db.js';
const { json } = pkg
const app = express();

app.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = ['http://localhost:4321', 'https://mtech.igeco.mx/']
  
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
      if (!origin) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    }
  }))
app.use(json())

app.post('/guardar-registro', async (req, res) => {   
    const {
        nombre_equipo, categoria, sede, nombre_escuela, estado, municipio, direccion, cp, ...Integrantes
    } = req.body;   
    
    const response = await RegisterModel.crear_equipo({nombre_equipo, categoria, sede, nombre_escuela, estado, municipio, direccion, cp});

    if (response.status) {
        const respuesta_integrantes = await RegisterModel.insertar_integrantes(Integrantes, response.insertId);  
        if (respuesta_integrantes.status) {
            res.json({response, status: true});  
        }else{
            res.json({response, status: false});  
        
        }
    }else{
        res.json({response, status: false});  
    }
          
});

app.get('/obtener-registros', async (req, res) => {
    
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});