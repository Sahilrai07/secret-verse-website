import z from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  salePrice: z.number().nonnegative().optional(),
  minCoinse: z.number().nonnegative().optional(),
  coinPrice: z.number().nonnegative(),
  image: z.string().url(),
  isFeatured: z.coerce.boolean().optional(),
});

export const adminUserSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.number({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a number",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const adminVendorSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    dateOfBirth: z.coerce.date({
      required_error: "Date of birth is required",
      invalid_type_error: "Enter a valid date",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const uploadRequestionSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export const ContestStatusEnum = z.enum(["ACTIVE", "ENDED", "UPCOMING"], {
  required_error: "Status is required",
  invalid_type_error: "Invalid contest status",
});

export const ContestTimeTypeEnum = z.enum(
  ["DAILY", "WEEKLY", "MONTHLY", "SPECIAL"],
  {
    required_error: "Category is required",
    invalid_type_error: "Invalid contest category",
  }
);

export const contestSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title must not be empty"),

  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters long"),

  longDescription: z
    .string({ required_error: "Long description is required" })
    .min(20, "Long description must be at least 20 characters long"),

  image: z
    .string({ required_error: "Image URL is required" })
    .url("Image must be a valid URL"),

  prizePool: z
    .number({ required_error: "Prize pool is required" })
    .int("Prize pool must be an integer")
    .nonnegative("Prize pool must be non-negative"),

  ticketPrice: z
    .number({ required_error: "Ticket price is required" })
    .int("Ticket price must be an integer")
    .nonnegative("Ticket price must be non-negative"),

  totalTickets: z
    .number({ required_error: "Total tickets is required" })
    .int("Total tickets must be an integer")
    .positive("Total tickets must be greater than 0"),

  drawDate: z.coerce.date({
    required_error: "Draw date is required",
    invalid_type_error: "Invalid date format",
  }),

  category: ContestTimeTypeEnum.default("DAILY"),
  status: ContestStatusEnum.default("ACTIVE"),

  isFeatured: z
    .boolean({ invalid_type_error: "Invalid value for featured flag" })
    .default(false)
    .optional(),

  rules: z.array(z.string({ required_error: "Rule must be a string" }), {
    required_error: "At least one rule is required",
  }),

  terms: z.array(z.string({ required_error: "Term must be a string" }), {
    required_error: "At least one term is required",
  }),

  showTicketsSoldBar: z
    .boolean({
      invalid_type_error: "Invalid value for ticket progress bar visibility",
    })
    .default(false)
    .optional(),
});
