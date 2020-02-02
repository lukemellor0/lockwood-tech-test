import UserModel from '../models/users.model';

exports.getById = (req, res) => {
    UserModel.getById(req.params.userId).then((result) => {
        res.status(200).send(result);
    });
}

exports.getUsers = (req, res) => {
    UserModel.getUsers()
        .then((result) => {
            res.status(200).send(result);
        })
}

exports.deleteUser = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
}

exports.createUser = (req, res) => {
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
}

exports.updateUser = (req, res) => {
    UserModel.updateUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
}
