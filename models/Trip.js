const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const tripSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  startDate: { type: Number},
  endDate: { type: Number},
  startingOdometer: { type: Number, default: 0 },
  endingOdometer: { type: Number, default: 0 },
  miles: { type: Number, default: 0 },
  hours: { type: SchemaTypes.Double, default: 0 },
  tips: { type: Number, default: 0 },
  wage: { type: Number, default: 0 },
  description: { type: String },
  tripCompleted: { type: Boolean, default: false }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
