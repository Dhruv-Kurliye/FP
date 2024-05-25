import { NextResponse } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import UploadAttendanceModel from "../../../../../backend/models/Uploadattendance";
import connectDb from "../../../../../backend/middleware/db";

const pump = promisify(pipeline);

const addAttendanceHandler = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.getAll("files")[0];
    const filePath = `./public/uploads/${file.name}`;

    // Save file to public directory
    await pump(file.stream(), fs.createWriteStream(filePath));

    // Create a new instance of the 'UploadAttendanceModel' and assign the field values
    const newAttendance = new UploadAttendanceModel({
      fileName: file.name,
      filePath: filePath, // Save the file path in the database
      uploadedAt: Date.now(),
    });

    // Save the new attendance record to the database
    const savedAttendance = await newAttendance.save();

    return NextResponse.json(
      {
        status: "success",
        data: savedAttendance,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving Attendance:", error);
    return NextResponse.json(
      {
        status: "fail",
        message: "Failed to add attendance",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(addAttendanceHandler);
