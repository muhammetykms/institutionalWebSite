document.addEventListener("DOMContentLoaded", function () {
  const editForm = document.getElementById("assignment-edit-form");

  editForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    const formData = new FormData(editForm);
    const assignmentId = "<%= assignment._id %>";

    try {
      const response = await fetch(`/assignments/${assignmentId}?_method=PUT`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Deneme başarıyla güncellendi!");
        window.location.href = "/assignment";
      } else {
        alert("Deneme güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Deneme güncellenirken bir hata oluştu.");
    }
  });
});
