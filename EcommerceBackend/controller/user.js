const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

const User = require("../model/User.js");


const userCtrl = {
  //!Register

  register: asyncHandler(async (req, res) => {


    console.log("I am inside register controler");

    
      const { username, email, password } = req.body;


      console.log(req.file);
      

      //! Validations
      if (!username || !email || !password ) {
        throw new Error("All fields are required");
      }

         // Upload  each image public_id and Url in db

     
        console.log("Getted all the object for sending to db");

  
    //! check if user alreday exist

    const userExist = await User.findOne({ email });

    if (userExist) {
      //   console.log("Hello");
      throw new Error("This email has been already regfister");
    }


     //! Hash the user password

     const salt = await bcrypt.genSalt(10);

     const hashedPassword = await bcrypt.hash(password, salt);
 
     //! create the user
 

       
       const userCreated = await User.create({
         username,
         password: hashedPassword,
         email,

       });
 
       console.log(userCreated);
 
       //! send the response
 
       res.json({
         message: "Register Success",
         username: userCreated.username,
         email: userCreated.email,
         id: userCreated._id,
       })
     })   
  ,

  //!Login

  login: asyncHandler(async (req, res) => {
    // res.json({message:"Login"})

    const { email, password } = req.body;

    //! check if user email exits

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid ceredentials");
    }

    //! check if user password is valid

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid ceredentials");
    }

    //! Genrate the token

    const token = jwt.sign({ id: user._id }, "anykey", { expiresIn: "30d" });

    res.json({
      // message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
      profileImageUrl: user.profileImageUrl,
    });
  }),

  //! Profile

  Profile: asyncHandler(async (req, res) => {
    // Find the user and populate the address, orders, and product details inside items
    const user = await User.findById(req.user_id)
      .select("-password") // Exclude the password field
      .populate("address") // Populate the address field
      .populate({
        path: "orders", // Populate the orders field
        populate: {
          path: "items.product_id", // Populate product_id inside items
          select: "name description finalPrice", // Select specific fields from the Product model
        },
      });

    if (!user) {
      throw new Error("User not found");
    }

    return res.json({ user });
  }),

  EditProfile: asyncHandler(async (req, res) => {



    const { username, email } = req.body;


    console.log(username, email)


    //! Validations
    if(!username || !email){
      throw new Error("All fields are required");
    }

    
    const userFound = await User.findById(req.user_id);


    console.log(userFound);
    




    //! Check if the user is trying to update the same username and email

    if(userFound.username === username && userFound.email === email){
      return res.status(400).json({message:"No changes made"});
    }


    //! Returned the document after updation takes place if new:true
    const updatedUser = await User.findByIdAndUpdate(
      req.user_id,
      { username, email },
      { new: true }
    ).select("-posts -password");


    // console.log(updatedUser);

    res.status(201).json({ message: "Updated Succesfully", user: updatedUser });
  }),

  EditPassword: asyncHandler(async (req, res) => {
    //! Updating the password

    const { OldPassword } = req.body;

    const user = await User.findById(req.user_id);

    console.log(user);
    

    const isMatch = await bcrypt.compare(OldPassword, user.password);

    if (!isMatch) {
      return res
        .json({ message: "You cannot change the paasssword" })
        .status(401);
    }

    const { newPassword } = req.body;

    //!hash the password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const userupdated = await User.findByIdAndUpdate(
      req.user_id,
      { password: hashedPassword },
      { new: true }
    ).select("-posts -password");

    res
      .json({ message: "Updated the password", user: userupdated })
      .status(201);
  }),

  DeleteAccount: asyncHandler(async(req, res) =>{

    const {id} = req.params;

    const userFound = await User.findById(req.user_id);

    if(!userFound){
      throw new Error("User not Found");
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({message:"Delete Succesfully"})


    console.log("I am delete account Controller")

  })

};




module.exports = userCtrl;
