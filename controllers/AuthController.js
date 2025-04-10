const { User } = require("../models");
const bcrypt = require("bcryptjs");

class AuthController {
  static async auth(req, res) {
    try {
      let { username, password } = req.body;
      let findUser = await User.findOne({ where: { username: username } });
      if (!findUser) return res.redirect("/login?error=username not found!");

      let validation = bcrypt.compareSync(password, findUser.password);
      if (!validation) return res.redirect("/login?error=password invalid");
      if (validation) {
        req.session.userId = findUser.id;
        req.session.role = findUser.role;
        req.session.isLoggedIn = true;

        if(findUser.role === 'admin') return res.redirect("/admin")
        return res.redirect("/");
      }
    } catch (error) {
      res.redirect("/login");
    }
  }
  static login(req, res) {
    res.render("auth/login");
  }
  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) res.send(err);
      else {
        res.redirect("/login");
      }
    });
  }
  static registerForm(req, res) {
    res.render("auth/register");
  }
  static async registerPost(req, res) {
    try {
      await User.register(req.body);
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = AuthController;
