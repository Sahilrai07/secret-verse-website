// gen-hash.js
import bcrypt from "bcryptjs"; // use bcryptjs to avoid native compile issues

const password = process.argv[2] || "admin123"; // pass a password or default to admin123
const rounds = parseInt(process.argv[3], 10) || 10;

async function run() {
  const hash = await bcrypt.hash(password, rounds);
  console.log(hash);
}
run().catch((e) => { console.error(e); process.exit(1); });