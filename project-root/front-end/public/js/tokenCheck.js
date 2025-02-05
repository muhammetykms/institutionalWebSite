// public/js/tokenCheck.js

document.addEventListener("DOMContentLoaded", function () {
  fetch("/check-token", {
    method: "GET",
    credentials: "include", // Çerezlerle birlikte istekte bulunur
  })
    .then((response) => {
      if (response.status === 401) {
        // Eğer token geçersizse (401 Unauthorized dönerse) kullanıcı logout yapılır
        window.location.href = "/logout";
      }
    })
    .catch((error) => console.error("Error:", error));
});
