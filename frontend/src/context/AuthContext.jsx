import { createContext, useContext, useEffect, useState } from "react";

import { getProfile, loginUser, registerUser, updateProfile } from "../services/auth";
import { clearAuthStorage, getStoredAuth, persistAuth } from "../utils/storage";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(() => getStoredAuth());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrapAuth() {
      if (!tokens?.access) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getProfile();
        setUser(profile);
      } catch {
        clearAuthStorage();
        setTokens(null);
      } finally {
        setLoading(false);
      }
    }

    bootstrapAuth();
  }, [tokens?.access]);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    persistAuth({
      access: response.access,
      refresh: response.refresh,
    });
    setTokens({ access: response.access, refresh: response.refresh });
    setUser(response.user);
    return response.user;
  };

  const register = async (payload) => {
    await registerUser(payload);
    return login({ email: payload.email, password: payload.password });
  };

  const logout = () => {
    clearAuthStorage();
    setTokens(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    const profile = await getProfile();
    setUser(profile);
    return profile;
  };

  const saveProfile = async (payload) => {
    const profile = await updateProfile(payload);
    setUser(profile);
    return profile;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        loading,
        isAuthenticated: Boolean(tokens?.access),
        login,
        register,
        logout,
        refreshProfile,
        saveProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}

