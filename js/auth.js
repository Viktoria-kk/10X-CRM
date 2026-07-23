const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

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

    if (!validateSignupForm()) {
      return;
    }

    const fullName = document.getElementById("signup-full-name").value.trim();
    const email = document
      .getElementById("signup-email")
      .value.trim()
      .toLowerCase();
    const company = document.getElementById("signup-company").value.trim();
    const password = document.getElementById("signup-password").value;

    const newUser = {
      id: Date.now(),
      fullName: fullName,
      email: email,
      password: password,
      company: company,
      createdAt: new Date().toISOString()
    };

    const users = getUsers();
    users.push(newUser);
    saveUsers(users);

    const formMessage = signupForm.querySelector(".form-message");
    formMessage.textContent = "Account created successfully! Please log in.";
    formMessage.classList.add("success");
    formMessage.classList.remove("error");

    const submitButton = signupForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Account Created";

    signupForm.reset();

    setTimeout(function () {
      window.location.href = "index.html";
    }, 1500);
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");
    const formMessage = loginForm.querySelector(".form-message");

    clearFieldError(emailInput);
    clearFieldError(passwordInput);
    formMessage.textContent = "";
    formMessage.classList.remove("success", "error");

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    let isValid = true;

    if (email === "") {
      showFieldError(emailInput, "Email is required");
      isValid = false;
    }

    if (password === "") {
      showFieldError(passwordInput, "Password is required");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const users = getUsers();
    const matchedUser = users.find(function (user) {
      return user.email === email && user.password === password;
    });

    if (!matchedUser) {
      formMessage.textContent = "Invalid email or password";
      formMessage.classList.add("error");
      return;
    }

    const session = {
      userId: matchedUser.id,
      email: matchedUser.email,
      loginAt: new Date().toISOString()
    };

    const submitButton = loginForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";

    saveSession(session);
    window.location.href = "dashboard.html";
  });
}
