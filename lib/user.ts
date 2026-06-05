/** Returns the first word of a full name, falling back to the full string. */
export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}
