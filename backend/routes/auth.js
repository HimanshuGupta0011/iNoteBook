const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const sendAuthToken = (usr) => {
    const data = {
        user: {
            id: usr.id
        }
    };

    const authtoken = jwt.sign(data, JWT_SECRET);
    return authtoken;
}

//Route 1: api/auth/signin , No login required
router.post('/signin', [
    body('name', "Enter a valid name!").isLength({ min: 2 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password should be of minimum length 5").isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        res.status(400).json({ success, error: errs.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Sorry an user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        success = true;
        const authtoken = sendAuthToken(user);
        res.json({ success, authtoken })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Internal Error occurred");
    }
});

//Route 2: api/auth/loginin , No login required
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    let success = false;
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({ success, error: errs.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials!" });
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials!" });
        }
        success = true
        const authtoken = sendAuthToken(user);
        res.json({ success, authtoken })

    } catch (err) {
        console.error(err);
        res.status(500).send("Some Internal Error occurred");
    }
})

//Route 3: api/auth/getuser , login required
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(400).json({ error: "invalid credentials!" });
        }
        console.log(user)
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Internal Error occurred");
    }
})

module.exports = router;