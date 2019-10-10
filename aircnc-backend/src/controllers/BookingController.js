const Booking = require("../models/Booking");
const Spot = require("../models/Spot");

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date
    });

    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    const spot = await Spot.findById(spot_id);
    const spot_user = spot.user._id;
    const ownerSocket = req.connectedUsers[spot_user];
    console.log(spot_user);
    if (ownerSocket) {
      req.io.to(ownerSocket).emit("booking_request", booking);
    }

    return res.json(booking);
  }
};
