import { User } from "../models/user.mode";
import ApiError from "../utils/ApiError.util";
import { asyncHandler } from "../utils/AsyncHandler.util";
import jwt from 'jsonwebtoken'


export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const accessToken = req.body?.accessToken || req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!accessToken) {
            throw new ApiError(401, "Unauthorized request")
        }
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id)
        if (!user) {
            throw new ApiError(400, "Invalid Access Token")
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Error in Authentication", error)
    }
})