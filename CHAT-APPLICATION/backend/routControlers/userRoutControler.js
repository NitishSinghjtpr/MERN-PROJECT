import bcrypt from "bcrypt";
import User from "../Models/userModel.js";
import jwtToken from "../Utils/jwtwebToken.js";

//User Register
export const userRegister = async (req, res) => {
  try {
    const { fullname, username, email, password, gender, profilepic } =
      req.body;

    const exist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (exist) {
      return res.status(400).send({
        success: false,
        message: "Username or Email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const profileBoy =
      profilepic ||
      `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const profileGirl =
      profilepic ||
      `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashPassword,
      gender,
      profilepic: gender === "male" ? profileBoy : profileGirl,
    });

    if (newUser) {
      await newUser.save();
      jwtToken(newUser._id, res);
    }

    return res.status(200).send({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//User login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not registered, please register",
      });
    }

    // Check password
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate Token ✔ Correct Order
    jwtToken(res, user._id);

    return res.status(200).send({
      success: true,
      message: "Login successfully",
      user,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


//User logout
export const userLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),  // cookie instantly expire
    });

    return res.status(200).send({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
