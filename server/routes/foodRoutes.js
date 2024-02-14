const express = require('express');
const router=express.Router();
const Food=require('../models/foodModel');

router.get("/getallfoods", async (req, res) => {
    try {
      const foods = await Food.find();
      
      res.status(200).json(foods);
    } catch (error) {
      return res.status(400).json(error);
    }
  });
  router.post("/addfood", async (req, res) => {
  
    try {
        
      const newfood = new Food(req.body);
      await newfood.save();
      res.send("Food added successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  router.put("/editfood", async (req, res) => {
    
  
    try {
      const food = await Food.findOne({ _id: req.body.id });
      food.name = req.body.name;
      food.image = req.body.image;
      food.type = req.body.type;
      food.price = req.body.price;
      food.description=req.body.description;
      food.details=req.body.details;
  
      await food.save();
  
      res.send("Food details updated successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  router.delete("/deletefood", async (req, res) => {
  
    try {
      await Food.findOneAndDelete({ _id: req.body.id });
        
      res.send("Food deleted successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });
  
  module.exports = router;