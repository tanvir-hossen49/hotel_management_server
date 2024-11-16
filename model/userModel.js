const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");

const userModel = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [3, "The length of user name must be at least 3 characters"],
      maxlength: [31, "The length of user name can be maximum 31 characters"],
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "User email is required"],
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          );
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      minlength: [6, "The length of password can be minimum 6 characters"],
      set: value => bcryptjs.hashSync(value, bcryptjs.genSaltSync(10)),
    },
    phone: {
      type: String,
      minlength: [11, "The length of number can be minimum 11 digits"],
    },
    address: { type: String },
    image: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const users = model("users", userModel);

module.exports = users;

// rooms json
[
  {
    _id: "63f8abc123e4567890abcdef",
    coverImage: {
      url: "https://example.com/cover-image.jpg",
      alt: "Cover image of the room",
    },
    description: "A luxurious room with stunning views and modern amenities.",
    dimension: "30x40 sq ft",
    discount: 10,
    images: [
      {
        url: "https://example.com/image1.jpg",
        alt: "Room view from the balcony",
      },
      {
        url: "https://example.com/image2.jpg",
        alt: "Spacious bathroom with amenities",
      },
    ],
    isBooked: false,
    isFeatured: true,
    name: "Deluxe Suite",
    numberOfBeds: 2,
    offeredAmenities: [
      {
        name: "Free WiFi",
        description: "High-speed internet available 24/7",
      },
      {
        name: "Room Service",
        description: "Available round the clock",
      },
      {
        name: "Air Conditioning",
        description: "Fully adjustable temperature control",
      },
    ],
    price: 250,
    slug: {
      current: "deluxe-suite",
    },
    specialNote: "Includes complimentary breakfast and spa access.",
    type: "suite",
  },
  {
    _id: "63f8def456e7890123bcdef0",
    coverImage: {
      url: "https://example.com/cover-image2.jpg",
      alt: "Cover image of the economy room",
    },
    description: "An affordable room perfect for budget travelers.",
    dimension: "20x25 sq ft",
    discount: 5,
    images: [
      {
        url: "https://example.com/image3.jpg",
        alt: "Cozy bed with fresh linen",
      },
      {
        url: "https://example.com/image4.jpg",
        alt: "Compact bathroom with essentials",
      },
    ],
    isBooked: true,
    isFeatured: false,
    name: "Economy Room",
    numberOfBeds: 1,
    offeredAmenities: [
      {
        name: "Free Parking",
        description: "Secure parking space for all guests",
      },
      {
        name: "Television",
        description: "HD TV with various international channels",
      },
    ],
    price: 80,
    slug: {
      current: "economy-room",
    },
    specialNote: "Best value for short stays.",
    type: "standard",
  },
];
