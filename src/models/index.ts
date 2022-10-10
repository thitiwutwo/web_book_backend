import { my_sequelize } from "../config/sequelize";
import { author } from "./author";
import { book } from "./book";
import { book_author } from "./book_author";
import { book_language } from "./book_language";
import { borrow } from "./borrow";
import { oauth_access_tokens } from "./oauth_access_tokens";
import { oauth_authorization_codes } from "./oauth_authorization_codes";
import { oauth_clients } from "./oauth_clients";
import { oauth_refresh_tokens } from "./oauth_refresh_tokens";
import { oauth_scopes } from "./oauth_scopes";
import { publisher } from "./publisher";
import { users } from "./users";

my_sequelize.addModels([
    author,
    book,
    book_author,
    book_language,
    borrow,
    oauth_access_tokens,
    oauth_authorization_codes,
    oauth_clients,
    oauth_refresh_tokens,
    oauth_scopes,
    publisher,
    users,
]);

export * from "./author";
export * from "./book";
export * from "./book_author";
export * from "./book_language";
export * from "./borrow";
export * from "./oauth_access_tokens";
export * from "./oauth_authorization_codes";
export * from "./oauth_clients";
export * from "./oauth_refresh_tokens";
export * from "./oauth_scopes";
export * from "./publisher";
export * from "./users";


