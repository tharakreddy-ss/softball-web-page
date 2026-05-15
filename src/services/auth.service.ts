import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { signToken } from "@/lib/auth";
import { User } from "@/models/User";
import type { LoginInput, RegisterInput } from "@/lib/validations";

export async function registerUser(data: RegisterInput) {
  await connectDB();
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(data.password, 12);
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashed,
    role: data.role ?? "viewer",
  });

  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
  };
}

export async function loginUser(data: LoginInput) {
  await connectDB();
  const user = await User.findOne({ email: data.email });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
  };
}
