import Conversation from "../Models/conversationModel.js";
import User from "../Models/userModel.js"; 

export const getUserBySearch = async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserId = req.user._id;

    const user = await User.find({
      $and: [
        {
          $or: [
            { username: { $regex: ".*" + search + ".*", $options: "i" } },
            { fullname: { $regex: ".*" + search + ".*", $options: "i" } },
          ],
        },
        { _id: { $ne: currentUserId } },
      ],
    })
      .select("-password")
      .select("email");

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentChatters = async (req, res) => {
  try {
    const currentUserID = req.user._id;

    const currentChatters = await Conversation.find({
      participants: currentUserID,
    }).sort({
      updatedAt: -1,
    });

    if (!currentChatters || currentChatters.length === 0)
      return res.status(200).send([]);

    const participantsIDS = currentChatters.reduce((ids, convo) => {
      // ensure participants is always an array
      const participantsArray = Array.isArray(convo.participants)
        ? convo.participants
        : [convo.participants];

      const otherParticipents = participantsArray.filter(
        (id) => id.toString() !== currentUserID.toString()
      );

      return [...ids, ...otherParticipents];
    }, []);

    const otherParticipentsIDS = participantsIDS.filter(
      (id) => id.toString() !== currentUserID.toString()
    );

    const users = await User.find({
      _id: { $in: otherParticipentsIDS },
    })
      .select("email") 
      .select("-password");

    const orderedUsers = otherParticipentsIDS.map((id) =>
      users.find((user) => user._id.toString() === id.toString())
    );

    res.status(200).send(orderedUsers);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};