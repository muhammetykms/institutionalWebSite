document.addEventListener("DOMContentLoaded", () => {
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

  // Etkinlik Ekle Butonu
  const createEventBtn = document.getElementById("create-event");

  createEventBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Formun varsayılan submit davranışını engelle

    // innerHTML ile form oluşturma
    document.getElementById("main-content").innerHTML = `
            <section class="adminjs_Box">
              <section class="adminjs_ActionHeader">
                <section class="adminjs_Box">
                  <section class="adminjs_Breadcrumbs">
                    <a href="/dashboard">Dashboard</a>
                    <a href="/events">Etkinlikler</a>
                    <a href="#">Etkinlik Ekle</a>
                  </section>
                </section>
                <section class="adminjs_Box">
                  <h2 class="adminjs_Header adminjs_H2">Etkinlik Ekle</h2>
                </section>
              </section>
              <section class="adminjs_Box">
              <form id="event-form" enctype="multipart/form-data">
              <div class="form-group">
                  <label for="event-title">Başlık:</label>
                  <input type="text" id="event-title" name="title" required />
              </div>
              <div class="form-group">
                  <label for="event-description">Açıklama:</label>
                  <textarea id="event-description" name="description" required></textarea>
              </div>
              <div class="form-group">
                  <label for="event-image">Fotoğraf:</label>
                  <input type="file" id="event-image" name="image" accept="image/*" required />
              </div>
              <button type="submit">Etkinlik Ekle</button>
          </form>
              </section>
            </section>
          `;

    const eventForm = document.getElementById("event-form");

    document
      .getElementById("event-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        // Form verilerini kontrol etmek için loglayın
        console.log("Form Data:", [...formData]);

        try {
          const response = await fetch("/events", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            alert("Etkinlik başarıyla eklendi!");
            window.location.href = "/events";
          } else {
            const errorData = await response.json();
            alert(`Etkinlik eklerken bir hata oluştu: ${errorData.message}`);
          }
        } catch (error) {
          console.error("Etkinlik eklenirken hata:", error);
          alert("Etkinlik eklerken bir hata oluştu.");
        }
      });
  });

  // Sayfa yüklendiğinde AJAX isteği gönder
  fetch("/events")
    .then((response) => response.json())
    .then((events) => {
      events.sort((a, b) => new Date(b.date) - new Date(a.date));

      const tableBody = document.querySelector(".adminjs_TableBody");

      if (events.length > 0) {
        events.forEach((event) => {
          const row = document.createElement("tr");
          row.classList.add("adminjs_TableRow");

          row.innerHTML = `
            <td class="adminjs_TableCell">${event.title}</td>
            <td class="adminjs_TableCell">${event.description}</td>
            <td class="adminjs_TableCell">
              <img src="${event.image}" alt="Image" width="32" height="32" />
            </td>
            <td class="adminjs_TableCell">${new Date(
              event.date
            ).toLocaleDateString()}</td>
  
            <td class="adminjs_TableCell options">
              <div class="button-group">
                <form action="/events/${
                  event._id
                }?_method=DELETE" method="POST">
                  <button class="btn btn-delete" data-id="${
                    event._id
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

            if (confirm("Bu etkinliği silmek istediğinizden emin misiniz?")) {
              try {
                const response = await fetch(`/events/${id}`, {
                  method: "DELETE",
                });

                if (response.ok) {
                  alert("Etkinlik başarıyla silindi!");
                  // Tablodaki ilgili satırı kaldır
                  button.closest("tr").remove();
                } else {
                  alert("Etkinlik silinirken bir hata oluştu.");
                }
              } catch (error) {
                console.error("Error:", error);
                alert("Etkinlik silinirken bir hata oluştu.");
              }
            }
          });
        });
      } else {
        tableBody.innerHTML = `<tr><td colspan="5">No events found.</td></tr>`;
      }
    })
    .catch((error) =>
      console.error("Etkinlikler getirilirken hata oluştu:", error)
    );
});
