/** Normalize Uzbekistan phone to +998XXXXXXXXX */

export function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 9 && digits.startsWith("9")) {
    return `+998${digits}`;
  }
  if (digits.length === 12 && digits.startsWith("998")) {
    return `+${digits}`;
  }
  if (input.startsWith("+998") && digits.length === 12) {
    return `+${digits}`;
  }
  return null;
}

export function isValidUzPhone(phone: string): boolean {
  return normalizePhone(phone) !== null;
}
