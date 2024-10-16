import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Provide Job Title"],
    minLength: [3, "Job Title Must Contain At Least 3 Characters!"],
    maxLength: [50, "Job Title Must Not Exceed 50 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please Provide Job Description"],
    minLength: [10, "Job Description Must Contain At Least 10 Characters!"],
    maxLength: [20000, "Job Description Must Not Exceed 20000 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Job Category Is Required!"],
  },
  country: {
    type: String,
    required: [true, "Country Is Required!"],
  },
  city: {
    type: String,
    required: [true, "JOb City Is Required!"],
  },
  location: {
    type: String,
    required: [true, "Please Provide Exact Location!"],
    minLength: [10, "Job Location Must Contain At Least 10 Characters!"],
    maxLength: [100, "Job Location Must Not Exceed 100 Characters!"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Fixed Salary Must Contain At Least 4 Digits!"],
    maxLength: [10, "Fixed Salary Must Not Exceed 10 Digits!"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary From Must Contain At Least 4 Digits!"],
    maxLength: [10, "Salary From Must Not Exceed 10 Digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "SalaryTo Must Contain At Least 4 Digits!"],
    maxLength: [10, "SalaryTo Must Not Exceed 10 Digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
