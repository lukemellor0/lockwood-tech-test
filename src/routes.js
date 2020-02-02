import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
var http = require('http');
var router = express.Router();
var userController = require('./controllers/users.controller');
const bodyParser = require('body-parser');

app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/users', userController.getUsers);

app.get('/users/:userId',  userController.getById);

app.put('/users', userController.createUser);

app.post('/users/:userId', userController.updateUser)

app.delete('/users/:userId', userController.deleteUser);

var RPC = {
    createUser: userController.createUser,
    getUsers: userController.getUsers,
    getUser: userController.getById,
    deleteUser: userController.deleteUser,
    updateUser: userController.updateUser
};

app.listen(process.env.PORT, () =>
    console.log('Example app listening on port ' + process.env.PORT + '!'),
);

http.createServer(require('connect-jsonrpc')(RPC)).listen(process.env.RPCPORT, () =>
    console.log('Example app RPC listening on port ' + process.env.RPCPORT + '!'),
);


router.get("/", function(req, res, next) {
    res.send("Api is working properly");
});
module.exports = router;
