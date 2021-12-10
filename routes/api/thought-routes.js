const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../..controllers/thought-controller");

router
    .route("/")
        .get(getAllThoughts)
        .post(createThought);