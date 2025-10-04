import * as z from "zod";

// ✅ Zod schema for validation
export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Terms & Privacy Policy" }),
  }),
});

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8).max(128),
});

export const VendorLoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8).max(128),
});

// --- Schema ---
export const VendorRegisterSchema = z.object({
  name: z.string().min(2, "Vendor name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(8, "Phone is required"),
  storeName: z.string().min(2, "Store name is required"),
  description: z.string().min(5, "Description is required"),
  logo: z.string().url("Enter a valid logo URL").optional(),
  banner: z.string().url("Enter a valid banner URL").optional(),
});