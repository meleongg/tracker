// creates router
const router = require('express').Router();
// get user model
let User = require('../models/user.model');

// handles incoming HTTP GET requests on /users/
// middleware functions modifies request and response objects
router.route('/').get((req, res) => {
    // get list of all the users from db, returns a promise
    // listens for req, responds with res
    // req obj = HTTP request 
    // res obj = HTTP response that Express app sends when it receives HTTP request 
    User.find()
        // handles fulfilment
        .then(users => res.json(users))
        // handles rejection
        .catch(err => res.status(400).json('Error: ' + err));
});

// handles incoming HTTP POST requests on /users/add/
router.route('/add').post((req, res) => {
    // gets username
    const username = req.body.username;
    // creates new User
    const newUser = new User({ username });
    // saves new User to db
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;