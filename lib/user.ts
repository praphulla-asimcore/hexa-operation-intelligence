export type UserRole = "Administrator" | "Member";

export interface CurrentUser {
  name: string;
  role: UserRole;
}

/**
 * Placeholder current user. Wire this up to the real auth/session later —
 * the nav and hero only depend on this shape.
 */
export const CURRENT_USER: CurrentUser = {
  name: "Praphulla Kumar",
  role: "Administrator",
};

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}
