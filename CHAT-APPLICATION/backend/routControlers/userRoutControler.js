import bcrypt from "bcrypt";
import User from "../Models/userModel.js";   // ⭐ THIS WAS THE MAIN MISSING LINE

export const userRegister = async (req, res) => {
  try {
    const { fullname, username, email, password, gender, profilepic } = req.body;

    const exist = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (exist) {
      return res.status(400).send({
        success: false,
        message: "Username or Email already exists"
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
      profilepic: gender === "male" ? profileBoy : profileGirl
    });

    await newUser.save();
    

    return res.status(200).send({
      success: true,
      data: newUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
};