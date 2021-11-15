import express from "express";
import HttpError from "./models/http-error";
import assetsRouter from "./routes/assets";

const app = express();

app.use(express.json());

app.use("/api/assets/", assetsRouter);

app.use((req, res, next) => {
  const error: HttpError = {
    message: "Could not find this route.",
    code: 404,
  };
  throw error;
});

app.use((error: any, req: any, res: any, next: any) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown error occurred." });
});

app.listen(5000);
