import jwt from "jsonwebtoken";
import User from "../../../../DB/models/User.js";
import bcrybtjs from "bcryptjs";
import { customAlphabet } from "nanoid";
import sendEmail from "../../../utils/sendEmail.js";
import AppError from "../../../utils/Error.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import Company from "../../../../DB/models/Company.js";
import Job from "../../../../DB/models/Job.js";
import Application from "../../../../DB/models/Application.js";

//Sign Up
export const signUp = asyncHandler(async (req, res, next) => {
    const { password, email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new AppError("email already exist", 409));
    }
    req.body.password = bcrybtjs.hashSync(password, 8);
    const user = await User.insertMany([req.body]);
    return res.status(201).json({ message: "done", user });
});
//login
export const login = asyncHandler(async (req, res, next) => {
    const { EmailorPhoneNumber, password } = req.body;
    const userExist = await User.findOneAndUpdate(
        {
            $or: [
                { email: EmailorPhoneNumber },
                { mobileNumber: EmailorPhoneNumber },
                { recoveryEmail: EmailorPhoneNumber },
            ],
        },
        { status: "online" }
    );
    if (!userExist) {
        return next(new AppError("invalid email or password", 400));
    } else {
        const match = bcrybtjs.compareSync(password, userExist.password);
        if (!match) {
            return next(new AppError("invalid password", 400));
        }
        const token = jwt.sign(
            {
                email: userExist.email,
                _id: userExist._id,
                mobileNumder: userExist.mobileNumber,
                rol: userExist.rol,
            },
            "signtureAyhagaaa"
        );
        return res.status(200).json({ message: "done", token });
    }
});
//update user and make make sure that the new data doesn’t conflict with any existing data
export const updateUser = asyncHandler(async (req, res, next) => {
    const { email, mobileNumber } = req.body;
    const conflictemail = await User.findOne({ email });
    const conflictPhone = await User.findOne({ mobileNumber });
    if (conflictemail) {
        return next(new AppError("conflict email", 400));
    }
    if (conflictPhone) {
        return next(new AppError("conflict mobileNumber", 400));
    }
    const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
        new: true,
    });
    if (!user) {
        return next(new AppError("user not found", 404));
    } else if (user.status == "ofline") {
        return next(new AppError("user is ofline", 400));
    }
    return res.status(200).json({ message: "done", user });
});
//delete user
//if rol is user delete his apply to job
//if rol is company hr delete his company and company's jobs
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOneAndDelete({ _id: req.user._id });
    if (!user) {
        return next(new AppError("user not found", 404));
    }
    if (user.status == "ofline") {
        return next(new AppError("user is ofline", 400));
    }
    if (req.user.rol == "company_Hr") {
        const company = await Company.findByIdAndDelete({ companyHR: req.user._id });
        const job = await Job.findByIdAndDelete({ addedBy: req.user._id });
        const applytoJob = await Application.findByIdAndDelete({jobId :job._id });
    }
    if (req.user.rol == "user") {
        const applytoJob = await Application.findByIdAndDelete({
            userId: req.user._id,
        });
    }
    return res.status(200).json({ message: "done", user });
});
//Get user account data
export const getUserData = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
        return next(new AppError("user not found", 404));
    } else if (user.status == "ofline") {
        return next(new AppError("user is ofline", 400));
    }
    return res.status(200).json({ message: "done", user });
});
//Get all accounts associated to a specific recovery Email
export const getAllAccounts = asyncHandler(async (req, res, next) => {
    const accounts = await User.find({ recoveryEmail: req.params.email });
    if (!accounts) {
        return next(new AppError("email not found", 404));
    }
    return res.status(200).json({ message: "done", accounts });
});
//Get profile data for another user
export const getAnthorUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return next(new AppError("user not found", 404));
    }
    return res.status(200).json({
        user: "done",
        user: {
            id: user._id,
            email: user.email,
            userName: user.userName,
            rol: user.rol,
            DOB: user.DOB,
        },
    });
});
//Update password
export const updatePassword = asyncHandler(async (req, res, next) => {
    const { email, currentpassword, newpassword } = req.body;
    const userExist = await User.findOne({ email,_id:req.user._id });
    if (!userExist) {
        return next(new AppError("email not found", 400));
    } else {
        const match = bcrybtjs.compareSync(currentpassword, userExist.password);
        if (!match) {
            return next(new AppError("invalid password", 400));
        }
        req.body.newpassword = bcrybtjs.hashSync(newpassword, 8);
        userExist.password = req.body.newpassword;
        const token = jwt.sign(
            {
                email: userExist.email,
                _id: userExist._id,
                mobileNumder: userExist.mobileNumber,
                rol: userExist.rol,
            },
            "signtureAyhagaaa"
        );
        return res.status(200).json({ message: "done", userExist, token });
    }
});
//Forget password and send email
export const forgetpass = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
        return next(new AppError("email not found", 404));
    }
    const code = customAlphabet("0123456789", 4);
    req.body.code = code();
    const user = await User.updateMany({ email }, req.body);
    sendEmail({ to: email, html: `<h1>${req.body.code}</h1>` });
    return res
        .status(201)
        .json({ message: "check you email and reset password" });
});

//confirm email and reset password
export const confirmEmail = async (req, res) => {
    const { code, email, newpassword } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
        return next(new AppError("email not found", 404));
    }
    if (code) {
        if (userExist.code != code) {
            return res.status(400).json({ message: "invalid code" });
        }
        const user = await User.updateMany({ email }, { code: null });
        req.body.newpassword = bcrybtjs.hashSync(newpassword, 8);
        userExist.password = req.body.newpassword;
        return res.status(200).json({ message: "password echange", userExist });
    }
    return res.status(400).json({ message: "invalid code" });
};
