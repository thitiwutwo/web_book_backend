import {
  oauth_access_tokens,
  oauth_clients,
  oauth_refresh_tokens,
  users,
} from "../models";

async function getAccessToken(bearerToken: string, callback: Function) {
  var token = await oauth_access_tokens.findOne({
    where: { access_token: bearerToken },
  });
  if (token) {
    callback(null, {
      accessToken: token.access_token,
      clientId: token.client_id,
      expires: token.expires,
      userId: token.user_id,
    });
  } else {
    callback("Invalid Token");
  }
}

async function getClient(
  clientId: string,
  clientSecret: string,
  callback: Function
) {
  var client = await oauth_clients.findOne({ where: { client_id: clientId } });
  if (client) {
    if (client.client_secret == clientSecret) {
      callback(null, {
        clientId: client.id,
        clientSecret: client.client_secret,
      });
    }
  } else {
    callback("Invalid Client Key");
  }
}

async function getRefreshToken(bearerToken: string, callback: Function) {
  var result = await oauth_refresh_tokens.findOne({
    where: { refresh_token: bearerToken },
  });
  if (result) {
    callback(null, result);
  }
  callback("Invalid Refresh Token");
}

async function grantTypeAllowed(
  clientId: string,
  grantType: string,
  callback: Function
) {
  var grant = await oauth_clients.findOne({
    where: { client_id: clientId, grant_types: grantType },
  });
  if (grant) {
    callback(false, true);
  } else {
    callback(false, false);
  }
}

async function saveAccessToken(
  accessToken: string,
  clientId: any,
  expires: any,
  userId: any,
  sessionId: any,
  callback: Function
) {
  try {
    let at = await oauth_access_tokens.create({
      access_token: accessToken,
      client_id: clientId.clientId,
      user_id: userId.id,
      expires: expires,
    });
    if (at) {
      callback(null);
    } else {
      callback("Can not insert data to access token");
    }
  } catch (e: any) {
    console.log(e);
    callback("Can not insert data to access token");
  }
}

async function saveRefreshToken(
  refreshToken: any,
  clientId: any,
  expires: any,
  userId: any,
  callback: Function
) {
  try {
    let rf = await oauth_refresh_tokens.create({
      refresh_token: refreshToken,
      client_id: clientId,
      expires: expires,
      user_id: userId,
    });
    if (rf) {
      callback(null);
    } else {
      callback("Can not insert data to access token");
    }
  } catch (e: any) {
    callback("Can not insert data to access token");
  }
}

/*
 * Required to support password grant type
 */
async function getUser(username: any, password: any, callback: Function) {
  const bcrypt = require('bcryptjs');
  let user = await users.findOne({
    where: { username: username},
  });
  if (user) {
    const isSame = await bcrypt.compare(password, user.password);
    if(isSame){
      callback(null, user);
    }else{
      callback("Invalid Password",false);
    }
  } else {
    callback("NOT FOUND", false);
  }
}

async function saveSession(req: any, callback: Function) {
  callback(null, 1);
}

export {
  getAccessToken,
  getClient,
  getRefreshToken,
  grantTypeAllowed,
  saveAccessToken,
  saveRefreshToken,
  getUser,
  saveSession,
};
