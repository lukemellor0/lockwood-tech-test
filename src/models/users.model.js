const mongoose = require('../../services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const User = mongoose.model('Users', userSchema);

exports.getById = (id) => {
    return User.findById({'_id': id},{  
        'firstName': 1,
        'lastName': 1,
        'email': 1,
    }).then((result) => {               
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    }).catch((error)=>{
        return error;
    });
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        User.find()
        .exec(function (err, users) {
            if (err) {
                reject(err);
            } else {
                resolve(users);
            }
        })
    });
};

exports.updateUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, user) {
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    })

};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
