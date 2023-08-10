import { db } from '../database/database.connection.js'

export async function createService(req, res) {

    const { user } = res.locals;
    const {name, image, description, phoneNumber} = req.body;

    try {
        if (!name || !image || !description || !phoneNumber) {
            return res.status(400).send("Todos os campos são obrigatórios!");
        }
        const alreadyRegistered = await db.query(`SELECT FROM services WHERE name = $1`, [name])
        if (alreadyRegistered.rows.length > 0) {
            return res.status(409).send("Erro ao inserir jogo. O jogo já existe");
        }

        await db.query(
            `INSERT INTO services (name, image, description, "providerId", "phoneNumber") VALUES ($1, $2, $3, $4, $5)`,
            [name, image, description, user.id, phoneNumber]);
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

/*         const response = {

            "name": servicesList[0].name,
            "image": servicesList[0].image,
            "description": servicesList[0].description,
            "phoneNumber": servicesList[0].phoneNumber

        } */

        res.status(200).json(servicesList);

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function getUrl(req, res) {

    const { id } = req.params;

    try {

        const { rows: result } = await db.query(`
        
            SELECT * FROM "urls" WHERE id=$1
        
        `, [id]);


        if (!result.length > 0) {

            return res.sendStatus(404);
        }

        const response = {

            "id": result[0].id,
            "shortUrl": result[0].shortUrl,
            "url": result[0].oldURL

        }

        res.status(200).json(response);

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function getNewUrl(req, res) {

    const { shortUrl } = req.params;

    try {

        const { rows: result } = await db.query(`

            SELECT * FROM urls WHERE "shortUrl"=$1

        `, [shortUrl]);
        console.log(result);

        if (!result.length > 0) {

            return res.sendStatus(404);

        }

        await db.query(`
        
            UPDATE "urls" SET "accessCount"="accessCount" + 1 WHERE "shortUrl"=$1

        `, [shortUrl]);

        res.redirect(result[0].shortUrl);

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

        if (user.id !== serviceResult[0].userId) {
            return res.sendStatus(401);
        }

        if (urlResult[0].length === 0) {
            return res.sendStatus(404);
        }


        await db.query(`
        
        DELETE FROM services WHERE id = $1
        
        `, [id]);

        res.sendStatus(204)

    } catch (err) {
        res.status(500).send(err.message);
    }

}
