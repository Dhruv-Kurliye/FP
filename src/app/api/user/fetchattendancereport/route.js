import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import UploadAttendanceModel from "../../../../../backend/models/Uploadattendance";
import path from "path";

const getExcelData = async (filePath) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];

    const dataArray = [];

    // Iterate over each row
    worksheet.eachRow((row, rowIndex) => {
      const rowData = [];

      // Iterate over each cell in the row
      row.eachCell((cell, colIndex) => {
        rowData.push(cell.value);
      });

      dataArray.push(rowData);
    });

    return dataArray;
  } catch (error) {
    console.error(`Error reading Excel file: ${error.message}`);
    throw error;
  }
};

const fetchAllFileDataHandler = async () => {
  try {
    const uploadRecords = await UploadAttendanceModel.find();
    const allFileData = [];

    for (const record of uploadRecords) {
      const filePath = record.filePath;
      console.log("File Path:", filePath);

      if (!filePath) {
        console.error("File path is missing for record:", record);
        continue;
      }

      let fileData;
      if (filePath.endsWith(".xlsx")) {
        fileData = await getExcelData(filePath);
      } else {
        throw new Error("Unsupported file type");
      }

      allFileData.push({ fileName: record.fileName, data: fileData });
    }

    return NextResponse.json(
      {
        data: allFileData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching file data:", error);
    return NextResponse.json(
      {
        message: `Failed to fetch file data: ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = fetchAllFileDataHandler;
