const {User} = require('../models');

const userController = {
    
    // Create a new User, brah
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

    getAllUsers(req, res) {
        User.find({})
          .populate({
            path: "thoughts",
            select: "-__v",
          })
          .select("-__v")
          .sort({ _id: -1 })
          .then((dbUserDa) => res.json(dbUserDa))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },

      updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, 
            { new: true, runValidators: true })
          .then(dbUserDa => {
            if (!dbUserDa) {
              res.status(404).json(
                  { message: 'Sorry! No user found with this id!' });
              return;
            }
            res.json(dbUserDa);
          })
          .catch(err => res.status(400).json(err));
      },
      
          deleteUser({ params }, res) {
          User.findOneAndDelete({ _id: params.id })
            .then(dbUserDa => {
              if (!dbUserDa) {
                res.status(404).json(
                    { message: 'No user found with this id! Sorry!' });
                return;
              }
              res.json(dbUserDa);
            })
            .catch(err => res.status(400).json(err));
        },

        addFriend({params}, res) {
            User.findOneAndUpdate(
                {_id: params.id}, {$push: { friends: params.friendId}},
                 {new: true})
            .populate({path: 'friends', select: ('-__v')})
            .select('-__v')
            .then(dbUserDa => {
                if (!dbUserDa) {
                    res.status(404).json(
                        {message: ' Sorry! No User with this ID!'});
                    return;
                }
            res.json(dbUserDa);
            })
            .catch(err => res.json(err));
        },
    
        deleteFriend({ params }, res) {
            User.findOneAndUpdate(
                {_id: params.id}, 
                {$pull: { friends: params.friendId}}, {new: true})
            .populate(
                {path: 'friends', select: '-__v'})
            .select('-__v')
            .then(dbUserDa => {
                if(!dbUserDa) {
                    res.status(404).json(
                        {message: 'No User with this ID! Sorry~'});
                    return;
                }
                res.json(dbUserDa);
            })
            .catch(err => res.status(400).json(err));
        }

};

module.exports = userController; 