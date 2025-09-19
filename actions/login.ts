import { toast } from "sonner";

export const registerUser = async (
  email: string,
  password: string,
  fullName: string
): Promise<{ success: boolean }> => {
  try {
    const res = await fetch("/api/auth/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name: fullName }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || "Registration failed");
    }

    toast.success("Registration successful!.");
    return { success: true };
  } catch (error: any) {
    console.error("❌ Register error:", error);
    toast.error(error.message || "Registration failed");
    throw error; // rethrow so the caller can handle it
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const res = await fetch("/api/auth/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || "Login failed");
    }

    toast.success("Welcome Back!");
  } catch (error: any) {
    console.error("❌ Login error:", error);
    toast.error(error.message || "Login failed");
  }
};

export const loginAdmin = async (
  email: string,
  password: string,
  code: string
): Promise<void> => {
  try {
    const res = await fetch("/api/auth/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, code }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || "Admin login failed");
    }

    toast.success("Welcome Back! Admin...");
  } catch (error: any) {
    console.error("❌ Admin login error:", error);
    toast.error(error.message || "Admin login failed");
  }
};

export const loginVendor = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const res = await fetch("/api/auth/vendor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || "Vendor login failed");
    }

    toast.success("Welcome Back! Vendor...");
  } catch (error: any) {
    console.error("❌ Vendor login error:", error);
    toast.error(error.message || "Vendor login failed");
  }
};
