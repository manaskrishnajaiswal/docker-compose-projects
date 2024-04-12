import connectDB from "../lib/connectDB.js";
import User from "../models/User.js";

const usersGetController = async (req, res) => {
  try {
    await connectDB();
    const users = await User.find({});
    return res
      .status(200)
      .json({ message: "Users fetched Successfully!", users: users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const userGetController = async (req, res) => {
  try {
    await connectDB();
    const userId = req.params.id;
    const userFound = await User.find({ _id: userId });
    if (userFound.length == 0) {
      return res.status(404).json({ message: "User not found!!" });
    }
    return res
      .status(200)
      .json({ message: "User found Successfully!", user: userFound[0] });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const userAddController = async (req, res) => {
  try {
    await connectDB();
    const { name, age } = req.body;
    const newUser = new User({
      name: name,
      age: age,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ message: "User added to DB Successfully!", newUser: newUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const userUpdateController = async (req, res) => {
  try {
    await connectDB();
    const userId = req.params.id;
    const { name, age } = req.body;
    // Check if userId or name/age is missing
    if (!userId || !name || !age) {
      return res
        .status(400)
        .json({ error: "userId, name, and age are required" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, age },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "User updated Successfully!",
      updatedUser: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const userDeleteController = async (req, res) => {
  try {
    await connectDB();
    const userId = req.params.id; // Assuming userId is passed as a URL parameter
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser: deletedUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export {
  userAddController,
  usersGetController,
  userGetController,
  userUpdateController,
  userDeleteController,
};
