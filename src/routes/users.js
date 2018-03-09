var express = require('express');
var router = express.Router();

const user = {
    first: 'Rory',
    last: 'Downes',
    phone: '347-777-4777',
    zip: '11217'
};

router.get('/', function(req, res, next) {
    res.status(200);
    res.json({
        users: [user]
    });
});

module.exports = router;
