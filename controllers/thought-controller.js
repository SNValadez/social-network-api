const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  createThoughts({params, body}, res) {
    Thought.create(body)
    .then(({_id}) => {
        return User.findOneAndUpdate(
            { _id: params.userId}, 
            {$push: {thoughts: _id}}, 
            {new: true});
    })
    .then(dbThoughtDa => {
        if(!dbThoughtDa) {
            res.status(404).json(
                {message: "No thoughts with this ID!"});
            return;
        }
        res.json(dbThoughtDa)
    })
    .catch(err => res.json(err)); 
    },




}





module.exports = thoughtController;