import express from "express";
import { readHTMLFile } from "./assets/functions.js";
import { PORT } from "./assets/variables.js";
import { routes } from "./assets/routes.js";
import { users } from "./assets/db.js";

const app = express();
app.use(express.json());

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    readHTMLFile(route.file, res);
  });
});

app.post("/login", (req, res) => {
  const { id, email, password } = req.body;

  const loggedUser = users.find((user) => user.id === id);

  if (
    loggedUser &&
    loggedUser.email === email &&
    loggedUser.password === password
  ) {
    switch (true) {
      case loggedUser.email.includes(".admin"):
        return res.redirect("/admin");
      case loggedUser.email.includes(".superadmin"):
        return res.redirect("/superadmin");
      default:
        return res.redirect("/user");
    }
  } else {
    return res.status(401).send("Wrong email or password");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
