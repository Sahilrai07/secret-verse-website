"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// ---- Validation Schema ----
const Step1Schema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Step2Schema = z.object({
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
});

const VendorRegisterSchema = Step1Schema.merge(Step2Schema);

type VendorRegisterFormValues = z.infer<typeof VendorRegisterSchema>;

export default function VendorRegisterPage() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<VendorRegisterFormValues>({
    resolver: zodResolver(VendorRegisterSchema),
    defaultValues: {
      businessName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    if (step === 1) {
      const isStep1Valid = await trigger(["businessName", "email", "password"]);
      if (!isStep1Valid) return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data: VendorRegisterFormValues) => {
    try {
      // Map form → API payload
      const payload = {
        vendor: {
          name: data.businessName,
          email: data.email,
          password: data.password,
          phone: data.phone,
        },
        store: {
          name: data.businessName + " Store", // default store
          description: "Welcome to " + data.businessName,
          logo: null,
          banner: null,
        },
      };

      const res = await fetch("/api/vendor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Failed to register vendor");
        return;
      }

      toast.success("Vendor registered successfully!");
      //   console.log("Vendor Registered:", result);
      // Redirect to the waiting approval page
      window.location.href = "/auth/vendor/pending-approval";
    } catch (error) {
      console.error("Vendor Register Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Header */}
      <CardHeader className="text-center space-y-2 pb-6">
        <CardTitle className="text-3xl md:text-4xl font-playfair text-yellow-400">
          Vendor Registration
        </CardTitle>
        <CardDescription className="text-gray-300">
          Create your vendor account to get started
        </CardDescription>
      </CardHeader>

      {/* Form */}
      <CardContent className="space-y-6">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Step 1: Business Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName" className="text-gray-300 text-sm">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="Your Business"
                  {...register("businessName")}
                  className="bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                />
                {errors.businessName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.businessName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300 text-sm">
                  Vendor Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vendor@example.com"
                  {...register("email")}
                  className="bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300 text-sm">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-gray-300 text-sm">
                  Phone
                </Label>
                <Input
                  id="phone"
                  placeholder="+91 9876543210"
                  {...register("phone")}
                  className="bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="address" className="text-gray-300 text-sm">
                  Address
                </Label>
                <Input
                  id="address"
                  placeholder="Business Address"
                  {...register("address")}
                  className="bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                />
                {errors.address && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step Controls */}
          <div className="flex justify-between">
            {step > 1 && (
              <Button
                type="button"
                onClick={prevStep}
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                Back
              </Button>
            )}
            {step < 2 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="ml-auto bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto bg-yellow-400 text-black hover:bg-yellow-500"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </motion.div>
  );
}
