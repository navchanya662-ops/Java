
export interface FormData {
  name: string;
  age: number;
  email: string;
}

export type ValidationStatus = "ok" | "error";

export type EmailDomain = "gmail.com" | "ukr.net";

export type AgeCategory = "child" | "adult" | "senior";

export type FieldName = keyof FormData;

export interface FieldValidation {
  field: FieldName;
  status: ValidationStatus;
  message?: string;
}
export function formatName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "";
  const lower = trimmed.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
export function formatEmail(email: string): string {
  return email.trim().toLowerCase();
}
export function formatFormData(raw: FormData): FormData {
  return {
    name: formatName(raw.name),
    age: raw.age,
    email: formatEmail(raw.email)
  };
}

export function validateName(name: string): boolean {
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return false;
  }
  const lettersOnly = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/u;
  if (!lettersOnly.test(trimmed)) {
    return false;
  }
  const firstChar = trimmed.charAt(0);
  if (firstChar !== firstChar.toUpperCase()) {
    return false;
  }

  return true;
}

export function validateAge(age: number): boolean {
  if (!Number.isFinite(age)) return false;
  if (!Number.isInteger(age)) return false;
  return age >= 1 && age <= 120;
}

export function validateEmail(email: string): boolean {
  const cleaned = formatEmail(email);

  const atIndex = cleaned.indexOf("@");
  if (atIndex <= 0) return false;

  const localPart = cleaned.slice(0, atIndex);
  const domain = cleaned.slice(atIndex + 1);

  if (!localPart || !domain) return false;
  const dotIndex = domain.indexOf(".");
  if (dotIndex <= 0 || dotIndex === domain.length - 1) {
    return false;
  }
  const allowedDomains: EmailDomain[] = ["gmail.com", "ukr.net"];
  if (!allowedDomains.includes(domain as EmailDomain)) {
    return false;
  }

  return true;
}

export function getAgeCategory(age: number): AgeCategory {
  if (!validateAge(age)) {
    throw new Error(`Неможливо визначити категорію для некоректного віку: ${age}`);
  }

  if (age < 18) return "child";
  if (age < 60) return "adult";
  return "senior";
}


export function validateForm(data: FormData): string[] {
  const formatted = formatFormData(data);
  const errors: string[] = [];

  const trimmedName = formatted.name.trim();
  if (trimmedName.length < 2) {
    errors.push("Name is too short");
  } else if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/u.test(trimmedName)) {
    errors.push("Name must contain only letters");
  } else if (trimmedName.charAt(0) !== trimmedName.charAt(0).toUpperCase()) {
    errors.push("Name must start with a capital letter");
  }

  // age
  if (!validateAge(formatted.age)) {
    errors.push("Age must be an integer between 1 and 120");
  }

  // email
  if (!validateEmail(formatted.email)) {
    errors.push("Email format is invalid (allowed domains: gmail.com, ukr.net)");
  }

  return errors;
}


export function validateField(field: FieldName, value: string | number): ValidationStatus {
  switch (field) {
    case "name":
      return typeof value === "string" && validateName(value) ? "ok" : "error";

    case "age":
      return typeof value === "number" && validateAge(value) ? "ok" : "error";

    case "email":
      return typeof value === "string" && validateEmail(value) ? "ok" : "error";

    default: {
      const _exhaustiveCheck: never = field;
      throw new Error(`Непідтримуване поле: ${_exhaustiveCheck}`);
    }
  }
}
