"use client";
import React, { useEffect, useState } from "react";
import SuperuserLayout from "@/app/components/layouts/superuserlayout/page";
import AlertsList from "@/app/components/common/alerts/page";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FiAlertOctagon } from "react-icons/fi";
import Modal from "react-modal";
import AddAlert from "@/app/components/admin/addalert/page";
import { useDispatch } from "react-redux";
import { fetchAlerts } from "@/store/reducer/admin/fetchAlertReducer";

const Alerts = () => {
  const [alertModal, setAlertModal] = useState(false);
  const [alerts, setAlerts] = useState([]);

  // Function to open the Alert modal
  const openModalAlert = () => {
    setAlertModal(true);
  };

  // Function to close the Alert modal
  const closeModalAlert = () => {
    setAlertModal(false);
  };

  // Custom header for the Alert modal
  const ModalHeaderAlert = () => (
    <div
      className="p-2 border-b border-gray-300"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <BreadCrumb text="Add Alert" />

      <button
        onClick={closeModalAlert}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        x
      </button>
    </div>
  );

  const dispatch = useDispatch();
  //  to fetch alerts
  useEffect(() => {
    // Dispatch the action to fetch alerts
    dispatch(fetchAlerts())
      .then((response) => {
        // Assuming response.data is an array of alerts
        setAlerts(response.data.alerts);
      })
      .catch((error) => {
        console.error("Error fetching alerts:", error);
      });
  }, [dispatch]);


  return (
    <SuperuserLayout>
      <div>
        <div className="bg-card p-2 m-2 rounded-lg mb-5">
          <div className="flex justify-between items-center my-2 ">
            <BreadCrumb text="Alerts" />
            <button
              className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
              onClick={openModalAlert}
            >
              <FiAlertOctagon className="text-white mx-2" /> Add Alert
            </button>
          </div>
        </div>
        {alerts.length > 0 ? (
          <AlertsList alerts={alerts} />
        ) : (
          <p className="mx-2 text-xs">Loading...</p>
        )}
      </div>

      {/* Add Alert */}
      <Modal
        isOpen={alertModal}
        onRequestClose={closeModalAlert}
        contentLabel="Alert Modal"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={true}
        // Style the modal (optional)
        style={{
          content: {
            margin: "auto",
            borderRadius: "8px",
            zIndex: 10,
          },
          overlay: {
            zIndex: 9,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {/* Use the custom header */}
        <ModalHeaderAlert />

        {/* Content inside the modal */}
        <AddAlert />
      </Modal>
    </SuperuserLayout>
  );
};

export default Alerts;
