import { db } from "../database/database.connection.js";


export async function validateToken(req, res, next) {

    const auth = req.headers.authorization;
    const token = auth?.replace('Bearer ', '');

    if (!token) {

        return res.sendStatus(401);

    }

    const { rows: sessions } = await db.query(

        `SELECT * FROM sessions WHERE token=$1`

    , [token]);

    const [session] = sessions;

    if (!session) {

        return res.sendStatus(401);

    }


    const { rows: users } = await db.query(
    
        `SELECT * FROM users WHERE id=$1`
    
    , [session.userId]);

    const [user] = users;


    if (!user) {

        return res.sendStatus(401);

    }


    res.locals.user = user;

    next();

}
