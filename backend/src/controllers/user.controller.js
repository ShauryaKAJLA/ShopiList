
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.util.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/AsyncHandler.util.js";



const userSignup = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "Username and password are required")
    }
    const existingUser = await User.findOne({ username });
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        throw new ApiError(400, 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.')
    }
    if (existingUser) {
        throw new ApiError(400, "Username already exists")
    }


    const user = await User.create({ username, password })
    if (!user) {
        throw new ApiError(500, "Failed to create user")
    }
    res.status(200).json(new ApiResponse({}, 200, "User created Successfully"))
}
)
const userLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new ApiError(400, "Username and password are required")
    }
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
        throw new ApiError(400, "No user exists with this username")
    }
    const check = await existingUser.isPasswordCorrect(password);
    if (!check) {
        throw new ApiError(401, "Password does not matches")
    }
    const accessToken = await existingUser.generateAccessToken();

    if (!accessToken) {
        throw new ApiError(500, "Error while user login try again shortly")
    }

    return res.status(200).cookie("accessToken", accessToken).json(new ApiResponse({ username, accessToken }, 200, "Successfully logged in"))
})

export { userSignup, userLogin }; 