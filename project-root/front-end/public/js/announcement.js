document.addEventListener("DOMContentLoaded", () => {
  // Sidebar menüsü ve tema değiştirme fonksiyonları
  const sideMenu = document.querySelector("aside");
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const darkMode = document.querySelector(".dark-mode");

  menuBtn.addEventListener("click", () => {
    sideMenu.classList.toggle("show");
  });

  closeBtn.addEventListener("click", () => {
    sideMenu.classList.remove("show");
  });

  darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode-variables");
    darkMode.querySelector("span:nth-child(1)").classList.toggle("active");
    darkMode.querySelector("span:nth-child(2)").classList.toggle("active");
  });

  document.querySelectorAll(".sidebar a").forEach((link) => {
    link.addEventListener("click", () => {
      sideMenu.classList.remove("show");
    });
  });

  // Duyuru Ekle Butonu
  const createAnnouncementBtn = document.getElementById("create-announcement");

  createAnnouncementBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Formun varsayılan submit davranışını engelle

    // innerHTML ile form oluşturma
    document.getElementById("main-content").innerHTML = `
          <section class="adminjs_Box">
            <section class="adminjs_ActionHeader">
              <section class="adminjs_Box">
                <section class="adminjs_Breadcrumbs">
                  <a href="/dashboard">Dashboard</a>
                  <a href="/accountment">Duyurular</a>
                  <a href="#">Duyuru Ekle</a>
                </section>
              </section>
              <section class="adminjs_Box">
                <h2 class="adminjs_Header adminjs_H2">Duyuru Ekle</h2>
              </section>
            </section>
            <section class="adminjs_Box">
            <form id="duyuru-form">
            <div class="form-group">
              <label for="duyuru-baslik">Başlık:</label>
              <input type="text" id="duyuru-baslik" name="title" required />
            </div>
            <div class="form-group">
              <label for="duyuru-aciklama">Açıklama:</label>
              <textarea id="duyuru-aciklama" name="description" required></textarea>
            </div>
            <div class="form-group">
              <label for="duyuru-link">Link:</label>
              <input type="text" id="duyuru-link" name="link" placeholder="Link (opsiyonel)" />
            </div>
            <button type="submit">Duyuru Ekle</button>
          </form>
            </section>
          </section>
        `;

    const duyuruForm = document.getElementById("duyuru-form");

    duyuruForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(duyuruForm);

      const formObj = {};
      formData.forEach((value, key) => (formObj[key] = value));

      console.log("Form data being sent:", formObj);

      try {
        const response = await fetch("/announcements", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObj),
        });

        if (response.ok) {
          alert("Duyuru başarıyla eklendi!");
          window.location.href = "/accountment";
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert(`Duyuru eklerken bir hata oluştu: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Duyuru eklerken bir hata oluştu.");
      }
    });
  });

  // Sayfa yüklendiğinde duyuruları listeleme
  fetch("/announcements")
    .then((response) => response.json())
    .then((announcements) => {
      // Tarihe göre duyuruları sıralama (en yeni en üstte)
      announcements.sort((a, b) => new Date(b.date) - new Date(a.date));

      const tableBody = document.querySelector(".adminjs_TableBody");

      if (announcements.length > 0) {
        announcements.forEach((announcement) => {
          const row = document.createElement("tr");
          row.classList.add("adminjs_TableRow");

          row.innerHTML = `
                <td class="adminjs_TableCell">${announcement.title}</td>
                <td class="adminjs_TableCell">${announcement.description}</td>
                <td class="adminjs_TableCell">${new Date(
                  announcement.date
                ).toLocaleDateString()}</td>
                <td class="adminjs_TableCell">
   ${announcement.link}
</td>
                <td class="adminjs_TableCell options">
                  <div class="button-group">
                    <button class="btn btn-delete" data-id="${
                      announcement._id
                    }">Sil</button>
                  </div>
                </td>
              `;

          tableBody.appendChild(row);
        });

        // Duyuru silme işlemi
        document.querySelectorAll(".btn-delete").forEach((button) => {
          button.addEventListener("click", async (event) => {
            event.preventDefault();
            const id = button.getAttribute("data-id");

            if (confirm("Bu duyuruyu silmek istediğinizden emin misiniz?")) {
              try {
                const response = await fetch(`/announcements/${id}`, {
                  method: "DELETE",
                });

                if (response.ok) {
                  alert("Duyuru başarıyla silindi!");
                  // Tablodaki ilgili satırı kaldır
                  button.closest("tr").remove();
                } else {
                  alert("Duyuru silinirken bir hata oluştu.");
                }
              } catch (error) {
                console.error("Error:", error);
                alert("Duyuru silinirken bir hata oluştu.");
              }
            }
          });
        });
      } else {
        tableBody.innerHTML = `<tr><td colspan="5">No announcements found.</td></tr>`;
      }
    })
    .catch((error) =>
      console.error("Duyurular getirilirken hata oluştu:", error)
    );
});
