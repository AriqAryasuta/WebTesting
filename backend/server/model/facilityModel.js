const { Sequelize } = require('sequelize');
const db = require('../database/client');
const category = require('./categoryModel');

const {DataTypes} = Sequelize;

const facility = db.define('facility',{
    name:{
        type: DataTypes.STRING
    },
    coordinat:{
        type: DataTypes.STRING
    },
    category:{
        type: DataTypes.STRING,
        references:{
            model: category,
            key: 'name'
        }
    },
    imageURL:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    },
    atribut1:{
        type: DataTypes.STRING
    },
    atribut2:{
        type: DataTypes.STRING
    },
    atribut3:{
        type: DataTypes.STRING
    },
    atribut4:{
        type: DataTypes.STRING
    },
    atribut5:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
})

module.exports = facility;