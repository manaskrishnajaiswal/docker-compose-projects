import mongoose from "mongoose";
import User from "../models/User.js"; // Assuming your User model is defined here

// Function to generate a random integer within a range
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate random names
const generateRandomName = () => {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emma",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
  ];
  return names[getRandomInt(0, names.length - 1)];
};

// Function to generate random age between 18 and 60
const generateRandomAge = () => {
  return getRandomInt(18, 60);
};

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/users");

// Generate and insert 50 random users
(async () => {
  try {
    for (let i = 0; i < 50; i++) {
      const newUser = new User({
        name: generateRandomName(),
        age: generateRandomAge(),
      });
      await newUser.save();
    }
    console.log("50 random users inserted successfully!");
    mongoose.disconnect(); // Close the MongoDB connection
  } catch (error) {
    console.error("Error inserting random users:", error);
    mongoose.disconnect(); // Close the MongoDB connection
  }
})();
