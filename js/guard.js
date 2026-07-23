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

document.addEventListener("DOMContentLoaded", function () {
  const pageAccess = document.body.dataset.pageAccess;

  if (pageAccess === "protected") {
    protectPage();
  }

  if (pageAccess === "public") {
    redirectAuthenticatedUser();
  }
});
