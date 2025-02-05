const Event = require("../models/event");

// Yeni etkinlik oluşturma
exports.createEvent = async (req, res) => {
  const image = req.file ? `/img/${req.file.filename}` : null;

  try {
    if (!req.file) {
      throw new Error("Image file is required.");
    }

    const eventData = {
      title: req.body.title,
      description: req.body.description,
      image,
    };

    const event = new Event(eventData);
    await event.save();
    res.status(201).json({ message: "Etkinlik başarıyla eklendi!" });
  } catch (error) {
    console.error("Etkinlik eklerken bir hata oluştu:", error);
    res.status(500).json({ message: "Etkinlik eklerken bir hata oluştu." });
  }
};

// Tüm etkinlikleri listeleme
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({
      message: "Etkinlikler getirilirken hata oluştu",
      error: err.message,
    });
  }
};

// Belirli bir etkinliği güncelleme
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const event = await Event.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Etkinlik bulunamadı" });
    }

    res.status(200).json({ message: "Etkinlik başarıyla güncellendi", event });
  } catch (err) {
    res.status(500).json({
      message: "Etkinlik güncellenirken hata oluştu",
      error: err.message,
    });
  }
};

// Belirli bir etkinliği silme
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Etkinlik bulunamadı" });
    }

    res.status(200).json({ message: "Etkinlik başarıyla silindi" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Etkinlik silinirken hata oluştu", error: err.message });
  }
};
