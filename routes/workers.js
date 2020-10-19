const router = require('express').Router();
const userManager = require('../managers/user');
const validationsUtils = require('../validations-util.js');
const emailHelper = require('../email-helper.js');


router.post('/', async (req, res) => {
    try {
        const invalidResponseMsg = validationsUtils.isUserInvalid(req.body);
        if(invalidResponseMsg)
            return res.status(400).send(invalidResponseMsg);
        
        let user = await userManager.getByEmail(req.body.email);
        if (user)
            return res.status(400).send(`User already exists with this email.`);

        user = await userManager.create({...req.body});
        
        await emailHelper.sendEmail(req.body.email);
        
        return res.status(200).send(user);
    } catch (ex) {
        return res.status(400).send(ex.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const list = await userManager.list();
        return res.status(200).send(list);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const t = await userManager.getById(req.params.id);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const invalidResponseMsg = validationsUtils.isUserInvalid(req.body);
        if(invalidResponseMsg)
            return res.status(400).send(invalidResponseMsg);
            
        const _t = await userManager.getById(req.params.id);
        
        if(req.body.email) {
            let user = await userManager.getByEmail(req.body.email);
            if (_t && user && user.id !=_t.id)
                return res.status(400).send(`User already exists with this email.`);
        }
        
        const t = await userManager.update(req.params.id, { ...req.body });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        if(req.body.password && req.body.password.length < 8)
            return res.status(400).send(`'password' must be 8 or more characters`);
        const t = await userManager.update(req.params.id, { address: req.body.address, phone: req.body.phone, password: req.body.password });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const t = await userManager.deleteUser(req.params.id);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;