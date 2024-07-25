import Application from "../../../../DB/models/Application.js";
import Company from "../../../../DB/models/Company.js";
import Job from "../../../../DB/models/Job.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import AppError from "../../../utils/Error.js";
import xl from 'excel4node'

//add company by company hr
export const addCompany = asyncHandler(async (req, res, next) => {
    if (req.user.rol == "company_HR") {
        const companyExist = await Company.findOne({
            $or: [
                { companyName: req.body.companyName },
                { companyEmail: req.body.companyEmail },
            ],
        });
        if (companyExist) {
            return next(new AppError("company already exist", 409));
        }
        req.body.companyHR = req.user._id;
        const company = await Company.insertMany([req.body]);
        return res.status(201).json({ message: "done", company });
    }
    return next(new AppError("user not a company_HR", 400));
});
//update company by company hr
export const updateCompany = asyncHandler(async (req, res, next) => {
    if (req.user.rol == "company_HR") {
        const conflict = await Company.findOne({
            $or: [
                { companyName: req.body.companyName },
                { companyEmail: req.body.companyEmail },
            ],
        });
        if (conflict) {
            return next(new AppError("conflict company", 409));
        }
        const company = await Company.findOneAndUpdate(
            { companyHR: req.user._id, _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!company) {
            return next(new AppError("company not found", 404));
        }
        return res.status(200).json({ message: "done", company });
    }
    return next(new AppError("user not a company_HR", 400));
});
//delete company by company hr and job related
export const deleteCompany = asyncHandler(async (req, res, next) => {
    if (req.user.rol == "company_HR") {
        const company = await Company.findOneAndDelete({
            companyHR: req.user._id,
            _id: req.params.id,
        });
        if (!company) {
            return next(new AppError("company not found", 404));
        }
        const job = await Job.findByIdAndDelete({ addedBy: req.user._id });
        const applytoJob = await Application.findByIdAndDelete({ jobId: job._id });
        return res.status(200).json({ message: "done", company, job });
    }
    return next(new AppError("user not a company_HR", 400));
});
//company hr get company data and return all jobs related to this company
export const getCompany = asyncHandler(async (req, res, next) => {
    if (req.user.rol == "company_HR") {
        const company = await Company.findOne({
            companyHR: req.user._id,
            _id: req.params.id,
        });
        if (!company) {
            return next(new AppError("company not found", 404));
        }
        const jobRelatedCompany = await Job.find({ companyId: company._id });
        return res
            .status(200)
            .json({
                message: "done",
                company,
                jobRelatedThisCompany: jobRelatedCompany,
            });
    }
    return next(new AppError("user not a company_HR", 400));
});
//Search for a company with a name
export const searchCompany = asyncHandler(async (req, res, next) => {
    const { companyName = "" } = req.query;
    const filter = {};
    if (companyName) {
        filter.companyName = { $regex: new RegExp(companyName, "i") };
    }
    const company = await Company.find(filter);
    if (!company) {
        return next(new AppError("company not found", 404));
    }
    return res.json({ message: "done", company });
});
//Get all applications for specific Job
export const allApplicationsForSpecificJob = asyncHandler(
    async (req, res, next) => {
        if (req.user.rol == "company_HR") {
            const { jobId } = req.params;
            const job = await Job.findById({ _id: jobId });
            if (!job) {
                return next(new AppError("job not found", 404));
            }
            const applications = await Application.find({ jobId: job._id })
                .populate("userId", "-password -__v")
                .exec();
            return res.json({ message: "done", applications });
        }
        return next(new AppError("user not a company_HR", 400));
    }
);

//Get Applications for a Company on a Specific Day

export const ApplicationsforCompanyonSpecificDay = asyncHandler(
    async (req, res, next) => {
        if (req.user.rol == "company_HR") {
            const { companyId, date } = req.body;
            const company = await Company.findById({ _id: companyId })
            if (!company) {
                return next(new AppError("company not found", 404));
            }
            const jobs = await Job.find({ companyId: company._id })
            if (!jobs) {
                return next(new AppError("job not found", 404));
            }
            const jobIds = jobs.map(job => job._id);
            const startDate = new Date(date);
            startDate.setUTCHours(0, 0, 0, 0);
            const endDate = new Date(date);
            endDate.setUTCHours(23, 59, 59, 999);
            const applications = await Application.find({
                jobId: { $in: jobIds },
                createdAt: { $gte: startDate, $lt: endDate }
            }, { _id: 1, createdAt: 1, jobId: 1, userId: 1 }).populate(['jobId', 'userId']).exec();
            return res.json({ message: "done", applications });
        }
        return next(new AppError("user not a company_HR", 400));
    }
);


