import bcrypt from "bcryptjs";

const users = [
  {
    name: "Eswar Krishna Maganti",
    email: "maganti.ek@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "John Michel",
    email: "michel.j@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Sarah Wilson",
    email: "wilson.sarah@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
