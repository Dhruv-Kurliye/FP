"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { userLogin } from "@/store/reducer/user/userLoginReducer";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Home = () => {
  const router = useRouter();
  const [loginVal, setLoginVal] = useState("Login");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [errorVal, setErrorVal] = useState("");

  const onSubmit = (data) => {
    setErrorVal("");
    setLoginVal("please wait...");
    dispatch(userLogin(data))
      .then((response) => {
        // Extract the response data from the 'data' property
        const responseData = response.data;
        const { token, teamLead } = responseData;

        // Store the token and teamLead status in the local storage
        localStorage.setItem("token", token);
        localStorage.setItem("teamLead", teamLead);

        // Redirect to the appropriate dashboard based on the teamLead status
        if (teamLead) {
          setLoginVal("Login");
          router.push("http://localhost:3000/supervisor/dashboard");
        } else {
          setLoginVal("Login");
          router.push("http://localhost:3000/employee/dashboard");
        }
      })
      .catch((error) => {
        setLoginVal("Login");
        setErrorVal("Invalid credentials");
        console.log("Login failed:", error.message);
      });
  };

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
                    id="userEmail"
                    {...register("userEmail")}
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
                    id="userPassword"
                    {...register("userPassword")}
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
                  className="my-2 w-full text-white bg-themeColor focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  style={{backgroundColor: '#222b3c'}}
                >
                  {loginVal}
                </button>
              </form>
              <div className="w-full">
                <Link
                  href="/admin/login"
                  className="my-2 w-full text-white bg-themeColor focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  style={{backgroundColor: '#222b3c'}}
                >
                  Go to admin login page
                </Link>
              </div>
            </div>
          </div>
          <div>
            <img style={{height:'400px', width:'400px', margin: '100px', marginLeft: '150px'}} src="./DRDO.png"></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
