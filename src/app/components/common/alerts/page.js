import React from "react";
import { FiAlertTriangle, FiInfo, FiShield, FiX } from "react-icons/fi";

const AlertsList = ({ alerts }) => {
  return (
    <>
      {alerts &&
        alerts.map((alert, index) => {
          let color, bgColor, icon;
          switch (alert.status) {
            case "Success":
              color = "bg-green-50";
              bgColor = "bg-greenColor";
              icon = FiShield;
              break;
            case "Info":
              color = "bg-blue-50";
              bgColor = "bg-themeColor";
              icon = FiInfo;
              break;
            case "Warning":
              color = "bg-orange-50";
              bgColor = "bg-orange-400";
              icon = FiAlertTriangle;
              break;
            case "Danger":
              color = "bg-red-50";
              bgColor = "bg-redColor";
              icon = FiX;
              break;
            default:
              color = "";
              bgColor = "";
              icon = FiInfo; // Default icon
          }

          return (
            <div
              key={index}
              className={`mx-2 my-2 rounded-lg p-3 border border-gray-300 ${color}`}
            >
              <div className="flex items-center p-1">
                <div className={`mx-1 p-2 rounded-full ${bgColor}`}>
                  {React.createElement(icon, { className: "text-white" })}
                </div>
                <div className="mx-1">
                  <div className="text-sm font-medium mb-1">{alert.title}</div>
                  <div className="text-xs font-normal mb-1">
                    {alert.message}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default AlertsList;
