import { Schema, model, models } from "mongoose";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  email: string;
  password?: string;
  passwordConfirmation?: string;
  role?: Role;
  deleted?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Users = models.users || model<IUser>("users", userSchema);
