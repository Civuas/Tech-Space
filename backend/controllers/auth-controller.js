const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");
const sendVerificationMail = require("../utils/send-email");

class AuthController {
  async sendOtp(req, res) {
    //Logic
    const { phone, email } = req.body;
    if (!phone && !email) {
      return res.status(500).json({
        message: "Phone or Email field is required",
      });
    }

    const otp = await otpService.generateOtp();

    //Hash
    const ttl = 1000 * 60 * 4; //3min
    const expires = Date.now() + ttl;
    const data = `${phone || email}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    //send Otp
    try {
      // await otpService.sendBySms(phone, otp);
      if (email) {
        sendVerificationMail(email, otp);
      }
      return res.json({
        hash: `${hash}.${expires}`,
        phone: phone,
        otp,
        email,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Message sending failed",
      });
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, phone, email } = req.body;
    if (!otp || !hash || (!phone && !email)) {
      res.status(400).json({
        message: "All fields are required!",
      });
    }

    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const data = `${phone || email}.${otp}.${expires}`;

    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    let user;

    try {
      let uniqueIdentifier = phone ? { phone } : { email };
      user = await userService.findUser(uniqueIdentifier);
      if (!user) {
        user = await userService.createUser(uniqueIdentifier);
      }
    } catch (error) {
      return res.status(500).json({
        message: "DB error",
      });
    }
    //generate Token
    const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id, activated: false });

    await tokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }

  async refresh(req, res) {
    // get the refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    //check if the token is valid
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    //check if the token is in db

    try {
      const token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookie);

      if (!token) {
        return res.status(401).json({ message: "Invalid Refresh Token" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }

    //check if valid user
    const user = await userService.findUser({ _id: userData._id });

    if (!user) {
      return res.status(404).json({ message: "No user" });
    }

    // generate new tokens
    const { refreshToken, accessToken } = tokenService.generateTokens({ _id: userData._id });

    // update refreshToken
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }

    // put in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    //response
    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;
    //delete refresh token from DB
    await tokenService.removeToken(refreshToken);

    //delete cookies

    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "None", secure: true });
    res.clearCookie("accessToken", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ user: null, auth: false });
  }
}

module.exports = new AuthController();
