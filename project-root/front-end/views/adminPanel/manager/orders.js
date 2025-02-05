import announcementFormHTML from "./announcementForm.js";

document.addEventListener("DOMContentLoaded", () => {
  const sideMenu = document.querySelector("aside");
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");

  const darkMode = document.querySelector(".dark-mode");

  menuBtn.addEventListener("click", () => {
    sideMenu.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    sideMenu.style.display = "none";
  });

  darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode-variables");
    darkMode.querySelector("span:nth-child(1)").classList.toggle("active");
    darkMode.querySelector("span:nth-child(2)").classList.toggle("active");
  });

  document.querySelectorAll(".sidebar a").forEach((link) => {
    link.addEventListener("click", () => {
      sideMenu.style.display = "none";
    });
  });

  // Duyuru Ekle Butonu
  const createAnnouncementBtn = document.getElementById("create-announcement");

  createAnnouncementBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Formun varsayılan submit davranışını engelle
    document.getElementById("main-content").innerHTML = announcementFormHTML;
  });
});
