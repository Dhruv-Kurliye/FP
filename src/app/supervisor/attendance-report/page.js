"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import CurrentDate from "@/app/components/common/currentdate/page";
import { FiCalendar } from "react-icons/fi";
import SupervisorLayout from "@/app/components/layouts/supervisorlayout/page";

const AttendanceReport = () => {
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get("/api/user/fetchattendancereport");
        setFileData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch file data");
        setLoading(false);
      }
    };

    fetchFileData();
  }, []);

  return (
    <SupervisorLayout>
      <div className="flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
        <BreadCrumb text=" Attendance Report" />
        <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
          <FiCalendar className="text-white mx-2" /> <CurrentDate />
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : fileData.length > 0 ? (
        <div>
          {fileData.map((file, fileIndex) => (
            <div key={fileIndex} className="mb-5">
              <h2 className="text-lg font-semibold my-2 text-center">
                {file.fileName}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      {file.data[0].map((header, index) => (
                        <th
                          key={index}
                          className="border border-gray-300 px-4 py-2"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {file.data.slice(1).map((rowData, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={
                          rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }
                      >
                        {rowData.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-gray-300 px-4 py-2"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </SupervisorLayout>
  );
};

export default AttendanceReport;
