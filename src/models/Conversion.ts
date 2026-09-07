import { Schema, model, models } from "mongoose";

const ConversionSchema = new Schema({
  sourceLanguage: {
    type: String,
    required: true,
  },
  targetLanguage: {
    type: String,
    required: true,
  },
  pythonCode: {
    type: String,
    required: true,
  },
  variables: {
    type: [String],
    default: [],
  },
  problemDescription: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Conversion = models.Conversion || model("Conversion", ConversionSchema);

export default Conversion;
