const express = require('express');

//declare controller here once it's named

const router = express.Router();

//declare routes below
// 'you hit the get request'
router.get('/', (req, res) => res.status(200).json('[{number: 1}, {number: 2}]'))

module.exports = router;
