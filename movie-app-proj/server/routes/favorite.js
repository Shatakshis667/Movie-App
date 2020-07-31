const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================



router.post("/favoriteNumber", auth, (req, res) => {
    
    // find favorite info inside favorite collection by movieId
    Favorite.find({"movieId": req.body.movieId})
    .exec((err, favorite)=>{                                                    //callbackfunction
         if(err) return res.status(400).send(err)

         res.status(200).json({success:true, favoriteNumber: favorite.length})  //favorite.length gives the info about how many people added this as favorite
    })
});
router.post("/favorited", auth, (req, res) => {
    // find favorite info inside favorite collection by movieId, userFrom
    Favorite.find({"movieId": req.body.movieId, "userFrom":req.body.userFrom })
    .exec((err, favorite)=>{                                                    //callbackfunction
        if(err) return res.status(400).send(err)
        
        let result=false;
        if(favorite.length!==0)
        {
            result=true;
        }

        res.status(200).json({success:true, favorited: result})
   })
});
router.post("/addToFavorite", auth, (req, res) => {
    //save the information about the movie or userId in the favorite collection

    const favorite=new Favorite(req.body);

    favorite.save((err, doc)=>{                                              //save the info in database
        if(err) return res.json({success: false, err})
        
        return res.status(200).json({success:true })
    })
});

router.post("/removeFromFavorite", auth, (req, res) => {
   
    //remove from favorite

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});

router.post("/getFavoritedMovie", auth, (req, res) => {
   
    Favorite.find({'userFrom': req.body.userFrom})
    .exec((err, favorites)=>{
        if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, favorites })
    })
});

module.exports = router;
