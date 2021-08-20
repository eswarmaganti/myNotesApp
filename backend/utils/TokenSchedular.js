import schedular from "node-schedule";
import Token from "../models/tokenModel.js";

export const tokenSchedular = () =>
  schedular.scheduleJob("*/10 * * * *", async () => {
    await Token.updateMany({ isExpired: true });
    console.log(`Schedular Invokes`);
  });
