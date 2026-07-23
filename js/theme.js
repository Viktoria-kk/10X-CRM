function applyTheme(theme) {
  const isLightTheme = theme === "light";
  document.body.classList.toggle("light-theme", isLightTheme);

  const themeButton = document.getElementById("theme-toggle");

  if (themeButton) {
    themeButton.textContent = isLightTheme ? "Dark Mode" : "Light Mode";
  }
}

function toggleTheme() {
  const currentTheme = getTheme();
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  saveTheme(newTheme);
  applyTheme(newTheme);
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = getTheme();
  applyTheme(savedTheme);

  const themeButton = document.getElementById("theme-toggle");

  if (themeButton) {
    themeButton.addEventListener("click", toggleTheme);
  }
});
