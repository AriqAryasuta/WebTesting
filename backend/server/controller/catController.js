const category = require('../model/categoryModel')

exports.createCategory = async(req, res)=>{
    if(!req.body){
        res.send("Data cannot empty!")
    };

    //insert to table category
    const {name, icon, atribut, atributType} = req.body
    
    try {
        await category.create({
            name: name,
            icon: icon,
            status: 'active',
            atribut: atribut,
            atributType: atributType
        });
        res.status(200).json({
            sucess: true,
            message: 'New category added!',
            data: req.body
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getAllCategory = async(req, res) =>{
    try {
        const categories = await category.findAll({
            status: 'active'
        })
        res.status(200).json({
            success: true,
            message: 'Facilities exist!',
            data: categories
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getCategoryByID = async(req, res)=>{
    const name = req.params.category
    
    try {
        const categories = await category.findAll({
            where:{name: name}
        })
        res.status(200).json({
            success: true,
            message: 'Category exist!',
            data: categories
        })
    } catch (error) {
        console.log(error)
    }
}

exports.addAttribut = (req, res)=>{
    const category = req.params.category
    const {atr, atrtype} = req.body
    
}

exports.deleteCategory = async(req, res) =>{
    const name = req.params.id
    
    try {
        const categories = await category.update({
            status: 'deactive'
        }, {
            where:{
                name: name
            }
        })
        res.status(200).json({
            success: true,
            message: 'Category deleted!',
            data: categories
        })
    } catch (error) {
        console.log(error)
    }
}