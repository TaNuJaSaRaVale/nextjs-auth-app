import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()
export async function POST(request: NextRequest) {
  console.log("Starting login.....")
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log("Request Body:", reqBody);

        // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            console.log("User not found");
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
        console.log("User exists");

        // Verify password
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            console.log("Invalid password");
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(user);

      //create token data
      const tokenData = {
          id: user._id,
          email: user.email,
          username: user.username
      }
      //create token 
      const secret = process.env.TOKEN_SECRET;
      console.log("Token Secret:", secret);
if (!secret) {
  console.error("TOKEN_SECRET is not defined in .env");
  return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
}

const token = await jwt.sign(tokenData, secret, { expiresIn: '1d' });
      console.log("Token created successfully");

      const response = NextResponse.json({
        message:"Login successful",
        success:true,
      })
      response.cookies.set("token", token, {
        httpOnly: true,
        
      })
      return response;

     

    } catch (error: any) {
    console.error("Error during login:", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}