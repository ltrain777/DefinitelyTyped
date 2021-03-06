// Type definitions for passport-local-mongoose 4.0.0
// Project: https://github.com/saintedlama/passport-local-mongoose
// Definitions by: Linus Brolin <https://github.com/linusbrolin/>, simonxca <https://github.com/simonxca/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../mongoose/mongoose.d.ts" />
/// <reference path="../passport-local/passport-local.d.ts" />

declare module 'mongoose' {
  import passportLocal = require('passport-local');

  // methods
  export interface PassportLocalDocument {
    setPassword(password: string, cb: (err: any, res: any) => void): void;
    authenticate(password: string, cb: (err: any, res: any, error: any) => void): void;
  }

  // statics
  export type PassportLocalModel<T extends PassportLocalDocument> = _PassportLocalModel<T> & Model<T>;
  interface _PassportLocalModel<T extends PassportLocalDocument> {
    authenticate(): (username: string, password: string, cb: (err: any, res: T, error: any) => void) => void;
    serializeUser(): (user: PassportLocalModel<T>, cb: (err: any) => void) => void;
    deserializeUser(): (username: string, cb: (err: any) => void) => void;
    register(user: PassportLocalModel<T>, password: string, cb: (err: any) => void): void;
    findByUsername(username: string, selectHashSaltFields: boolean, cb: (err: any) => void): any;
    createStrategy(): passportLocal.Strategy;
  }

  // error messages
  export interface PassportLocalErrorMessages {
    MissingPasswordError?: string;
    AttemptTooSoonError?: string;
    TooManyAttemptsError?: string;
    NoSaltValueStoredError?: string;
    IncorrectPasswordError?: string;
    IncorrectUsernameError?: string;
    MissingUsernameError?: string;
    UserExistsError?: string;
  }

  // plugin options
  export interface PassportLocalOptions {
    saltlen?: number;
    iterations?: number;
    keylen?: number;
    encoding?: string;
    digestAlgorithm?: string;
    passwordValidator?: (password: string, cb: (err: any) => void) => void;

    usernameField?: string;
    usernameUnique?: boolean;

    usernameQueryFields: Array<string>;

    selectFields?: string;
    populateFields?: string;

    usernameLowerCase?: boolean;

    hashField?: string;
    saltField?: string;

    limitAttempts?: boolean;
    lastLoginField?: string;
    attemptsField?: string;
    interval?: number;
    maxInterval?: number;
    maxAttempts?: number;

    errorMessages?: PassportLocalErrorMessages;
  }

  export interface PassportLocalSchema extends Schema {
    plugin(
      plugin: (schema: PassportLocalSchema, options?: PassportLocalOptions) => void,
      options?: PassportLocalOptions
    ): this;
  }

  export function model<T extends PassportLocalDocument, Statics>(
    name: string,
    schema?: PassportLocalSchema,
    collection?: string,
    skipInit?: boolean): Statics & PassportLocalModel<T>;
}

declare module 'passport-local-mongoose' {
  import mongoose = require('mongoose');
  var _: (schema: mongoose.Schema, options?: Object) => void;
  export = _;
}
