const { User, Store } = require("../models");
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

        // if(findUser.role === 'seller'){
        //     let data = await Store.findOne({where: { UserId: findUser.id}})
        //     req.session.storeId = data.userId
        // }

        if(findUser.role === 'admin') return res.redirect("/admin")
        return res.redirect("/");
      }
    } catch (error) {
      res.redirect("/login");
    }
  }
  static async login(req, res) {
    try {
        res.render("auth/login");
    } catch (error) {
        res.send(error)
    }
  }
  static async logout(req, res) {
    try {
        
        req.session.destroy((err) => {
          if (err) res.send(err);
          else {
            res.redirect("/login");
          }
        });
    } catch (error) {
     res.send(error)   
    }
  }
  static async registerForm(req, res) {
    try {
        let {error} = req.query
        res.render("auth/register", {error});
    } catch (error) {
        res.send(error)
    }

  }
  static async registerPost(req, res) {
    try {
        console.log(req.body)
      await User.register(req.body);
      res.redirect("/login");
    } catch (error) {
      if(error.name === 'SequelizeValidationError'){
                let msg = error.errors.map(err=>{ return err.message})
                res.redirect(`/register?error=${msg}`)
            }else{
                res.send(error)
            }
    }
  }
}

module.exports = AuthController;
