export function getUserId(): number | null {
  const auth = localStorage.getItem("auth");
  if (auth) {
    const parsedAuth = JSON.parse(auth);
    return parsedAuth?.state?.user?.id || null;
  }
  return null;
}

export function getPhone(): string | null {
  const auth = localStorage.getItem("auth");
  if (auth) {
    const parsedAuth = JSON.parse(auth);
    return parsedAuth?.state?.user?.phone || null;
  }
  return null;
}

export function getUserFromStorage() {
  const auth = localStorage.getItem("auth");
  if (auth) {
    const parsedAuth = JSON.parse(auth);
    return parsedAuth?.state?.user || null;
  }
  return null;
}

//check role is admin
export function isAdmin(): boolean {
  const auth = localStorage.getItem("auth");
  if (auth) {
    const parsedAuth = JSON.parse(auth);
    return parsedAuth?.state?.user?.roles.includes("ROLE_ADMIN") || false;
  }
  return false;
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

// REFRESH TOKEN
const NAME_REFRESH_TOKEN = "refreshToken";

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
  localStorage.removeItem("order");
  removeAccessToken();
  removeRefreshToken();
}

export function isAuthenticated(): boolean {
  const auth = localStorage.getItem("auth");
  if (auth) {
    const parsedAuth = JSON.parse(auth);
    return !!parsedAuth?.state?.user && !!getAccessToken();
  }
  return false;
}
