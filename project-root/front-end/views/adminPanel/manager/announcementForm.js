const announcementFormHTML = `
  <section class="adminjs_Box">
    <section class="adminjs_ActionHeader">
      <section class="adminjs_Box">
        <section class="adminjs_Breadcrumbs">
          <a href="/app">Dashboard</a>
          <a href="#">Duyurular</a>
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
        <button type="submit">Duyuru Ekle</button>
      </form>
    </section>
  </section>
`;

export default announcementFormHTML;
