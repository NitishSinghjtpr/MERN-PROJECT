import Conversation from "../Models/conversationModel.js";
import Messages from "../Models/messagesModel.js";   

export const sendMessage = async (req, res) => {
  try {
    const { messages } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let chats = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] }
    });

    if (!chats) {
      chats = await Conversation.create({
        participants: [senderId, recieverId]
      });
    }

    const newMessages = new Messages({
      senderId,
      recieverId,
      messages,
      conversationId: chats._id,
    });


    if (newMessages) {
      chats.messages.push(newMessages._id);
    }

    await Promise.all([chats.save(), newMessages.save()]);

    res.status(201).send(newMessages);

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    const chats = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] }
    }).populate("messages");

    if (!chats) {
      return res.status(200).send([]);
    } else {
      const Message = chats.messages;
      return res.status(200).send(Message);   // ⭐ FIX: return required
    }

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};