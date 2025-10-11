export const superuser = (req, res, next) => {
    if (req.user && req.user.isSuperUser) {
        next();
    }
    else {
        res.status(403).json({ message: 'Forbidden: Superuser access required' });
    }
};
