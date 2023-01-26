const { Sequelize } = require('sequelize');
const db = require('../database/client');

const {DataTypes} = Sequelize;

const category = db.define('category',{
    name:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    icon:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    },
    atribut:{
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    atributType:{
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
},{
    freezeTableName: true
})

module.exports = category;