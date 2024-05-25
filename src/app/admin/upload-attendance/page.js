"use client";
import React, { useRef, useState } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import CurrentDate from "@/app/components/common/currentdate/page";
import { FiCalendar, FiUpload } from "react-icons/fi"; // Importing FiUpload icon
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadAttendance = () => {
  const showAlertStatusToast = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(""); // State to store the selected file name

  const handleFileChange = (event) => {
    // Update the selected file name when the file input changes
    setFileName(event.target.files[0].name);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("files", fileInputRef.current.files[0]);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        "/api/admin/uploadattendance",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      showAlertStatusToast("File Uploaded Successfully");
    } catch (error) {
      console.error("Upload failed:", error.message);
    }
  };

  return (
    <SuperuserLayout>
      <div className="m-2 flex justify-between items-center my-2 bg-card p-2  rounded-lg mb-5">
        <BreadCrumb text=" Upload Attendance" />
        <button className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg">
          <FiCalendar className="text-white mx-2" /> <CurrentDate />
        </button>
      </div>
      <div className="flex items-center justify-center ">
        <div className=" border border-dashed border-themeColor  md:h-[500px] md:w-[500px]  flex flex-col justify-center p-3">
          <label
            htmlFor="file-upload"
            className="text-lg font-bold mb-4 cursor-pointer flex items-center"
          >
            <FiUpload className="w-8 h-8 mr-2 inline-block" /> Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange} // Call handleFileChange when file input changes
          />
          {/* Display the selected file name */}
          {fileName && <div className="mb-4">Selected File: {fileName}</div>}
          <button
            onClick={uploadFile}
            className="bg-themeColor hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Upload
          </button>
        </div>
        <ToastContainer />
      </div>
    </SuperuserLayout>
  );
};

export default UploadAttendance;
