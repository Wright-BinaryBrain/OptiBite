const express = require("express");
const { postFavourite, getOneFavourite, updateFavourite, getMyFavourite, deleteMyFavourite } = require("../controller/favouriteController");
const router = express.Router();
const favouriteValidation = require("../validation/favouriteValidation");
const { isAuthenticated } = require("../middleware/auth");

router.route('/postFavourite')
    .post(
        isAuthenticated, 
        favouriteValidation, 
        postFavourite
    );
    
router.route('/getMyFavourite')
    .get(
        isAuthenticated, 
        getMyFavourite
    );

router.route('/getOneFavourite/:id')
    .get(
        isAuthenticated, 
        getOneFavourite
    );

router.route('/updateFavourite')
    .patch(
        isAuthenticated, 
        favouriteValidation, 
        updateFavourite
    );


router.route('/deleteMyFavourite')
    .delete(
        isAuthenticated,  
        deleteMyFavourite
    );

module.exports = router;
