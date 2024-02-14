const express = require('express');
const router=express.Router();
const Booking=require('../models/bookingModel.js');

router.get("/getallbookings", async (req, res) => {
    try {
      const bookings = await Booking.find();
      
      res.status(200).json(bookings);
    } catch (error) {
      return res.status(400).json(error);
    }
  });
  router.post("/addbooking", async (req, res) => {
    console.log(req.body)
    try {   
      const newbooking = new Booking(req.body);
      await newbooking.save();
      console.log(newbooking)
      res.send("Food added successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });
  router.delete("/deletebooking", async (req, res) => {
  
    try {
      await Booking.findOneAndDelete({ _id: req.body.id });
      res.json("Food deleted successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });
  
  module.exports=router