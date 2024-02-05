const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const multer = require("multer");
const arts = require("./models/arts");
const Counter = require("./models/Counter.js");
const Order = require("./models/order.js");
const Cart = require("./models/cart.js");
const Wishlist = require("./models/wishlist.js");
const path = require("path");

const app = express();
app.use(express.json());
const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../frontend/build");
app.use(express.static(buildpath));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(
    "mongodb+srv://viraj:8xFye2JQAfKncvo1@cluster0.lb7hg.mongodb.net/artDB?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.post("/register", async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: "userId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const newUser = new User({
      userID: counter.sequence_value,
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      city: req.body.city,
      state: req.body.state,
      streetName: req.body.streetName,
      pincode: req.body.pincode,
    });

    const createdUser = await newUser.save();
    // console.log(createdUser);
    res.json(createdUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.post("/addCart/:id", async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: "cartID" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const newCart = new Cart({
      cartID: counter.sequence_value,
      userID: req.body.userID,
      artsID: req.body.artsID,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.body.image,
    });

    const createdCart = await newCart.save();
    console.log(createdCart);
    res.status(200).json(createdCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.post("/addwish/:id", async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: "wishlistID" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const newWish = new Wishlist({
      wishlistID: counter.sequence_value,
      userID: req.body.userID,
      artsID: req.body.artsID,
    });

    const createdWishlist = await newWish.save();
    console.log(createdWishlist);
    res.status(200).json(createdWishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.post("/placeOrder/:userID/:artsID", async (req, res) => {
  try {
    const { userID, artsID } = req.params;

    const counter = await Counter.findOneAndUpdate(
      { _id: "orderID" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const { date, price, city, state, streetName, pincode } = req.body;

    const newOrder = new Order({
      orderID: counter.sequence_value,
      userID: userID,
      artsID: artsID,
      orderDate: date,
      price: price,
      city: city,
      state: state,
      streetName: streetName,
      pincode: pincode,
      status: false,
    });

    const createOrder = await newOrder.save();
    res.status(200).json(createOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating order" });
  }
});

app.get("/myorder/:userID", async (req, res) => {
  try {
    const uID = req.params.userID;

    const myArt = await Order.find({ userID: uID });
    console.log(myArt);
    res.status(200).json(myArt);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//Get wishlist
app.get("/getwishlist/:userID", async (req, res) => {
  try {
    const USER_ID = req.params.userID;
    console.log(USER_ID);
    const myWish = await Wishlist.find({ userID: USER_ID });
    console.log(myWish);
    res.status(200).json(myWish);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/home/:UserID", async (req, res) => {
  try {
    const allarts = await arts.find();
    res.json(allarts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((User) => {
      if (User) {
        if (User.password === password) {
          // If the password matches, send the UserID along with the success message
          res.json({ message: "Success", userID: User.userID }); // Assuming User.UserID contains the UserID
        } else {
          res.json("The password is incorrect");
        }
      } else {
        res.json("No record found");
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Server error" });
    });
});

// Get User by UserID
app.get("/users/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    // console.log(req.params.userID);
    const foundUser = await User.findOne({ userID: userID });
    if (foundUser) {
      res.json(foundUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// User Art detail
app.get("/myart/:userID", async (req, res) => {
  try {
    const U_ID = req.params.userID;
    const artData = await arts.find({ userID: U_ID });

    if (!artData) {
      return res.status(404).json({ message: "No art found for this user" });
    }

    res.json({ message: "Successful", artData });
  } catch (err) {
    console.error("Error fetching art data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/mycart/:userID", async (req, res) => {
  try {
    const UID = req.params.userID;
    const artData = await Cart.find({ userID: UID });

    if (!artData) {
      return res.status(404).json({ message: "No art found for this user" });
    }

    res.json({ message: "Successful", artData });
  } catch (err) {
    console.error("Error fetching art data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/account/:userID", async (req, res) => {
  try {
    const u_id = req.params.userID;
    console.log(u_id);
    const userData = await User.find({ userID: u_id });

    if (!userData) {
      return res.status(404).json({ message: "No user found for this user" });
    }
    console.log(userData);
    res.json({ message: "Successful", userData });
  } catch (err) {
    console.error("Error fetching art data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Set your desired upload destination
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name or customize as needed
  },
});

const upload = multer({ storage: storage });

app.post("/addArt/:userID", upload.single("image"), async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: "artsId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const newarts = new arts({
      artsID: counter.sequence_value,
      userID: req.body.userID,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      style: req.body.style,
      dateCreated: req.body.dateCreated,
      image: req.file.filename, // Use req.file.filename to get the uploaded image filename
    });

    const createdarts = await newarts.save();
    res.json(createdarts);
  } catch (err) {
    res.status(500).json({ error: "Error creating arts" });
  }
});

app.get("/art", async (req, res) => {
  try {
    const allarts = await arts.find();
    console.log("Backend");
    console.log(allarts);
    // res.json("message","successful",allarts);
    res.json({ message: "successful", artsData: allarts });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/artDet/:id", async (req, res) => {
  try {
    let aid = req.params.id;
    console.log(aid);
    const art = await arts.findOne({ artsID: aid });
    console.log(art);
    if (!art) {
      return res.status(404).json({ message: "arts not found" });
    }
    res.json({ message: "Successful", artsData: art });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//update user data
app.put("/updateAccount/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const updatedDetails = req.body; // The updated user details sent from the frontend

    console.log("Updating");
    // Update the user details in the database based on the provided userID
    console.log(req.body);
    const updatedUser = await User.findOneAndUpdate(
      { userID: userID },
      { $set: updatedDetails },
      { new: true } // To return the updated user data
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//Deleting particular order
app.delete("/deleteOrder/:orderID", async (req, res) => {
  try {
    const orderID = req.params.orderID;

    const deletedOrder = await Order.findOneAndDelete({ orderID: orderID });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// delete user
app.delete("/deleteUser/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;

    const deletedUser = await User.findOneAndDelete({ userID: userID });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Deleting particular art
app.delete("/deleteArt/:artID", async (req, res) => {
  try {
    const artID = req.params.artID;

    const deletedArt = await arts.findOneAndDelete({ artsID: artID });

    if (!deletedArt) {
      return res.status(404).json({ message: "Art not found" });
    }

    res.status(200).json({ message: "Art deleted successfully" });
  } catch (error) {
    console.error("Error deleting art:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Updating particular art
app.put("/updateArt/:artID", upload.single("image"), async (req, res) => {
  try {
    const artID = req.params.artID;
    const updatedDetails = req.body; // The updated art details sent from the frontend

    const updatedArt = await arts.findOneAndUpdate(
      { artsID: artID },
      { $set: updatedDetails },
      { new: true } // To return the updated art data
    );

    if (!updatedArt) {
      return res.status(404).json({ message: "Art not found" });
    }

    res.status(200).json(updatedArt);
  } catch (error) {
    console.error("Error updating art details:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//Fetching all user data
app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on: 8000");
});
