/**
 * Generates a bcrypt hash for ADMIN_PASSWORD_HASH without the password
 * touching shell history or the repo.
 *
 * Usage: node scripts/hash-admin-password.mjs
 */
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline";
import { Writable } from "node:stream";

const muted = new Writable({
  write(chunk, enc, cb) {
    cb();
  },
});

const rl = createInterface({ input: process.stdin, output: muted, terminal: true });
process.stdout.write("Password (input hidden): ");

rl.question("", async (password) => {
  rl.close();
  process.stdout.write("\n");
  if (!password || password.length < 12) {
    console.error("Use at least 12 characters.");
    process.exit(1);
  }
  const hash = await bcrypt.hash(password, 12);
  console.log("\nADMIN_PASSWORD_HASH value (paste into Vercel as-is):\n");
  console.log(hash);
});
