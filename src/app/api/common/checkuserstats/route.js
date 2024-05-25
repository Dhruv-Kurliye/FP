import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "../../../../../backend/models/User";
import AdminModel from "../../../../../backend/models/Admin";
import connectDb from "../../../../../backend/middleware/db";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const fetchUserDetailsHandler = async (request) => {
  try {
    // Obtain the token from the request headers
    const token = request.headers.get("Authorization");
    if (!token) {
      return NextResponse.json(
        {
          message: "Authentication failed. Token not provided.",
        },
        {
          status: 401,
        }
      );
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid token.",
        },
        {
          status: 401,
        }
      );
    }

    // Check if the user is an admin or a regular user
    if (decodedToken.isAdmin) {
      // If admin, fetch admin details
      const admin = await AdminModel.findOne({
        email: decodedToken.adminEmail,
      });
      if (!admin) {
        return NextResponse.json(
          {
            message: "Admin not found",
          },
          {
            status: 404,
          }
        );
      }

      // Return admin details
      return NextResponse.json(
        {
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
        },
        {
          status: 200,
        }
      );
    } else {
      // If regular user, fetch user details
      const user = await UserModel.findOne({ email: decodedToken.userEmail });
      if (!user) {
        return NextResponse.json(
          {
            message: "User not found",
          },
          {
            status: 404,
          }
        );
      }

      // Return user details
      return NextResponse.json(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch user details",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = connectDb(fetchUserDetailsHandler);