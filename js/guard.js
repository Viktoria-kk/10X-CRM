function protectPage() {
  const session = getSession();

  if (!session) {
    window.location.href = "index.html";
  }
}

function redirectAuthenticatedUser() {
  const session = getSession();

  if (session) {
    window.location.href = "dashboard.html";
  }
}
