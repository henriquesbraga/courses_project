import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../config/api";
import useTokenRefresh from "../hooks/useTokenRefresh";

const initialUserDataState: LoginApiResponse = {
  id: null,
  created_at: "",
  email: "",
  name: "",
  token: "",
};

const UserContext = createContext<{
  userData: LoginApiResponse;
  setUserData: (data: LoginApiResponse) => void;
  clearUserData: () => void;
}>({
  userData: initialUserDataState,
  setUserData: (_: LoginApiResponse) => {},
  clearUserData: () => {},
});

export const UserDataContext: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserDataState] =
    useState<LoginApiResponse>(initialUserDataState);

  const setUserData = (data: LoginApiResponse) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setUserDataState(data);
  };

  const loadUserData = () => {
    const localDataNonParsed = localStorage.getItem("userData");

    if (!localDataNonParsed) {
      return;
    }

    const parsed = JSON.parse(localDataNonParsed);
    setUserDataState(parsed);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const clearUserData = () => {
    setUserDataState(initialUserDataState);
  };

  const refreshToken = async () => {
    try {
      const request = await api.get("/refresh", {
        headers: {
          Accept: "application/json",
          authorization: `bearer ${userData.token}`,
        },
      });

      if (request.status === 200) {
        const { data } = request;

        setUserDataState((prev) => ({ ...prev, token: data.token }));
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, token: data.token })
        );
      }

      console.log("Token refreshed at", new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  useTokenRefresh(refreshToken, 1800000, userData.token !== "");

  return (
    <UserContext.Provider value={{ userData, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within a DadosUsuarioProvider");
  }
  return context;
};
