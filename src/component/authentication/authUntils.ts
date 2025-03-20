export function getUserId(): number | null {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user).id;
  }
  return null;
}

export function getUsername() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user).username;
  }
  return null;
}

export function getUserFromStorage() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

// ACCESS TOKEN
const NAME_ACCESS_TOKEN = "accessToken";

export function setAccessToken(accessToken: string) {
  localStorage.setItem(NAME_ACCESS_TOKEN, accessToken);
}
export function getAccessToken() {
  return localStorage.getItem(NAME_ACCESS_TOKEN);
}
export function removeAccessToken() {
  localStorage.removeItem(NAME_ACCESS_TOKEN);
}

//refresh token
const NAME_REFRESH_TOKEN = "accessToken";

export function getRefreshToken() {
  return localStorage.getItem(NAME_REFRESH_TOKEN);
}

export function setRefreshToken(refreshToken: string) {
  localStorage.setItem(NAME_REFRESH_TOKEN, refreshToken);
}

export function removeRefreshToken() {
  localStorage.removeItem(NAME_REFRESH_TOKEN);
}

// AUTH STATE
export function clearStorage() {
  localStorage.removeItem("auth");
  removeAccessToken();
  removeRefreshToken();
}
export function isAuthenticated() {
  return !!getUserId() && !!getAccessToken();
}
