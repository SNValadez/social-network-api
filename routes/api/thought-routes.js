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

router
    .route("/:thoughtId/reactions")
        .post(addReaction)
            .delete(deleteReaction);

router
    .route("/:id")
        .get(getThoughtById)
            .put(updateThought)
                .delete(deleteThought);



module.exports = router;
