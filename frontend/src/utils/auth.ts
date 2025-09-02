export type AuthInfo = {
  token?: string;
  role?: string;
  email?: string;
  username?: string;
};

export function getStoredAuth(): AuthInfo | null {
  try {
    const authJson = localStorage.getItem("auth");
    if (authJson) {
      return JSON.parse(authJson) as AuthInfo;
    }
  } catch {
    // ignore parse errors
  }
  const token = localStorage.getItem("token") || undefined;
  const role = localStorage.getItem("role") || undefined;
  const email = localStorage.getItem("email") || undefined;
  const username = localStorage.getItem("username") || undefined;
  if (token || role || email || username) {
    return { token, role, email, username };
  }
  return null;
}

export function isAdminRole(role?: string | null): boolean {
  if (!role) return false;
  return role === "ADMIN" || role === "SUPER_ADMIN";
}


