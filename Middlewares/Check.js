import jwt from "jsonwebtoken";

export function check(req, res, next) {
    let token = req.headers.tkn;
    if (!token)
        return res.status(401).json({ title: "user unauthorized", message: "first login!" })
    try {

        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.x= result;
        next();
    }
    catch (err) {
        return res.status(401).json({ title: "user unauthorized", message: err.message })
    }
}

export function checkManager(req, res, next) {
    let token = req.headers.tkn;
    if (!token)
        return res.status(401).json({ title: "user unauthorized", message: "first login!" })
    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.x= result;
        if (result.role == "admin")
            next()
        return res.status(403).json({ title: "user unauthorized", message: "you dont have permision " })
    }
    catch (err) {
        return res.status(401).json({ title: "user unauthorized", message: err.message })
    }
}
