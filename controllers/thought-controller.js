const { Thought, User } = require("../models");

const thoughtController = {
  
  createThought({params, body}, res) {
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

    getThoughtById({params}, res) {
        Thought.findOne(
            { _id: params.id })
        .populate({path: 'reactions',
        select: '-__v'})
        .select('-__v')
        .then(dbThoughtDa => {
            if(!dbThoughtDa) {
            res.status(404).json(
                {message: 'No thoughts with this ID!'});
            return;
        }
        res.json(dbThoughtDa)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getAllThoughts(req,res) {
        Thought.find({})
        .populate(
            {path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtDa => res.json(dbThoughtDa))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.id}, body, 
            {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbThoughtDa => {
            if (!dbThoughtDa) {
                res.status(404).json(
                    {message: "No thoughts with this ID! Sorry!"});
                return;
            }
                res.json(dbThoughtDa);
        })
        .catch(err => res.json(err));
    },

    // Delete a current thought by ID
    deleteThought({params}, res) {
        Thought.findOneAndDelete(
            {_id: params.id})
        .then(dbThoughtDa => {
            if (!dbThoughtDa) {
                res.status(404).json(
                    {message: "No thoughts with this ID! Sorry!"});
                return;
            }
            res.json(dbThoughtDa);
            })
            .catch(err => res.status(400).json(err));
    },
};





module.exports = thoughtController;