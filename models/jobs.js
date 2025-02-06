const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company and name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide company and name"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "Decline", "Pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", JobsSchema);
