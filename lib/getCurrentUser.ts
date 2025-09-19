// lib/getCurrentUser.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// export const getCurrentUser = async () => {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;
//   if (!token) return null;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     return decoded as { id: string; role: string };
//   } catch {
//     return null;
//   }
// };

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("Token in cookie:", token); // 👈 add this
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded token:", decoded); // 👈 add this
    return decoded as { id: string; role: string };
  } catch (err) {
    console.error("JWT verify failed:", err);
    return null;
  } 
};
