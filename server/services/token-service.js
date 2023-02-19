const jwt = require("jsonwebtoken");
const db = require("../data-base/db");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveTokens(token, id) {
    const existingTokens = await db.query(
      `SELECT * FROM tokens WHERE token_id = '${id}'`
    );

    existingTokens.length > 0
      ? await db.query(
          "UPDATE tokens set refresh_token= $1 where token_id=$2 RETURNING *",
          [token, id]
        )
      : await db.query(
          "INSERT INTO tokens (refresh_token, token_id) values ($1, $2) RETURNING *",
          [token, id]
        );
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findRefreshToken(token) {
    const existingToken = await db.query(
      `SELECT * FROM tokens WHERE refresh_token = '${token}'`
    );

    return existingToken.length > 0 ? true : false;
  }

  async removeToken(refreshToken) {
    const deletedToken = await db.query(
      "DELETE FROM tokens where refresh_token=$1",
      [refreshToken]
    );
    console.log(deletedToken, "deletedToken");
    return refreshToken;
  }
}

module.exports = new TokenService();
