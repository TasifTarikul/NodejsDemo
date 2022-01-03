const { validationResult } = require('express-validator');
const { count } = require('../models/masjid');
const Masjid = require('../models/masjid');
const User = require('../models/user');

exports.createMasjid = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const error = new Error('Validation failed, enered data is incorrect')
        error.satusCode = 422;
        throw error;
    }

    const name = req.body.name;
    const address = req.body.address;
    console.log("userID" + req.userId);

    const masjid = new Masjid({
        name: name,
        address: address,
        creator: req.userId
    })

    masjid
    .save()
    .then(result => {
        return User.findById(req.userId)
    })
    .then(user => {
        creator = user
        user.masjids.push(masjid);
        return user.save();
    })
    .then(user => {
        res.status(201).json({
            message: 'Masjids was created successfully',
            masjid: masjid,
            creator: {
                _id: creator._id,
                name: creator.name
            }
        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    });
}

exports.getAllMasjid = (req, res, next) =>{
    const fltr_by_name = req.query.name
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 0;
    const skip = (currentPage -1) * limit;
    let totalMasjid;
    let query;
    console.log(fltr_by_name);
    if(fltr_by_name && fltr_by_name!="")
    {
        console.log('inside query filter');   
        query = Masjid.find({ name: fltr_by_name })
    }else{
        query = Masjid.find()
    }

    query.clone().countDocuments()
    .then(count => {
        totalMasjid = count;
        return query
        .skip(skip)
        .limit(limit)
    })
    .then(masjids => {
        res
        .status(200)
        .json({
            message: 'Fetched Masjids', 
            totalMasjid: totalMasjid,
            totalPages: Math.ceil(totalMasjid/limit),
            data: masjids,
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })

}

exports.getMasjid = (req, res, next) =>{
    const masjidId = req.params.masjidId;

    Masjid.findById(masjidId)
    .then(masjid =>{
        if(!masjid){
            const error = new Error('Masjid was not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Masjid fetched',
            masjid: masjid
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })


}

exports.updateMasjid = (req, res, next) => {
    const masjidId = req.params.masjidId;
    const name = req.body.name;
    const address =  req.body.address;

    Masjid
    .findById(masjidId)
    .then(masjid =>{
        if(!masjid){
            const error = new Error('could not find')
            error.statusCode = 404;
            throw error;
        }

        if(masjid.creator._id.toString !== req.userID){
            const error = new Error('Not Authorized');
            error.statusCode = 403;
            throw error;
        }

        masjid.name = name;
        masjid.address = address;
        return masjid.save()
    })
    .then(result => {
        res.status(200).json({
            message: 'Masjid Updated',
            masjid: result
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
}


exports.deleteMasjid = (req, res, next) => {
    const masjidId = req.params.masjidId;

    Masjid
    .findById(masjidId)
    .then(masjid => {
        if(!masjid){
            const error = new Error('No Masjid was found with this id');
            error.statusCode = 404;
            throw error;
        }
        console.log(masjid.creator._id.toString())
        if(masjid.creator._id.toString() !== req.userId){
            const error = new Error('Not Authorized');
            error.statusCode = 403;
            throw error;
        }

        return Masjid.findByIdAndRemove(masjidId);
    })
    .then(result => {
        return User.findById(req.userId);
    })
    .then(user => {
        user.masjids.pull(masjidId);
        return user.save();
    })
    .then(result => {
        res.status(200).json({message: 'Masjid Deleted'});
    })
    .catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}

// const Masjid = require("../models/masjid");
// const mongodb = require('mongodb');


// exports.addMasjid = (req, res) => {
//     console.log('inside add masjid controller');
//     const name = req.body.name;
//     const address = req.body.address;
//     const masjid = new Masjid(name, address);

//     masjid
//     .save()
//     .then(result => {
//         console.log('Masjid Added');
//         console.log(result);
//         res.status(201).json({
//             status: 201,
//             message: 'Masjid was successfully created'   
//         });
//     })
//     .catch(err => {
//         console.log(err);
//     })
// };

// exports.listMasjids = (req, res) => {
//     console.log('inside list masjid controller');
//     Masjid.fetchAll()
//     .then(masjids => {
//         console.log(masjids);
//         res.status(200).json({masjids});
//     })
// };

// exports.getMasjid = (req, res) => {
//     console.log('inside get masjid controller');
//     Masjid.findById(req.params.masjidId)
//     .then(masjid => {
//         console.log(masjid);
//         res.status(201).json({masjid});
//     })
// };


// exports.updateMasjid = (req, res) => {
//     console.log('inside masjid update controller');
//     const name = req.body.name;
//     const address = req.body.address;
//     const id = req.body._id

//     const masjid = new Masjid(name, address, new mongodb.ObjectId(id));

//     masjid
//     .save()
//     .then(result => {
//         console.log(result);
//         res.status(201).json({result});
//     })
//     .catch(err => console.log(err));
// };

// exports.deleteMasjid = (req, res) => {
//     console.log('inside delete masjid controller');
//     const masjidId = req.params.masjidId;

//     Masjid
//     .deleteById(masjidId)
//     .then(() => {
//         console.log('delete controller then');
//     })
//     .catch(err => {
//         console.log(err);
//     });
// };



