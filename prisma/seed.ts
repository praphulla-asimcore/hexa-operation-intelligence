import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Seeds the initial administrator. Idempotent — re-running updates the existing
 * record rather than creating duplicates. All values come from the environment
 * (set them in the gitignored .env); the password is required so no secret is
 * ever hardcoded in tracked files.
 */
async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "praphulla@hexamatics.com";
  const name = process.env.SEED_ADMIN_NAME ?? "Praphulla Subedi";
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!password) {
    throw new Error(
      "SEED_ADMIN_PASSWORD is not set. Add it to your .env before running the seed.",
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { name, role: Role.ADMIN, passwordHash },
    create: { email, name, role: Role.ADMIN, passwordHash },
  });

  console.log(`Seeded admin: ${admin.email} (${admin.role})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
