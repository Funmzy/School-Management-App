import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IStakeholder extends mongoose.Document {
  firstname: string;
  lastname: string;
  middlename: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string | undefined;
  address: string;
  DOB: Date;
  phoneNo: String;
  nationality: string;
  stateOfOrigin: string;
  user: String;
  img: string;
  admin: string;
}

const StakeholderSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "A user must have a firstname"],
    trim: true,
    minlength: [4, "A user firstname must have >= 4 characters"],
    maxlength: [50, "A user firstname must have >= 50 characters"],
    validate: [validator.isAlpha, "firstname must only contain chars"],
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: [4, "A user firstname must have >= 4 characters"],
    maxlength: [50, "A user firstname must have <= 50 characters"],
    validate: [validator.isAlpha, "lastname must only contain chars"],
  },
  middlename: {
    type: String,
    required: true,
    trim: true,
    minlength: [4, "A user firstname must have >= 4 characters"],
    maxlength: [50, "A user firstname must have <= 50 characters"],
    validate: [validator.isAlpha, "middlename must only contain chars"],
  },
  gender: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "A user password must have >= 6 characters"],
    maxlength: [50, "A user password must have <= 50 characters"],
    select: false,
  },

  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (this: IStakeholder) {
        return this.confirmPassword === this.password;
      },
      message: "Passwords are not the same",
    },
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },

  DOB: {
    type: Date,
    required: true,
  },

  phoneNo: {
    type: Number,
    required: true,
    minlength: 11,
    maxlength: 11,
  },

  nationality: {
    type: String,
    required: true,
    default: "Nigerian",
  },
  stateOfOrigin: {
    type: String,
    required: true,
  },

  user: {
    type: String,
    enum: ["teacher", "student", "parent"],
  },

  img: {
    data: Buffer,
    contentType: String,
  },

  admin: {
    type: Boolean,
    default: false,
  },
});

StakeholderSchema.pre<IStakeholder>("save", async function (next) {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  const user = this;
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete the passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

StakeholderSchema.methods.comparePassword = async function (
  canditatePassword: string
) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

export default mongoose.model<IStakeholder>("Stakeholder", StakeholderSchema);
