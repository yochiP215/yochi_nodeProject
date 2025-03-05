import jwt from "jsonwebtoken";

export function check(req, res, next) {
    let token = req.headers.tkn;
    if (!token)
        return res.status(401).json({ title: "user unauthorized", message: "first login!" })
    try {

        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.x = result;
        next();
    }
    catch (err) {
        return res.status(401).json({ title: "user unauthorized", message: err.message })
    }
}

export function checkManager(req, res, next) {
    let token = req.headers.tkn;
    if (!token)
        return res.status(401).json({ title: "user unauthorized", message: "first login!" });

    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.x = result;

        // אם המשתמש הוא admin, עוברים ל-next()
        if (result.role === "admin") {
            return next();  // מוסיפים return כדי לוודא שהקוד עוצר כאן
        }

        // אם המשתמש לא admin, מחזירים שגיאה ולא ממשיכים
        return res.status(403).json({ title: "user unauthorized", message: "you don't have permission" });

    } catch (err) {
        return res.status(401).json({ title: "user unauthorized", message: err.message });
    }
}
