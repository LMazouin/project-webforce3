import { Schema, model, models } from "mongoose";

export interface IUser {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  roles: Role[];
  deleted: boolean;
  createdAt: Date;
  updateAt: Date;
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
    roles: [
      {
        type: String,
        enum: [Role.ADMIN, Role.USER],
      },
    ],
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
