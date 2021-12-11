const {User} = require('../models');

const userController = {
    
    // Create a new User
    createUser({body}, res) {
        User.create(body)
        .then(dbUserDa => res.json(dbUserDa))
        .catch(err => res.status(400).json(err));
    },

    getUserById({params}, res) {
        User.findOne(
            {_id: params.id })
        .populate(
            {path: 'thoughts', select: '-__v'})
        .populate(
            {path: 'friends', select: '-__v'})
        .select('-__v')
      
        .then(dbUserDa => {
            if(!dbUserDa) {
                res.status(404).json(
                    {message: 'No User with this ID! Sorry!'});
                return; 
            }
            res.json(dbUserDa)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },


    
}

module.exports = userController; 