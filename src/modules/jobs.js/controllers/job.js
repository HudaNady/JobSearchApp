import Application from "../../../../DB/models/Application.js";
import Company from "../../../../DB/models/Company.js";
import Job from "../../../../DB/models/Job.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/Error.js";
//add job by company hr
export const addJob = asyncHandler(async (req, res, next) => {
    if (req.user.rol == "company_HR") {
        const company = await Company.findOne({ companyHR: req.user._id });
        if (!company) {
            return next(new AppError("company not found", 404));
        }
        req.body.addedBy = req.user._id;
        req.body.companyId = company._id;
        const job = await Job.insertMany([req.body]);
        return res.status(201).json({ message: "done", job });
    }
    return next(new AppError("user not a company_HR", 400));
});
//ubdate job by hr
export const updateJob = asyncHandler(async (req, res, next) => {
    if (req.user.rol == "company_HR") {
        const job = await Job.findOneAndUpdate(
            { addedBy: req.user._id, _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!job) {
            return next(new AppError("job not found ", 404));
        }
        return res.status(200).json({ message: "done", job });
    }
    return next(new AppError("user not a company HR", 400));
});
//delete job by company hr and her application
export const deleteJob = asyncHandler(async (req, res, next) => {
    if (req.user.rol == "company_HR") {
        const job = await Job.findOneAndDelete({
            addedBy: req.user._id,
            _id: req.params.id,
        });
        if (!job) {
            return next(new AppError("job not found", 404));
        }
        const applytoJob = await Application.findByIdAndDelete({ jobId: job._id });
        return res.status(200).json({ message: "done", job });
    }
    return next(new AppError("user not a company_HR", 400));
});
//Get all Jobs with their company’s information.
export const getAllJobs = asyncHandler(async (req, res, next) => {
    const jobs = await Job.find().populate("companyId");
    if (!jobs) {
        return next(new AppError("jobs not found", 404));
    }
    return res.status(200).json({ message: "done", jobs });
});
//Get all Jobs for a specific company.
export const getAllJobForCompany = asyncHandler(async (req, res, next) => {
    const company = await Company.findOne({ companyName: req.query.name });
    if (!company) {
        return next(new AppError("company not found", 404));
    }
    const jobs = await Job.find({ companyId: company._id }).populate("companyId");
    if (!jobs) {
        return next(new AppError("jobs not found", 404));
    }
    return res.status(200).json({ message: "done", jobs });
});
//Get all Jobs that match the following filters
export const getfilterJobs = asyncHandler(async (req, res, next) => {
    const {
        workingTime,
        jobLocation,
        seniorityLevel,
        jobTitle,
        technicalSkills,
    } = req.query;
    const filters = {};
    if (workingTime) {
        filters.workingTime = workingTime;
    }
    if (jobLocation) {
        filters.jobLocation = jobLocation;
    }
    if (seniorityLevel) {
        filters.seniorityLevel = seniorityLevel;
    }
    if (jobTitle) {
        filters.jobTitle = { $regex: new RegExp(jobTitle, "i") };
    }
    if (technicalSkills) {
        filters.technicalSkills = { $in: technicalSkills.split(",") };
    }
    const jobs = await Job.find(filters).populate("companyId");
    if (!jobs) {
        return next(new AppError("jobs not found", 404));
    }
    return res.status(200).json({ message: "done", jobs });
});
//user add apply to job
export const applyToJob = asyncHandler(async (req, res, next) => {
    if (req.user.rol == "user") {
        req.body.userId = req.user._id;
        req.body.userResume = req.file.filename;
        const applyJob = await Application.insertMany([req.body]);
        return res.status(201).json({ message: "done", applyJob });
    }
    return next(new AppError("not user", 400));
});
