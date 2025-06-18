import UserModel from "@/model/User.model";
import connectDB from "@/lib/connectdb";
import signUpSchema from "@/schemas/signUpSchema";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { name, username, email, password } = await req.json();

    const validateUserSignUp = signUpSchema.safeParse({
      name,
      username,
      email,
      password,
    });

    const doesUserExist = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (doesUserExist) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        {
          status: 409,
        }
      );
    }

    if (!validateUserSignUp.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors: validateUserSignUp.error.flatten(),
        },
        { status: 400 }
      );
    }

    const newUser = new UserModel({
      name,
      username,
      email,
      password,
    });
    await newUser.save();
    return Response.json(
      {
        success: true,
        message: "User created successfully",
        data: newUser,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error creating a new user [at POST]:", error);
    return Response.json(
      {
        success: false,
        message: "Error creating a new user",
      },
      {
        status: 500,
      }
    );
  }
}


