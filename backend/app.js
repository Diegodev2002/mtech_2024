import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import { RegisterModel } from './db.js';
import nodemailer from 'nodemailer';
import {emailTemplate} from './emailTemplate.js'
const { json } = pkg;
const app = express();



app.use(
	cors({
		origin: (origin, callback) => {
			const ACCEPTED_ORIGINS = [
				'http://localhost:4321',
				'https://mtech.igeco.mx/',
			];

			if (ACCEPTED_ORIGINS.includes(origin)) {
				return callback(null, true);
			}
			if (!origin) {
				return callback(null, true);
			}
			return callback(new Error('Not allowed by CORS'));
		},
	})
);
app.use(json());

app.post('/guardar-registro', async (req, res) => {
	const {
		nombre_equipo,
		categoria,
		sede,
		nombre_escuela,
		estado,
		municipio,
		direccion,
		cp,
		...Integrantes
	} = req.body; 

	const response = await RegisterModel.crear_equipo({
		nombre_equipo,
		categoria,
		sede,
		nombre_escuela,
		estado,
		municipio,
		direccion,
		cp,
	});

	if (response.status) {
		const respuesta_integrantes = await RegisterModel.insertar_integrantes(
			Integrantes,
			response.insertId
		);
		if (respuesta_integrantes.status) {
			let mails = [
				Integrantes.email_coach,
				Integrantes.email_integrante1,
				Integrantes.email_integrante2,
				Integrantes.email_integrante3,
			];

			let nombres = [
				Integrantes.nombre_coach+ ' ' + Integrantes.paterno_coach + ' ' + Integrantes.materno_coach,
				Integrantes.nombre_integrante1 + ' ' + Integrantes.paterno_integrante1 + ' ' + Integrantes.materno_integrante1,
				Integrantes.nombre_integrante2 + ' ' + Integrantes.paterno_integrante2 + ' ' + Integrantes.materno_integrante2,
				Integrantes.nombre_integrante3 + ' ' + Integrantes.paterno_integrante3 + ' ' + Integrantes.materno_integrante3,
			];

			for (let i = 0; mails[i]; i++) {
				enviarEmail(mails[i], nombres[i], nombre_equipo, sede, categoria, response.insertId);
			}
			res.json({ response, status: true });
		} else {
			res.json({ response, status: false });
		}
	} else {
		res.json({ response, status: false });
	}
});

app.post('/obtener-registros', async (req, res, next) => {
	const { categoria, sede } = req.body;

	const validarRegistro = await RegisterModel.consulta_sede({
		sede,
		categoria,
	});
	res.json(validarRegistro);

	next();
});


async function enviarEmail(mails, nombres, nombre_equipo, sede, categoria, id ) {
	const config = {
		host: process.env.SMTP_GMAIL,
		port: process.env.PORT_GMAIL,
		auth: { user: process.env.USER_GMAIL, pass: process.env.PASS_GMAIL },
	};

	const mensaje = {
		from: 'hfairsmexico@gmail.com',
		to: mails,
		subject: 'M-TECH 2024 - Torneo De Robótica',
		html: emailTemplate(nombres, nombre_equipo, sede, categoria, id),
	};

	const transport = nodemailer.createTransport(config);
	const info = await transport.sendMail(mensaje);	
}

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
