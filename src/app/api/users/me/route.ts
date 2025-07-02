import { getDataFromToken } from "@/helpers/GetDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
   

    try {
        const userID = await getDataFromToken(request);
        const user = await User.findById(userID).select("-password -__v");
        return NextResponse.json({
             message : "User found",
             data: user
        }, { status: 200 });

    } catch (error:any) {
        return NextResponse.json({ error:error.message }, { status: 500 });
    }
}
