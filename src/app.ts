import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { booksRouter } from "./app/data_management/books";
import { bookLanguagesRouter } from "./app/data_management/book_languages";
import { publishersRouter } from "./app/data_management/publishers";
import { usersRouter } from "./app/data_management/users";
import { authorRouter } from "./app/data_management/author";
import { borrowRouter } from "./app/data_management/borrow";
import {
  getAccessToken,
  getClient,
  getRefreshToken,
  getUser,
  grantTypeAllowed,
  saveAccessToken,
  saveRefreshToken,
  saveSession,
} from "./app/auth";
import { users } from "./models" ;

var oauthserver = require("@shoppredigital/oauth2-server");

dotenv.config();

const app: any = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// add oauth 2.0
app.oauth = oauthserver({
  model: {
    getAccessToken,
    getClient,
    getRefreshToken,
    grantTypeAllowed,
    saveAccessToken,
    saveRefreshToken,
    getUser,
    saveSession,
  }, // See below for specification
  grants: ["password"],
  debug: true,
});

app.all("/oauth/login", app.oauth.grant());

app.get("/me", app.oauth.authorise(), async function (req: any, res: any) {
  let user = await users.findByPk(req.user.id);
  res.json({status: true, data: user});
});

app.get("/", function (req: Request, res: Response) {
  res.send("<h1>Hello World!! - My API</h1>");
});

app.use("/data/books", booksRouter);
app.use("/data/book_languages", bookLanguagesRouter);
app.use("/data/publishers", publishersRouter);
app.use("/data/users", usersRouter);
app.use("/data/author", authorRouter);
app.use("/data/borrow", borrowRouter);
app.use(app.oauth.errorHandler());

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
