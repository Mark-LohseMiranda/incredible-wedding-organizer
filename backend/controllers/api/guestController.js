const { Party, Guest } = require("../../models");
const { authMiddleware} = require("../../utils/auth");
const router = require('express').Router();

router.post("/",authMiddleware, async (req, res) =>{
    try {
        const partyData = await Guest.create({
            weddingId: req.body.weddingId,
            guestName: req.body.guestName,
            meal: req.body.meal,
            seat: req.body.seat,
            street1: req.body.street1,
            street2: req.body.street2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            country: req.body.country,
        })
            res.status(200).json(partyData)
        }catch(err) {
            res.status(500).json({message: "error error error", err: err})
        }
    })

module.exports = router