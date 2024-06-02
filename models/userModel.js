const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");
const { type } = require("os");
const userSchema = new mongoose.Schema(
  {
    name: {
      required: [true, "نام مورد نیاز است"],
      type: String,
    },
    photo: {
      type: String,
      default:'default.jpg'
    },
    email: {
      type: String,
      validate: [validator.isEmail, "ایمیل شما مورد تایید نیست"],
      required: [true, "ایمیل را وارد کنید"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "پسورد مورد نیاز است"],
      minlength: [8, "پسورد شما باید بیش از ۸ کاراکتر باشد"],
      select: false,
      // it will never be visible to the clients
    },
    passwordConfirm: {
      type: String,
      required: [true, "لطفا پسورد خود را تایید کنید"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "پسورد و تکرار آن یکسان نیست",
      },
    },
    changedPasswordAt: Date,
    role: {
      enum: ["admin", "user",'writer'],
      type: String,
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
    signedAt:{
      type:Date,
      default:Date.now()
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
);
userSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'user',
  localField: '_id',
})
userSchema.methods.changedPasswordAfter = function (jwtiat) {
  if (this.changedPasswordAt) {
    const passwordChanged = parseInt(
      this.changedPasswordAt.getTime() / 1000,
      10
    );
    return passwordChanged > jwtiat;
  }
  return false;
};
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.changedPasswordAt = Date.now();
  next();
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  } else {
    next();
  }
});

userSchema.methods.correctPassword = async function (
  orgPassword,
  hashedPassword
) {
  return await bcrypt.compare(orgPassword, hashedPassword);
};
userSchema.pre(/^find/,function(next){
  this.find({isActive:{$ne:false}})
  next()
})
userSchema.methods.createResetTokenPassword = function () {
  const resetToken = crypto.randomBytes(12).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 1000 * 60;
  return resetToken;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
