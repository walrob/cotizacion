const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => {
    const data = {
        "title": "API Rest Cotización"
    };

    res.json( data );
});


module.exports = router;