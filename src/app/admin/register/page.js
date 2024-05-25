"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { adminRegister } from "@/store/reducer/admin/adminRegisterReducer";

const Register = () => {
  const router = useRouter();
  const [registerVal, setRegisterVal] = useState("Register");
  const [errorVal, setErrorVal] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setErrorVal("");
    setRegisterVal("Please wait...");
    dispatch(adminRegister(data))
      .then((response) => {
        // Extract the response data from the 'data' property
        const responseData = response.data;
        const { token, isAdmin } = responseData;

        // Store the token and isAdmin status in the local storage
        localStorage.setItem("token", token);
        localStorage.setItem("admin", isAdmin);

        // Redirect to the appropriate dashboard based on the isAdmin status
        if (isAdmin) {
          setRegisterVal("Register");
          router.push("http://localhost:3000/admin/dashboard");
        } else {
          setRegisterVal("Register");
          router.push("http://localhost:3000/");
        }
      })
      .catch((error) => {
        setRegisterVal("Register");
        setErrorVal("Invalid credentials");
        console.log("Registration failed:", error.message);
      });
  };
  // if admin is already logged in or registered
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("http://localhost:3000/admin/dashboard");
    }
  }, []);

  return (
    <section className="bg-card">
      <div className="flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex">
          <div className="w-full lg:w-1/2 bg-white shadow md:mt-0 xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-textColor md:text-2xl ">
                Admin Registration
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    for="firstName"
                    className="block mb-2 text-sm font-medium text-textColor "
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className="bg-card border border-gray-300 text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    placeholder="John"
                    required
                  />
                </div>

                <div>
                  <label
                    for="lastName"
                    className="block mb-2 text-sm font-medium text-textColor "
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className="bg-card border border-gray-300 text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    placeholder="Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-textColor "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="bg-card border border-gray-300 text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    placeholder="John@Doe.com"
                    required
                  />
                </div>

                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-textColor "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className="bg-card border border-gray-300 text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    placeholder="••••••••"
                    required
                  />
                </div>
                {errorVal !== "" && (
                  <div className="my-2">
                    <span className="text-red-500 text-xs">{errorVal}</span>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-themeColor focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  style={{backgroundColor: '#222b3c'}}
                >
                  {registerVal}
                </button>
              </form>
            </div>
          </div>
          <div>
            <img style={{height:'400px', width:'400px', margin: '100px', marginLeft: '150px'}} src="../DRDO.png"></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
