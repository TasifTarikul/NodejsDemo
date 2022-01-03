const { Op } = require('sequelize');
const Muajjin = require('../models/muajjin');

exports.addMuajjin = (req, res) =>{
    console.log('inside add muazzim controller');
    const name = req.body.name;
    const address = req.body.address;

    Muajjin.create({
        name: name,
        address: address
    })
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Muajjin created successfully'
        })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.listMuajjin = (req, res) =>{
    console.log('inside list muazzim controller');
    const name = req.query.name;
    let query;
    const limit = req.query.limit || 2
    const current_page = req.query.page || 1
    let offset = (current_page - 1)*limit;
    console.log(name);

    if (name == null || name == '')
    {
        query = Muajjin.findAndCountAll({
            limit:limit,
            offset: offset
        });
    }else{
        query = Muajjin.findAndCountAll({
            limit:limit,
            offset: offset,
            where:{
                name:{
                    [Op.like]: '%' + name + '%'
                }
            }
        });
    }

    console.log(query);
    query
    .then( muajjins => {
        const { count, rows} = muajjins
        res.status(200).json({
            mesage: 'Fetched all masjids',
            totalMuajjins: count,
            totalPages: Math.ceil(count/limit),
            currentPage: current_page,
            data: rows,
        })
    })
    .catch(err => console.log(err));
}


exports.getMuajjin = (req, res) => {
    const muajjinId = req.params.muajjinId;
    Muajjin
    .findByPk(muajjinId)
    .then(muajjin =>{
        res.status(201).json({
            message: 'Fetched Muajjin',
            muajjin: muajjin
        })
    })
    .catch()

}

exports.editMuajjijn = (req, res, next) => {
    console.log('inside Update Muajjin controller');
    const muajjinId = req.params.muajjinId;
    const name = req.body.name;
    const address = req.body.address;

    Muajjin
    .findByPk(muajjinId)
    .then(muajjin => {
        muajjin.name = name;
        muajjin.address = address;
        muajjin.save()
        return muajjin;
    })
    .then(muajjin => {
        res.status(201).json({
            message: 'Muajjin Updated',
            muajjin: muajjin
        })
    })
    .catch(err => {
        console.log(err);
    })

}

exports.deleteMuajjin = (req, res) => {
    const muajjinId = req.params.muajjinId;

    Muajjin
    .findByPk(muajjinId)
    .then(muajjin => {
        return muajjin.destroy();
    })
    .then(result => {
        res.status(200).json({
            message: 'Muajjin deleted successfully'
        })
    })
}