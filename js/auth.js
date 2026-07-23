const signupForm = document.getElementById("signup-form");

function showFieldError(input, message) {
  input.classList.add("input-error");

  const formGroup = input.closest(".form-group");
  const errorElement = formGroup.querySelector(".field-error");
  errorElement.textContent = message;
}

function clearFieldError(input) {
  input.classList.remove("input-error");

  const formGroup = input.closest(".form-group");
  const errorElement = formGroup.querySelector(".field-error");
  errorElement.textContent = "";
}

function isValidEmail(email) {
  const atIndex = email.indexOf("@");
  const dotIndex = email.indexOf(".", atIndex + 1);

  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
}

function isValidPassword(password) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return password.length >= 8 && hasLetter && hasNumber;
}

function validateSignupForm() {
  const signupInputs = signupForm.querySelectorAll("input");
  signupInputs.forEach(function (input) {
    clearFieldError(input);
  });

  const fullNameInput = document.getElementById("signup-full-name");
  const emailInput = document.getElementById("signup-email");
  const companyInput = document.getElementById("signup-company");
  const passwordInput = document.getElementById("signup-password");
  const confirmPasswordInput = document.getElementById("signup-confirm-password");

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const company = companyInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  let isValid = true;

  if (fullName.length < 3) {
    showFieldError(fullNameInput, "Full name must be at least 3 characters");
    isValid = false;
  }

  if (!isValidEmail(email)) {
    showFieldError(emailInput, "Please enter a valid email address");
    isValid = false;
  } else {
    const users = getUsers();
    const emailExists = users.some(function (user) {
      return user.email.toLowerCase() === email;
    });

    if (emailExists) {
      showFieldError(emailInput, "An account with this email already exists");
      isValid = false;
    }
  }

  if (!isValidPassword(password)) {
    showFieldError(
      passwordInput,
      "Password must be at least 8 characters and contain a letter and a number"
    );
    isValid = false;
  }

  if (confirmPassword !== password) {
    showFieldError(confirmPasswordInput, "Passwords do not match");
    isValid = false;
  }

  return isValid;
}

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateSignupForm()) {
      // Future registration logic will be added here.
    }
  });
}
