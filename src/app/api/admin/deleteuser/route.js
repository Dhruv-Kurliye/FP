import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import UserModel from "../../../../../backend/models/User";

const deleteUserHandler = async (req) => {
  try {
    const { email } = await req.json();

    // Find the user by email
    const user = await UserModel.findOne({ email });

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

    // Delete the user
    console.log("User before deletion:", user);
    const deletedUser = await UserModel.deleteOne({ email });
    console.log("User after deletion:", deletedUser);

    return NextResponse.json(
      {
        message: "User deleted successfully",
        deletedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        message: "Failed to delete user",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(deleteUserHandler);
