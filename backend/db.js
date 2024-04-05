import mysql from 'mysql2/promise';
import 'dotenv/config';

const config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
};

export class RegisterModel {
	static async crear_equipo({
		nombre_equipo,
		categoria,
		sede,
		nombre_escuela,
		delegacion,
		municipio,
		nivel,
		cct,
	}) {
		const connection = await mysql.createConnection(config);
		try {
			const [result] = await connection.query(
				'INSERT INTO equipos (nombre,categoria,sede,escuela,delegacion,municipio,nivel,cct) VALUES (?,?,?,?,?,?,?,?)',
				[
					nombre_equipo,
					categoria,
					sede,
					nombre_escuela,
					delegacion,
					municipio,
					nivel,
					cct,
				]
			);
			return {
				status: true,
				insertId: result.insertId,
				...result,
			};
		} catch (error) {
			console.log(error);
			return {
				status: false,
			};
		} finally {
			await connection.end(); // Close the connection
		}
	}

	static async insertar_integrantes(data, id_equipo) {
		const connection = await mysql.createConnection(config);
		try {
			// Insert coach
			await connection.query(
				'INSERT INTO integrantes (nombre, paterno, materno, genero, edad, telefono, email, curp, rfc, grado_escolar, id_equipo) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)',
				[
					data.nombre_coach,
					data.paterno_coach,
					data.materno_coach,
					data.genero_coach,
					data.edad_coach,
					data.telefono_coach,
					data.email_coach,
					data.curp_coach,
					data.rfc_coach,
					data.grado_coach,
					id_equipo,
				]
			);

			// Insert integrante1
			await connection.query(
				'INSERT INTO integrantes (nombre, paterno, materno, genero, edad, telefono, email, curp, rfc, grado_escolar, id_equipo) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)',
				[
					data.nombre_integrante1,
					data.paterno_integrante1,
					data.materno_integrante1,
					data.genero_integrante1,
					data.edad_integrante1,
					data.telefono_integrante1,
					data.email_integrante1,
					data.curp_integrante1,
					data.rfc_integrante1,
					data.grado_integrante1,
					id_equipo,
				]
			);

			// Insert integrante2
			await connection.query(
				'INSERT INTO integrantes (nombre, paterno, materno, genero, edad, telefono, email, curp, rfc, grado_escolar, id_equipo) VALUES (?, ?, ?, ?, ?, ?, ?,? ,?, ?, ?)',
				[
					data.nombre_integrante2,
					data.paterno_integrante2,
					data.materno_integrante2,
					data.genero_integrante2,
					data.edad_integrante2,
					data.telefono_integrante2,
					data.email_integrante2,
					data.curp_integrante2,
					data.rfc_integrante2,
					data.grado_integrante2,
					id_equipo,
				]
			);

			// Insert integrante3
			await connection.query(
				'INSERT INTO integrantes (nombre, paterno, materno, genero, edad, telefono, email, curp, rfc, grado_escolar, id_equipo) VALUES (?, ?, ?, ?, ?, ?, ?,? ,?, ?, ?)',
				[
					data.nombre_integrante3,
					data.paterno_integrante3,
					data.materno_integrante3,
					data.genero_integrante3,
					data.edad_integrante3,
					data.telefono_integrante3,
					data.email_integrante3,
					data.curp_integrante3,
					data.rfc_integrante3,
					data.grado_integrante3,
					id_equipo,
				]
			);

			return {
				status: true,
			};
		} catch (error) {
			console.log(error);
			return {
				status: false,
			};
		} finally {
			await connection.end(); // Close the connection
		}
	}

	static async consulta_sede({ sede, categoria }) {
		const connection = await mysql.createConnection(config);
		try {
			const [result] = await connection.query(
				'SELECT COUNT(*) AS total FROM equipos WHERE sede = ? AND categoria = ?',
				[sede, categoria]
			);

			return {
        status: true,
        total: result[0].total
      };
		} catch (error) {
			console.log(error);
      return {
				status: false,
			};
		} finally {
			await connection.end(); // Close the connection
		}
	}
}


