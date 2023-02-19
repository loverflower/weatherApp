const db = require("../data-base/db");
const bcrypt = require("../node_modules/bcrypt");
const uuid = require("uuid");
const mailService = require("../services/mail-service");
const tokenService = require("../services/token-service");
const UserDto = require("../user_dto/userDto");
const ApiError = require("../exeptions/api-errors");

console.log(ApiError, "ApiErrorApiErrorApiError");

class UserService {
  async registration(email, password) {
    const candidate = await db.query(
      `SELECT * FROM user_db WHERE email = '${email}'`
    );
    if (candidate.length > 0) {
      throw ApiError.BadRequest(`Пользователь с таким ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const registerPath = uuid.v4();

    const result = await db.query(
      "INSERT INTO user_db (email, password, register_path, is_activated) values ($1, $2, $3, $4) RETURNING *",
      [email, hashPassword, registerPath, false]
    );

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}api/activate/${registerPath}`
    );
    const userDto = new UserDto(result[0]);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveTokens(tokens.refreshToken, userDto.id);

    return {
      ...tokens,
      userDto,
    };
  }

  async login(email, password) {
    const candidate = await db.query(
      `SELECT * FROM user_db WHERE email = '${email}'`
    );

    if (candidate.length === 0) {
      throw ApiError.BadRequest(`Пользователь с таким ${email} не создан`);
    }
    const isEqualPassword = await bcrypt.compare(
      password,
      candidate[0].password
    );

    if (!isEqualPassword) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = new UserDto(candidate[0]);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveTokens(tokens.refreshToken, userDto.id);

    return {
      ...tokens,
      userDto,
    };
  }

  async logout(refreshToken) {
    try {
      const token = await tokenService.removeToken(refreshToken);
      return token;
    } catch (e) {
      console.log(e);
    }
  }

  async refresh(refreshToken) {
    try {
      if (refreshToken == null) {
        throw ApiError.BadRequest("нет токена");
      }

      const userData = tokenService.validateRefreshToken(refreshToken);
      const findTokenInDb = tokenService.findRefreshToken(refreshToken);
      if (userData == null || findTokenInDb == null) {
        throw ApiError.BadRequest("Токен не валидный или нет в базе");
      }

      const candidate = await db.query(
        `SELECT * FROM user_db WHERE id = '${userData.id}'`
      );
      const userDto = new UserDto(candidate[0]);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveTokens(tokens.refreshToken, userDto.id);
      return {
        ...tokens,
        userDto,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async setOptions(option, userId) {
    try {
      await db.query(
        "INSERT INTO option (option_id, option) values ($1, $2) RETURNING *",
        [userId, option]
      );

      const result = await db.query(
        `SELECT option FROM option WHERE option_id = '${userId}'`
      );

      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async getOptions(userId) {
    try {
      const result = await db.query(
        `SELECT option FROM option WHERE option_id = '${userId}'`
      );
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteOptions(id, userId) {
    try {
      const deletedOption = await db.query(
        `SELECT * FROM option WHERE option ->> 'id' = '${id}'`
      );

      await db.query("DELETE FROM option where id=$1", [deletedOption[0].id]);

      const allOptions = await db.query(
        `SELECT option FROM option WHERE option_id = '${userId}'`
      );

      return allOptions;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserService();
