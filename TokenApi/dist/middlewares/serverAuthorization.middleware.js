import dotenv from 'dotenv';
dotenv.config();
const authorizationMiddleware = (req, res, next) => {
    const { authorization } = req.body;
    if (!authorization)
        return res.status(401).json({ message: 'Token not found' });
    if (authorization !== process.env.SECRET_TOKEN)
        return res.status(401).json({ message: 'Invalid Token' });
    next();
};
export default authorizationMiddleware;
