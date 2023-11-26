const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require('./models/User');
const multer = require('multer');
const arts = require('./models/arts');
const Counter = require('./models/Counter.js');
const Order = require('./models/order.js');
const Cart = require('./models/cart.js');
const Wishlist = require('./models/wishlist.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

mongoose.connect("mongodb://127.0.0.1:27017/artDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.post('/register', async(req,res)=>{
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: 'userId' },
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
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/addCart/:id', async(req,res)=>{
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: 'cartID' },
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
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/addwish/:id', async(req,res)=>{
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: 'wishlistID' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true },
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
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/placeOrder/:userID/:artsID', async (req, res) => {
  try {
    const { userID, artsID } = req.params;

    const counter = await Counter.findOneAndUpdate(
      { _id: 'orderID' },
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
    res.status(500).json({ error: 'Error creating order' });
  }
});

app.get("/myorder/:userID", async(req,res) => {
    try {
      const uID = req.params.userID ;

      const myArt = await Order.find({userID: uID});
      console.log(myArt) ;
      res.status(200).json(myArt);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });  
    }
});

//Get wishlist
app.get("/getwishlist/:userID", async(req,res) => {
  try {
    const USER_ID = req.params.userID ;
    console.log(USER_ID);
    const myWish = await Wishlist.find({userID: USER_ID});
    console.log(myWish) ;
    res.status(200).json(myWish);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });  
  }

});

app.get('/home/:UserID', async (req, res) => {
  try {
    const allarts = await arts.find();
    res.json(allarts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then(User => {
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
      .catch(err => {
        res.status(500).json({ error: 'Server error' });
      });
  });

// Get User by UserID
app.get('/users/:userID', async (req, res) => {
    try {

    const userID = req.params.userID;
    // console.log(req.params.userID);
    const foundUser = await User.findOne({ userID: userID });
    if (foundUser) {
      res.json(foundUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



// User Art detail
app.get('/myart/:userID', async (req, res) => {
  try {
    const U_ID = req.params.userID;
    const artData = await arts.find({ userID: U_ID });

    if (!artData) {
      return res.status(404).json({ message: 'No art found for this user' });
    }

    res.json({ message: 'Successful', artData });
  } catch (err) {
    console.error('Error fetching art data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/mycart/:userID', async (req, res) => {
  try {
    const UID = req.params.userID;
    const artData = await Cart.find({ userID: UID });

    if (!artData) {
      return res.status(404).json({ message: 'No art found for this user' });
    }

    res.json({ message: 'Successful', artData });
  } catch (err) {
    console.error('Error fetching art data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/account/:userID', async (req, res) => {
  try {
    const u_id = req.params.userID;
    console.log(u_id);
    const userData = await User.find({ userID: u_id });

    if (!userData) {
      return res.status(404).json({ message: 'No user found for this user' });
    }
    console.log(userData);
    res.json({ message: 'Successful', userData });
  } catch (err) {
    console.error('Error fetching art data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads'); // Set your desired upload destination
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); // Use original file name or customize as needed
  }
});

const upload = multer({ storage: storage });

app.post('/addArt/:userID', upload.single('image'), async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: 'artsId' },
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
    res.status(500).json({ error: 'Error creating arts' });
  }
}); 

app.get('/art', async (req, res) => {
  try {
    const allarts = await arts.find();
    console.log("Backend")
    console.log(allarts);
    // res.json("message","successful",allarts);
    res.json({ message: "successful", artsData: allarts });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/artDet/:id', async (req, res) => {
  try {
      let aid = req.params.id;
      console.log(aid);
      const art = await arts.findOne({ artsID: aid});
      console.log(art);
      if (!art) {
          return res.status(404).json({ message: 'arts not found' });
      }
      res.json({ message: 'Successful', artsData: art });
  } catch (err) {
      res.status(500).json({ error: 'Server error' });
  }
});




app.listen(3001, () => {
  console.log("Server is running on: 3001");
});



// app.get('/art', async (req, res) => {
//   try {
//     const allarts = await artss.find();
//     console.log(allarts);
//     // res.json("message","successful",allarts);
//     res.json({ message: "successful", artsData: allarts });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.get('/artsDet/:id', async (req, res) => {
//     try {
//         let aid = req.params.id;
//         const arts = await artss.findOne({ artsID: aid});
//         console.log(arts);
//         if (!arts) {
//             return res.status(404).json({ message: 'arts not found' });
//         }
//         res.json({ message: 'Successful', artsData: arts });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// app.put('/update-arts', async (req, res) => {
//   const { artsID, title, description, price, style, dateCreated, image } = req.body;

//   if (!artsID) {
//     return res.status(400).json({ error: 'arts ID is missing' });
//   }

//   try {
//     const updatedarts = await arts.findByIdAndUpdate(
//       artsID,
//       { title, description, price, style, dateCreated, image },
//       { new: true }
//     );

//     if (!updatedarts) {
//       return res.status(404).json({ error: 'arts not found' });
//     }

//     res.json(updatedarts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error updating arts data' });
//   }
// });

// app.post('/register', async (req, res) => {
//   try {
//     const counter = await Counter.findOneAndUpdate(
//       { _id: 'UserId' },
//       { $inc: { sequence_value: 1 } },
//       { new: true, upsert: true }
//     );

//     const newUser = new Users({
//       UserID: counter.sequence_value,
//       name: req.body.Username,
//       email: req.body.email,
//       password: req.body.password,
//       city: req.body.city,
//       state: req.body.state,
//       streetName: req.body.streetName,
//       pincode: req.body.pincode,
//     });

//     const createdUser = await newUser.save();
//     res.json(createdUser);
//   } catch (err) {
//     res.status(500).json({ error: 'Error creating User' });
//   }
// });


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, 'uploads'); // Set your desired upload destination
//   },
//   filename: function (req, file, cb) {
//       cb(null, file.originalname); // Use original file name or customize as needed
//   }
// });

// const upload = multer({ storage: storage });

// app.post('/addarts', upload.single('image'), async (req, res) => {
//   try {
//     const counter = await Counter.findOneAndUpdate(
//       { _id: 'artsId' },
//       { $inc: { sequence_value: 1 } },
//       { new: true, upsert: true }
//     );

//     const newarts = new arts({
//       artsID: counter.sequence_value,
//       UserID: req.body.UserID,
//       title: req.body.title,
//       description: req.body.description,
//       price: req.body.price,
//       style: req.body.style,
//       dateCreated: req.body.dateCreated,
//       image: req.file.filename, // Use req.file.filename to get the uploaded image filename
//     });

//     const createdarts = await newarts.save();
//     res.json(createdarts);
//   } catch (err) {
//     res.status(500).json({ error: 'Error creating arts' });
//   }
// }); 

  // Get User by UserID
// app.get('/Users/:UserID', async (req, res) => {
//   const UserID = req.params.UserID;

//   try {
//     const User = await Users.findOne({ UserID: UserID });
//     if (User) {
//       res.json(User);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.get('/arts/:artsID', async (req, res) => {
//   const artsID = req.params.artsID;

//   try {
//     const arts = await arts.findOne({ _id: artsID });
//     if (arts) {
//       res.json(User);
//     } else {
//       res.status(404).json({ message: 'arts not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });