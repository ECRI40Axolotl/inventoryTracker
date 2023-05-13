const express = require('express');

//declare controller here once it's named

const router = express.Router();

//declare routes below

router.get('/', (req, res) => res.status(200).json('you hit the get request'))

module.exports = router;
