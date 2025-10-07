"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  UserPlus,
  AlertCircle,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DatePickerDOB } from "@/components/DatePickerDOB";

interface UserForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  dateOfBirth: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

export default function CreateUserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UserForm>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<UserForm>>({});

  const validateForm = () => {
    const newErrors: Partial<UserForm> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone))
      newErrors.phone = "Phone number is invalid";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) newErrors.pincode = "PIN code is required";
    else if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "PIN code must be 6 digits";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create user");

      toast.success("User created successfully!");
      router.push("/vendor/users");
    } catch (error) {
      toast.error("Error creating user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserForm, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/vendor/users")}
              className="text-white hover:text-yellow-400"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Users
            </Button>
            <h1 className="text-2xl font-bold text-white">Create New User</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Create New User Account
            </h2>
            <p className="text-gray-300">
              Fill in the details to create a new user account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="text-white font-semibold">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className={`bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                  placeholder="Enter full name"
                />
                {errors.fullName && (
                  <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-white font-semibold">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-white font-semibold">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </div>
                )}
              </div>

              <DatePickerDOB
                value={formData.dateOfBirth}
                onChange={(val) =>
                  setFormData({ ...formData, dateOfBirth: val })
                }
              />
            </div>

            {/* Address Information */}
            <div>
              <Label htmlFor="address" className="text-white font-semibold">
                <MapPin className="w-4 h-4 inline mr-2" />
                Complete Address *
              </Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 ${
                  errors.address ? "border-red-500" : ""
                }`}
                placeholder="Enter complete address"
              />
              {errors.address && (
                <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.address}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="city" className="text-white font-semibold">
                  City *
                </Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 ${
                    errors.city ? "border-red-500" : ""
                  }`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.city}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="pincode" className="text-white font-semibold">
                  PIN Code *
                </Label>
                <Input
                  id="pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  className={`bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 ${
                    errors.pincode ? "border-red-500" : ""
                  }`}
                  placeholder="Enter PIN code"
                  maxLength={6}
                />
                {errors.pincode && (
                  <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.pincode}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="gender" className="text-white font-semibold">
                  Gender
                </Label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full bg-gray-800 border border-yellow-500/30 text-white rounded-lg px-3 py-2 focus:border-yellow-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="password" className="text-white font-semibold">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password *
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </div>
                )}
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="text-white font-semibold"
                >
                  <Lock className="w-4 h-4 inline mr-2" />
                  Confirm Password *
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={`bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-1">
                    Important Information
                  </h4>
                  <ul className="text-blue-300 text-sm space-y-1">
                    <li>• The user will receive login credentials via email</li>
                    <li>
                      • You can buy contest tickets on behalf of this user
                    </li>
                    <li>
                      • All tickets purchased will be linked to this user&apos;s
                      account
                    </li>
                    <li>• The user can access their account independently</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/vendor/users")}
                className="flex-1 border-gray-500/30 text-gray-400 hover:bg-gray-500/10 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Creating User...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create User
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
