const router = require("express").Router();
const apiRoutes = require("./api");

router.use((req, res) => {
    res.status(404).send("<h1>404 Error! Sorry!</h1>")
})

router.use("/api", apiRoutes);


module.exports = router;
