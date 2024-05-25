"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/store/reducer/admin/adminLoginReducer";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [loginVal, setLoginVal] = useState("Login");
  const [errorVal, setErrorVal] = useState("");

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setErrorVal("");
    setLoginVal("please wait...");
    dispatch(adminLogin(data))
      .then((response) => {
        // Extract the response data from the 'data' property
        const responseData = response.data;
        const { token, isAdmin } = responseData;

        // Store the token and teamLead status in the local storage
        localStorage.setItem("token", token);
        localStorage.setItem("admin", isAdmin);

        // Redirect to the appropriate dashboard based on the teamLead status
        if (isAdmin) {
          setLoginVal("Login");
          router.push("http://localhost:3000/admin/dashboard");
        } else {
          setLoginVal("Login");
          router.push("http://localhost:3000/");
        }
      })
      .catch((error) => {
        setLoginVal("Login");
        setErrorVal("Invalid credentials");
        console.log("Login failed:", error.message);
      });
  };
  // if admin is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("http://localhost:3000/admin/dashboard");
    }
  }, []);

  return (
    <section className="bg-card ">
      <div className="flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex ">
          <div className=" w-full lg:w-1/2 bg-white shadow  md:mt-0 xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-textColor md:text-2xl ">
                UPASTHITI
              </h1>
              <div className="md:flex">
              <h3><strong>"Balasya Mulam Vigyanam"</strong> — The source of strength is science-drives the nation in peace and war.</h3>
              </div>

              <div className="flex items-center">
                
              </div>

              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-card focus:ring-3 focus:ring-blue-300"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label for="remember" className="text-gray-500 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-themeColor hover:underline "
                    style={{color: '#222b3c'}}
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-themeColor focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  style={{backgroundColor: '#222b3c'}}
                >
                  {loginVal}
                </button>
                <div className="w-full">
                  <Link
                    href="/admin/register"
                    className="my-2 w-full text-white bg-themeColor focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    style={{backgroundColor: '#222b3c'}}
                  >
                    Register as admin
                  </Link>
                </div>
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

export default Login;
