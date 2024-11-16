const { Schema, model } = require("mongoose");

const roomModel = new Schema({
  description: { type: String, required: true },
  floorNo: { type: Number, required: true },
  dimension: { type: String },
  discount: { type: Number, default: 0 },
  images: [
    {
      url: { type: String, required: true },
      alt: { type: String },
    },
  ],
  isBooked: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  name: { type: String, required: true },
  numberOfBeds: { type: Number, required: true },
  offeredAmenities: [
    {
      name: { type: String, required: true },
      description: { type: String },
    },
  ],
  price: { type: Number, required: true },
  slug: {
    current: { type: String, required: true },
  },
  specialNote: { type: String },
  type: { type: String, required: true },
});

const Room = model("rooms", roomModel);

module.exports = Room;
