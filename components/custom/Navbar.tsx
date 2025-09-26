
import { auth } from "@/auth";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const session = await auth(); // ✅ server-side session
  return <NavbarClient session={session} />;
}
