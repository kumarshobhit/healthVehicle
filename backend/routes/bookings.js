const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/user");
const Ambulance = require("../models/ambulance");
const Booking = require("../models/bookings");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ksushant6566@gmail.com",
    pass: "Sushant@6566",
  },
});

router.get("/", (req, res) => {
  Booking.find()
    .then((bookings) => {
      // wrap and return bookings objects in response
      const response = {
        bookings: bookings,
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      // return error if there's any
      console.error(error.message);
      res.status(500).json({ message: `Unable to GET all bookings` });
    });
});

router.get("/:id", (req, res, next) => {
  // obtain booking id from request parameters
  const id = req.params.id;

  // get booking by id from database
  Booking.findOne({ _id: id })
    .then((booking) => {
      const response = {
        booking: booking,
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      // return error if there's any
      res
        .status(500)
        .json({ message: `Unable to GET booking of id '${id}'`, error: error });
    });
});

// To get Booking for Driver
router.get("/driver/:id", async (req, res, next) => {
  // obtain booking id from request parameters
  const id = req.params.id;

  // get booking by id from database

  try {
    const ambulance = await Ambulance.findOne({ _id: id });
    const bookings = await Booking.findOne({ ambulance: id });
    const user = await User.findOne({ _id: bookings.user });
    const response = {
      booking: {
        _id: bookings._id,
        userCoordinates: bookings.userCoordinates,
        ambulanceCoordinates: bookings.ambulanceCoordinates,
        user,
        ambulance,
        bookedtime: bookings.bookedtime,
        status: bookings.status,
      },
    };
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/createBooking", async (req, res) => {
  try {
    const ambulance = await Ambulance.findOne({ _id: req.body.ambulance });
    const user = await User.findOne({ _id: req.body.user });

    const booking = new Booking({
      ...req.body,
      user: user,
      ambulance: ambulance,
    });

    booking.save().then(async (booking) => {
      await Ambulance.updateOne(
        { _id: req.body.ambulance },
        { $set: { available: false } }
      );
      console.log(booking);
      const response = {
        booking: booking,
      };

      const mailOptions = {
        from: "ksushant6566@gmail.com",
        to: `${ambulance.email}`,
        subject: "URGENT: New Booking Request",
        text: `Dear ${ambulance.name}\n${user.firstName} has requested an ambulance please report.\n Check your dashboard for more details`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.json("unsuccessfull");
        } else {
          console.log("Email sent: " + info.response);
          res.json("successfull");
        }
      });

      res.status(200).json(response);
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
