
import {
  type FormData,
  formatFormData,
  validateForm,
  getAgeCategory,
  validateField
} from "./validator";

const rawValidForm: FormData = {
  name: "  іван  ",
  age: 25,
  email: "Student@GMAIL.com"
};

const formattedValid = formatFormData(rawValidForm);
const validErrors = validateForm(formattedValid);

console.log("=== Валідна форма ===");
console.log("Вихідні дані:", rawValidForm);
console.log("Після форматування:", formattedValid);
console.log("Помилки валідації:", validErrors);

if (validErrors.length === 0) {
  const category = getAgeCategory(formattedValid.age);
  console.log("Категорія віку:", category);
}


const rawInvalidForm: FormData = {
  name: "a1",
  age: 150,
  email: "user@yahoo.com"
};

const formattedInvalid = formatFormData(rawInvalidForm);
const invalidErrors = validateForm(formattedInvalid);

console.log("\n=== Невалідна форма ===");
console.log("Вихідні дані:", rawInvalidForm);
console.log("Після форматування:", formattedInvalid);
console.log("Помилки валідації:", invalidErrors);

console.log("\n=== Перевірка окремих полів через validateField ===");
console.log("name ('Іван'):", validateField("name", "Іван"));
console.log("name ('іва'):", validateField("name", "іва"));
console.log("age (20):", validateField("age", 20));
console.log("age (200):", validateField("age", 200));
console.log("email ('test@gmail.com'):", validateField("email", "test@gmail.com"));
console.log("email ('test@yahoo.com'):", validateField("email", "test@yahoo.com"));
