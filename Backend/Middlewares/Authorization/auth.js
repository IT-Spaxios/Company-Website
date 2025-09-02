import CustomError from "../../Helpers/Error/CustomError.js";
import User from "../../models/user.js";  
import jwt from "jsonwebtoken";
import asyncErrorWrapper from "express-async-handler";
import { isTokenIncluded, getAccessTokenFromHeader } from "../../Helpers/auth/tokenHelpers.js";

const { verify } = jwt;

export const getAccessToRoute = asyncErrorWrapper(async (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;

  if (!isTokenIncluded(req)) {
    return next(new CustomError("You are not authorized to access this route", 401));
  }

  const accessToken = getAccessTokenFromHeader(req);

  const decoded = verify(accessToken, JWT_SECRET_KEY);

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new CustomError("You are not authorized to access this route", 401));
  }

  req.user = user;

  next();
});


