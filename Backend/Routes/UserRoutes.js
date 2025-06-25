const express = require('express');
const { login, register, getAllUsers, updateUser, deleteUser } = require('../Controllers/authController');
const upload = require('../Middleware/multerConfig');







const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

const router = express.Router();

router.post('/login', login);
router.post('/register', upload.single('photo'), register);









module.exports = router;
