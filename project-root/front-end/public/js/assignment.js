document.addEventListener("DOMContentLoaded", () => {
  const sideMenu = document.querySelector("aside");
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const darkMode = document.querySelector(".dark-mode");

  menuBtn.addEventListener("click", () => {
    sideMenu.classList.toggle("show"); // Menü butonuna basıldığında menüyü göster/gizle
  });

  closeBtn.addEventListener("click", () => {
    sideMenu.classList.remove("show"); // Kapat butonuna basıldığında menüyü gizle
  });

  darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode-variables");
    darkMode.querySelector("span:nth-child(1)").classList.toggle("active");
    darkMode.querySelector("span:nth-child(2)").classList.toggle("active");
  });

  document.querySelectorAll(".sidebar a").forEach((link) => {
    link.addEventListener("click", () => {
      sideMenu.classList.remove("show"); // Linke tıklandığında menüyü gizle
    });
  });

  // Deneme Ekle Butonu
  const createAssignmentBtn = document.getElementById("create-assignment");

  createAssignmentBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Formun varsayılan submit davranışını engelle

    // innerHTML ile form oluşturma
    document.getElementById("main-content").innerHTML = `
          <section class="adminjs_Box">
            <section class="adminjs_ActionHeader">
              <section class="adminjs_Box">
                <section class="adminjs_Breadcrumbs">
                  <a href="/dashboard">Dashboard</a>
                  <a href="/assignment">Denemeler</a>
                  <a href="#">Deneme Ekle</a>
                </section>
              </section>
              <section class="adminjs_Box">
                <h2 class="adminjs_Header adminjs_H2">Deneme Ekle</h2>
              </section>
            </section>
            <section class="adminjs_Box">
              <form id="assignment-form" enctype="multipart/form-data">
                <div class="form-group">
                  <label for="assignment-baslik">Başlık:</label>
                  <input type="text" id="assignment-baslik" name="title" required />
                </div>
                <div class="form-group">
                  <label for="assignment-aciklama">Türü:</label>
                  <textarea id="assignment-aciklama" name="description" required></textarea>
                </div>
                <div class="form-group">
                  <label for="assignment-fotograf">Fotoğraf:</label>
                  <input type="file" id="assignment-fotograf" name="image" accept="image/*" required />
                </div>
            <div class="form-group">
              <label for="assignment-link">Link:</label>
              <input
                type="text"
                id="assignment-link"
                name="link"
                placeholder="Enter a link"
              />
            </div>
                <button type="submit">Deneme Ekle</button>
              </form>
            </section>
          </section>
        `;

    const assignmentForm = document.getElementById("assignment-form");

    assignmentForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(assignmentForm);

      try {
        const response = await fetch("/assignments", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Deneme başarıyla eklendi!");
          window.location.href = "/assignment";
        } else {
          alert("Deneme eklerken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Deneme eklerken bir hata oluştu.");
      }
    });
  });

  // Sayfa yüklendiğinde AJAX isteği gönder
  fetch("/assignments")
    .then((response) => response.json())
    .then((assignments) => {
      assignments.sort((a, b) => new Date(b.date) - new Date(a.date));

      const tableBody = document.querySelector(".adminjs_TableBody");

      if (assignments.length > 0) {
        assignments.forEach((assignment) => {
          const row = document.createElement("tr");
          row.classList.add("adminjs_TableRow");

          row.innerHTML = `
          <td class="adminjs_TableCell">${assignment.title}</td>
          <td class="adminjs_TableCell">${assignment.description}</td>
          <td class="adminjs_TableCell">
            <img src="${assignment.image}" alt="Image" width="32" height="32" />
          </td>
          <td class="adminjs_TableCell">${new Date(
            assignment.date
          ).toLocaleDateString()}</td>
          <td class="adminjs_TableCell">
   ${assignment.link}
</td>

          <td class="adminjs_TableCell options">
            <div class="button-group">
              <form action="/assignments/${
                assignment._id
              }?_method=DELETE" method="POST">
                <button class="btn btn-delete" data-id="${
                  assignment._id
                }">Sil</button>
              </form>
            </div>
          </td>
        `;
          tableBody.appendChild(row);
        });

        // Silme butonuna tıklama olayını dinleyin
        document.querySelectorAll(".btn-delete").forEach((button) => {
          button.addEventListener("click", async (event) => {
            event.preventDefault();
            const id = button.getAttribute("data-id");

            if (confirm("Bu denemeyi silmek istediğinizden emin misiniz?")) {
              try {
                const response = await fetch(`/assignments/${id}`, {
                  method: "DELETE",
                });

                if (response.ok) {
                  alert("Deneme başarıyla silindi!");
                  // Tablodaki ilgili satırı kaldır
                  button.closest("tr").remove();
                } else {
                  alert("Deneme silinirken bir hata oluştu.");
                }
              } catch (error) {
                console.error("Error:", error);
                alert("Deneme silinirken bir hata oluştu.");
              }
            }
          });
        });
      } else {
        tableBody.innerHTML = `<tr><td colspan="5">No assignments found.</td></tr>`;
      }
    })
    .catch((error) =>
      console.error("Denemeler getirilirken hata oluştu:", error)
    );
});
