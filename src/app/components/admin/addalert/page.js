"use client";
import { addAlert } from "@/store/reducer/admin/addAlertReducer";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAlert = () => {
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

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(addAlert(data)).then((response) => {
      showAlertStatusToast("Alert Added Successfully");
    });
  };
  return (
    <div>
      <form className="mx-2  w-full " onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <label
            for="first_name"
            className="block mb-2 text-sm font-medium text-textColor "
          >
            Alert Type
          </label>

          <select
            id="status"
            className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
            {...register("status")}
          >
            <option selected>Choose Alert Type</option>
            <option value="Success">Success</option>
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Danger">Danger</option>
          </select>
        </div>
        <div className="w-full my-4 ">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-textColor "
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
            {...register("title")}
          />
        </div>

        <div className="mb-4">
          <label
            for="message"
            className="block mb-2 text-sm font-medium text-textColor "
          >
            Message
          </label>
          <textarea
            rows={4}
            id="message"
            className="bg-card border border-card text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
            {...register("message")}
          />
        </div>

        <div className="lg:absolute lg:bottom-2 lg:right-2 flex justify-end">
          <button className="mx-1 text-white text-sm text-center bg-textColor p-2 rounded-lg">
            Cancel
          </button>
          <button
            className="mx-1  text-white text-sm text-center bg-themeColor p-2 rounded-lg"
            type="submit"
          >
            Request Now
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddAlert;
