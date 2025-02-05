const bcrypt = require("bcryptjs");

const password = "tamdeger8144"; // Kayıt için kullanılacak şifre

const hashPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log("Hashed Password:", hashedPassword); // Hash'lenmiş şifreyi konsola yazdır
};

hashPassword(password).catch((err) => console.error(err));
