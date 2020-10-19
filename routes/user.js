const router = require('express').Router();
const userManager = require('../managers/user');
const validationsUtils = require('../validations-util.js');
const emailHelper = require('../email-helper.js');


router.post('/signup', async (req, res) => {
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
        return res.status(500).send(ex.message);
    }
});

module.exports = router;