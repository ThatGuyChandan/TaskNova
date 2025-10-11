import { superuserState, setSuperuserView } from '../config/superuser.js';
export const toggle = (req, res) => {
    const { password } = req.body;
    if (password === process.env.SUPERUSER_PASSWORD) {
        const newState = !superuserState.view;
        setSuperuserView(newState);
        res.status(200).json({ superuserView: newState });
    }
    else {
        res.status(401).json({ message: 'Invalid password' });
    }
};
