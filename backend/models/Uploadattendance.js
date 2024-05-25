import mongoose from "mongoose";
const { Schema } = mongoose;

const uploadAttendanceSchema = new Schema(
  {
    fileName: { type: String, required: true }, // Original filename of the uploaded Excel sheet
    filePath: { type: String, required: true }, // Path to the uploaded Excel sheet on the server
    uploadedAt: { type: Date, default: Date.now }, // Timestamp of when the file was uploaded

    // Add other fields as needed
  },
  { timestamps: true }
);

const UploadAttendanceModel =
  mongoose.models.UploadAttendance ||
  mongoose.model("UploadAttendance", uploadAttendanceSchema);

export default UploadAttendanceModel;
