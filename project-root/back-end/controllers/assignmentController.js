// controllers/assignmentController.js
const Assignment = require("../models/assignment");
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const image = req.file ? `/img/${req.file.filename}` : null;

    const linkToSave =
      link && link.trim() !== ""
        ? link
        : "https://okulizyon.com/app2/ogrgiris/";

    const newAssignment = new Assignment({
      title,
      description,
      image,
      link: linkToSave, // Link verisini ekliyoruz
      date: new Date(),
    });

    await newAssignment.save();
    console.log("Deneme başarıyla oluşturuldu:", newAssignment);
    res.status(201).json(newAssignment);
  } catch (error) {
    console.error("Deneme oluşturulurken hata oluştu:", error);
    res.status(500).json({ message: "Deneme oluşturulurken hata oluştu" });
  }
};
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({}).sort({ date: -1 }); // Tarihe göre sıralama (en yeni en üstte)
    res.json(assignments);
  } catch (error) {
    console.error("Denemeler getirilirken hata oluştu:", error);
    res.status(500).send("Sunucu hatası");
  }
};

//En son eklenen 3 denemeyi alma
exports.getRecentAssignments = async (req, res) => {
  try {
    // Veritabanından en son eklenen 3 deneme sınavını alıyoruz
    const recentAssignments = await Assignment.find()
      .sort({ date: -1 }) // Tarihe göre sırala (en yeni en üstte)
      .limit(3); // Sadece 3 adet döndür

    res.json(recentAssignments);
    console.log(recentAssignments);
  } catch (error) {
    console.error("Error fetching recent assignments:", error);
    res.status(500).json({ message: "Failed to fetch recent assignments" });
  }
};

exports.updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const image = req.file ? `/img/${req.file.filename}` : null;

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }
    assignment.title = title;
    assignment.description = description;
    if (image) {
      assignment.image = image;
    }
    await assignment.save();
    res.status(200).json({ message: "Assignment updated successfully" });
  } catch (error) {
    console.error("Error updating assignment:", error);
    res.status(500).send("Server Error");
  }
};
exports.deleteAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    const assignment = await Assignment.findByIdAndDelete(id);
    if (!assignment) {
      return res.status(404).json({ message: "Deneme bulunamadı!" });
    }
    res.status(200).json({ message: "Deneme başarıyla silindi!" });
  } catch (error) {
    console.error("Deneme silinirken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası: Deneme silinemedi." });
  }
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }

    res.render("adminPanel/manager/editAssignment", { assignment });
  } catch (error) {
    console.error("Deneme getirilirken hata oluştu:", error);
    res.status(500).send("Sunucu hatası");
  }
};
