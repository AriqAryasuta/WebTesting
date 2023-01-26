const express = require('express');
const catControl = require('../controller/catController');
const route = express.Router();

//category router
route.post('/', catControl.createCategory);

route.get('/',catControl.getAllCategory);
route.get('/:category',catControl.getCategoryByID);

route.put('/:category', catControl.addAttribut);
route.delete('/:category', catControl.deleteCategory);

module.exports= route