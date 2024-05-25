"use client";
import React, { useState, useEffect } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import LineChart from "@/app/components/attendancechart/page";
import { FiUserCheck } from "react-icons/fi";
const Dashboard = () => {
  return (
    <SuperuserLayout>
      <div className="md:flex ">
        {/* Use the CustomSidebar component with the necessary props */}
        <div className="w-full md:w-9/12">
          <div className=" mx-2  my-2 flex justify-center bg-card rounded-lg shadow  ">
            <LineChart role="Employees" color="#29CC6A"    shadowColor="#dcfce7" />
          </div>
          <div className="mx-2  my-2 flex justify-center bg-card rounded-lg shadow">
            <LineChart role="Supervisors" color="#F2C94C"    shadowColor="#fef9c3"/>
          </div>
        </div>
        <div className="w-full md:w-3/12 mx-3 p-3 border border-r-0 border-t-0 border-b-0 border-gray-300">
          {/* total attendance  */}
          <div className="mt-5">
            <div className="text-textColor font-bold mb-2">
              Today's Attendance{" "}
            </div>
            <div className="text-gray-500 font-light text-sm mb-5 ">
              03 July 2023{" "}
            </div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-full">
                <FiUserCheck className="text-greenColor w-[25px] h-[25px]" />
              </div>
              <div className="mx-3">
                <div className="text-textColor font-light mb-2">Employees</div>
                <div className="text-greenColor font-medium text-sm  ">
                  22/43
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-yellow-100 rounded-full">
                <FiUserCheck className="text-yellowColor w-[25px] h-[25px]" />
              </div>
              <div className="mx-3">
                <div className="text-textColor font-medium mb-2">
                  Supervisors
                </div>
                <div className="text-yellowColor font-light text-sm  ">
                  18/23
                </div>
              </div>
            </div>
          </div>

          {/* recent attendance  */}
          <div className="mt-5">
            <div className="text-textColor font-bold mb-5">
              Recent Attendance{" "}
            </div>

            <div className="flex items-center mb-4">
              <div className="">
                <img
                  className="w-[40px] h-[40px] mb-3 rounded-full shadow-lg"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                  alt="Bonnie image"
                />
              </div>
              <div className="mx-3">
                <div className="text-textColor font-light ">
                  Mayuresh Gajalwar
                </div>
                <div className="text-gray-400 font-medium text-sm  mb-2 ">
                  Employee
                </div>
                <div className="text-gray-400 font-light text-sm  ">
                  2 Min Ago
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="">
                <img
                  className="w-[40px] h-[40px] mb-3 rounded-full shadow-lg"
                  src="https://media.istockphoto.com/id/1412730914/photo/confident-young-entrepreneur.jpg?s=170667a&w=0&k=20&c=PPOkh-bBtGtHh4f2Hl7A5v_m4hPmKOWxrwh0Hr_zx4Q="
                  alt="Bonnie image"
                />
              </div>
              <div className="mx-3">
                <div className="text-textColor font-light ">
                  Dhruv Kurliye
                </div>
                <div className="text-gray-400 font-medium text-sm  mb-2 ">
                  Supervisor
                </div>
                <div className="text-gray-400 font-light text-sm  ">
                  10 Min Ago
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="">
                <img
                  className="w-[40px] h-[40px] mb-3 rounded-full shadow-lg"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                  alt="Bonnie image"
                />
              </div>
              <div className="mx-3">
                <div className="text-textColor font-light ">
                  Mayuresh Gajalwar
                </div>
                <div className="text-gray-400 font-medium text-sm  mb-2 ">
                  Employee
                </div>
                <div className="text-gray-400 font-light text-sm  ">
                  2 Min Ago
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="">
                <img
                  className="w-[40px] h-[40px] mb-3 rounded-full shadow-lg"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                  alt="Bonnie image"
                />
              </div>
              <div className="mx-3">
                <div className="text-textColor font-light ">
                  Tejas Kulkarni
                </div>
                <div className="text-gray-400 font-medium text-sm  mb-2 ">
                  Employee
                </div>
                <div className="text-gray-400 font-light text-sm  ">
                  2 Min Ago
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="">
                <img
                  className="w-[40px] h-[40px] mb-3 rounded-full shadow-lg"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                  alt="Bonnie image"
                />
              </div>
              <div className="mx-3">
                <div className="text-textColor font-light ">
                  Dhruv Kurliye
                </div>
                <div className="text-gray-400 font-medium text-sm  mb-2 ">
                  Employee
                </div>
                <div className="text-gray-400 font-light text-sm  ">
                  2 Min Ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperuserLayout>
  );
};

export default Dashboard;
