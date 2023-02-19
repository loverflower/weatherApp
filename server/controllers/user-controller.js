const userService = require("../services/user-service");
const db = require("../data-base/db");
const { validationResult } = require("express-validator");

class UserController {
  async registration(req, res, next) {
    try {
      const errorResult = validationResult(req);
      if (!errorResult.isEmpty()) {
        return new Error("ошибка валидации");
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const param = req.params.link;
      const candidate = await db.query(
        `SELECT * FROM user_db WHERE register_path = '${param}'`
      );
      if (candidate.length === 0) {
        throw new Error(`Link isn't not correct`);
      }
      await db.query(
        `UPDATE user_db set is_activated=true where register_path='${param}'`
      );

      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {}
  }

  async setOptions(req, res, next) {
    try {
      const { option, userId } = req.body;

      const result = await userService.setOptions(option, userId);

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getOptions(req, res, next) {
    try {
      const param = req.params.id;

      const result = await userService.getOptions(param);

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteOptions(req, res, next) {
    try {
      const id = req.params.id;
      const { userId } = req.body;
      const result = await userService.deleteOptions(id, userId);

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

//   async createUser(req, res) {
//     const { firstName, lastName } = req.body;
//     console.log(firstName, lastName);
//     console.log("eeee!!!!!!!!!!!!!!!!!!!!!!!");
//     const result = await db.query(
//       "INSERT INTO user_db (first_name, last_name) values ($1, $2) RETURNING *",
//       [firstName, lastName]
//     );
//     const Ddd = res.json(result);
//     console.log(Ddd);
//   }
//   async getUsers(req, res) {
//     const result = await db.query("SELECT * FROM user_db");
//     console.log(result);
//     res.json(result);
//   }
//   async getOneUser(req, res) {
//     const id = req.params.id;
//     console.log(req, "req");
//     const result = await db.query("SELECT * FROM user_db where id= $1", [id]);
//     res.json(result[0]);
//   }
//   async updateUser(req, res) {
//     const { id, firstName, lastName } = req.body;
//     const result = await db.query(
//       "UPDATE user_db set first_name= $1, last_name= $2 where id=$3 RETURNING *",
//       [firstName, lastName, id]
//     );
//     res.json(result);
//   }
//   async deleteUser(req, res) {
//     const id = req.params.id;
//     const result = await db.query("DELETE  FROM user_db where id=$1", [id]);
//     res.json(result);
//   }
// }

module.exports = new UserController();
