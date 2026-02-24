import mongoose from "mongoose";

const messagesSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    messages:{
        type:String,
        required:true
    },
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        default:[]
    }
},{timestamp:true})

const Messages=mongoose.model('Messages',messagesSchema)

export default Messages;