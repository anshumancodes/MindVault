import { NextResponse, NextRequest } from "next/server";
import signUpSchema from "@/schemas/signUpSchema";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/user";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const { name, username, email, password } = {
      ...body,
      name: body.name?.trim(),
      username: body.username?.trim(),
      email: body.email?.toLowerCase().trim(),
    };

    const parsedData = signUpSchema.safeParse({
      name,
      username,
      email,
      password,
    });
    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: "validation failed!",
          errors: parsedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const doesUserExist = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (doesUserExist) {
      return NextResponse.json(
        {
          message:
            doesUserExist.email === email
              ? "Email already in use"
              : "Username already taken",
        },
        { status: 400 }
      );
    }

    const newUser = await UserModel.create({
      name,
      username,
      email,
      password, // my schema got a pre function that hashes it there
      provider: "credentials",
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: { id: newUser._id, name, username, email },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected server error: couldnt create user!",
      },
      {
        status: 500,
      }
    );
  }
}
