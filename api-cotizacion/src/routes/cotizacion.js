const { Router } = require('express');
const router = Router();
const request = require('request-promise-native');


router.get('/dolar', async (req, res) => {
    const url = 'https://api.cambio.today/v1/quotes/USD/ARS/json?quantity=1&key=2152|sOe9ajAcbEvXk7zTwmzMS9B_jVYU2iHq';
    let precio;

    // Consulta a la API Cambio.Today
    await request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        precio = body.result.value;
    });

    // Respuesta Json
    const data = {
        "moneda": "dolar",
        "precio": precio.toString()
    };
    res.json(data);
});


router.get('/euro', async (req, res) => {
    const url = 'https://api.cambio.today/v1/quotes/EUR/ARS/json?quantity=1&key=2152|sOe9ajAcbEvXk7zTwmzMS9B_jVYU2iHq';
    let precio;

    // Consulta a la API Cambio.Today
    await request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        precio = body.result.value;
    });

    // Respuesta Json
    const data = {
        "moneda": "euro",
        "precio": precio.toString()
    };
    res.json(data);
});


router.get('/real', async (req, res) => {
    const url = 'https://api.cambio.today/v1/quotes/BRL/ARS/json?quantity=1&key=2152|sOe9ajAcbEvXk7zTwmzMS9B_jVYU2iHq';
    let precio;

    // Consulta a la API Cambio.Today
    await request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        precio = body.result.value;
    });

    // Respuesta Json
    const data = {
        "moneda": "real",
        "precio": precio.toString()
    };
    res.json(data);
});

module.exports = router;