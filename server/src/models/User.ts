import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface to define the properties of a User document
export interface IUser extends Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware: Before saving a new user, hash their password
UserSchema.pre<IUser>('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('passwordHash')) {
      return next();
    }
    
    try {
      const salt = await bcrypt.genSalt(10);
      this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
      next();
    } catch (error: any) {
      next(error);
    }
  });
  
  // Method to compare a given password with the stored hash
  UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  };
  
  // Create and export the User model
  const User = mongoose.model<IUser>('User', UserSchema);
  export default User;