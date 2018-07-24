const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  date: { type: Date, default: Date.now },
  startingOdometer: { type: Number, default: 0 },
  endingOdometer: { type: Number, default: 0 },
  miles: { type: Number, default: 0 },
  hours: { type: Number, default: 0 },
  tips: { type: Number, default: 0 },
  wage: { type: Number, default: 0 },
  description: { type: String },
  tripCompleted: {type: Boolean, default: false}
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
