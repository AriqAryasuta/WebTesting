const facility = require('../model/facilityModel');
const cloudinary = require('../database/cloudinary');

exports.createMapping = async(req, res)=>{
    const {name, coordinat, category, imageURL, atr1, atr2, atr3, atr4, atr5} = req.body

    try {
        const resImage = await cloudinary.uploader.upload(imageURL, {
            folder: 'MappingDIY',
            width: 720,
            crop: "scale"
        })
        await facility.create({
            name: name,
            coordinat: coordinat,
            category: category,
            imageURL: resImage.secure_url,
            status: 'active',
            atribut1: atr1,
            atribut2: atr2,
            atribut3: atr3,
            atribut4: atr4,
            atribut5: atr5
        })
        res.status(200).json({
            success: true,
            message: 'New facility added!',
            data: req.body
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getAllMapping = async(req, res)=>{
    try {
        const facilities = await facility.findAll({
            status: 'active'
        })
        res.status(200).json({
            success: true,
            message: 'Facilities exist!',
            data: facilities
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getMappingByCat = async(req, res)=>{
    const cat = req.params.category
    
    try {
        const facilities = await facility.findAll({
            where:{category: cat}
        })
        res.status(200).json({
            success: true,
            message: 'Facilities exist!',
            data: facilities
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getMappingByID = async(req, res)=>{
    const id = req.params.id
    console.log(id)
    
    try {
        const facilities = await facility.findAll({
            where:{id: id}
        })
        res.status(200).json({
            success: true,
            message: 'Facility exist!',
            data: facilities
        })
    } catch (error) {
        console.log(error)
    }
}

exports.searchMapping = (req, res)=>{

}

exports.editMapping = async(req, res)=>{
    const id = req.params.id
    const {name, coordinat, imageURL, atr1, atr2, atr3, atr4, atr5} = req.body
    
    try {
        await facility.update({
            name: name,
            coordinat: coordinat,
            imageURL: imageURL,
            atribut1: atr1,
            atribut2: atr2,
            atribut3: atr3,
            atribut4: atr4,
            atribut5: atr5
        },{
            where:{
                id: id
            }
        })

        res.status(200).json({
            success: true,
            message: 'Facility updated!',
            data: req.body
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteMapping = async(req, res)=>{
    const id = req.params.id;

    try {
        await facility.update({
            status:'deactive'
        },{
            where:{
                id:id
            }
        })

        res.status(200).json({
            success: true,
            message: 'facility deactived!',
            data: req.params.id
        })
    } catch (error) {
        console.log(error)
    }
}

