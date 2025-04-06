import { Schema } from "mongoose";

const ChatModel = new Schema({
  id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      senderID: {
        type: String,
        required: true,
      },
      receiverID: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      isViewd: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default ChatModel;
