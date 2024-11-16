const mongoose = require("mongoose");

const bookingModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotelRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  checkinDate: { type: Date, required: true },
  checkoutDate: { type: Date, required: true },
  numberOfDays: { type: Number, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Booking", bookingModel);
const bookings = model("bookingModel", userModel);

module.exports = bookings;
