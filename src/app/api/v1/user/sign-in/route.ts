import connectDB from "@/lib/connectdb";
import signinSchema from "@/schemas/signinSchema";
import UserModel from "@/model/User.model";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { username, email, password } = await req.json();

    const identifier = email || username;

    const validateUserSignIn = signinSchema.safeParse({
      identifier,
      password,
    });

    if (!validateUserSignIn.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors: validateUserSignIn.error.flatten(),
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (!user.password) {
      return Response.json(
        {
          success: false,
          message: "User has no password set",
        },
        { status: 400 }
      );
    }
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return Response.json(
        {
          success: false,
          message: "Incorrect password",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sign-in:", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
