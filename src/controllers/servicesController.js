import { db } from '../database/database.connection.js'

export async function createService(req, res) {

    const { user } = res.locals;
    const {name, image, description} = req.body;

    try {
        if (!name || !image || !description) {
            return res.status(400).send("Todos os campos são obrigatórios!");
        }
        const alreadyRegistered = await db.query(`SELECT FROM services WHERE name = $1`, [name])
        if (alreadyRegistered.rows.length > 0) {
            return res.status(409).send("Erro ao inserir jogo. O jogo já existe");
        }

        await db.query(
            `INSERT INTO services (name, image, description, "providerId", "phoneNumber") VALUES ($1, $2, $3, $4, $5)`,
            [name, image, description, user.id, user.phoneNumber]);
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}
export async function getAllServices(req, res) {


    try {
        const { rows: servicesList } = await db.query(`
        
            SELECT * FROM services
        
        `);

        if (!servicesList.length > 0) {
            return res.sendStatus(404);
        }

        res.status(200).json(servicesList);

    } catch (err) {
        res.status(500).send(err.message);
    }

}
export async function getServicesById(req, res) {

    const { id } = req.params;

    try {

        const { rows: service } = await db.query(`
        
            SELECT * FROM services WHERE "providerId"=$1
        
        `, [id]);


        if (!service.length > 0) {

            return res.sendStatus(404);
        }

        res.status(200).json(service);

    } catch (err) {
        res.status(500).send(err.message);
    }

}
export async function editService(req, res) {

    const { id } = req.params;
    const { name, image, description } = req.body;

    try {
        const { rows: service } = await db.query(
            `
            SELECT * FROM services WHERE id = $1
            `,
            [id]
        );

        if (service.length === 0) {
            return res.sendStatus(404);
        }

        await db.query(
            `
            UPDATE services
            SET name = $1, image = $2, description = $3
            WHERE id = $4
            RETURNING *
            `,
            [name, image, description, id]
        );

        const updatedService = {
            id: service[0].id,
            name,
            image,
            description
        };

        res.status(200).json({ message: 'Serviço editado com sucesso!', updatedService });

    } catch (err) {
        res.status(500).send(err.message);
    }

}
export async function deleteService(req, res) {

    const { id } = req.params;
    const { user } = res.locals;

    try {

        const { rows: serviceResult } = await db.query(`

            SELECT * FROM services WHERE id=$1
        
        `, [id]);
        console.log(serviceResult[0].providerId)

        if (user.id !== serviceResult[0].providerId) {
            return res.sendStatus(401);
        }

        if (serviceResult[0].length === 0) {
            return res.sendStatus(404);
        }


        await db.query(`
        
        DELETE FROM services WHERE id = $1
        
        `, [id]);

        res.sendtatus(204).json({message: 'Serviço apagado com sucesso!'})

    } catch (err) {
        res.status(500).send(err.message);
    }

}
export async function editStatusService(req, res) {
    const { id } = req.params;

    try {
        const { rows: service } = await db.query(
            `
            SELECT * FROM services WHERE id = $1
            `,
            [id]
        );

        if (service.length === 0) {
            return res.sendStatus(404);
        }

        // Get the current isAvailable value
        const currentIsAvailable = service[0].isAvailable;

        // Toggle the value between true and false
        const newIsAvailable = !currentIsAvailable;

        await db.query(
            `
            UPDATE services
            SET "isAvailable" = $1
            WHERE id = $2
            `,
            [newIsAvailable, id]
        );

        // Retrieve the updated service
        const { rows: updatedService } = await db.query(
            `
            SELECT * FROM services WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'Serviço editado com sucesso!', service: updatedService[0] });

    } catch (err) {
        res.status(500).send(err.message);
    }
}
