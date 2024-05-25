import React from "react";
import { FaStar } from "react-icons/fa";

const FeedbackCard = ({ feedback }) => {
  // Convert input date string to a Date object
  const dateObj = new Date(feedback.date);

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get day, month, and year
  const day = dateObj.getUTCDate();
  const month = monthNames[dateObj.getUTCMonth()];
  const year = dateObj.getUTCFullYear();

  // Formatted date string
  const formattedDate = `${day} ${month} ${year}`;

  return (
    <div className="p-5">
      <div className="md:flex gap-6">
        <div className="flex items-center my-4 md:my-0 gap-3 mb-2">
          <FaStar className="text-yellow-300 text-xl cursor-pointer" />
          <FaStar className="text-yellow-300 text-xl cursor-pointer" />
          <FaStar className="text-yellow-300 text-xl cursor-pointer" />
          <FaStar className="text-yellow-300 text-xl cursor-pointer" />
          <FaStar className="text-yellow-300 text-xl cursor-pointer" />
        </div>
        <div className="text-gray-600 font-light">
          <span className=" mr-4 text-gray-400">|</span>
          {formattedDate}
        </div>
      </div>
      <div className="font-normal my-3">{feedback.feedbackText}</div>
      <hr />
    </div>
  );
};

export default FeedbackCard;
