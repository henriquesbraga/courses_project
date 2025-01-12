import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
      localStorage.setItem("userData", JSON.stringify(data))
      setUserDataState(userData)
    }

    const loadUserData = () => {
      const localDataNonParsed = localStorage.getItem("userData");

      if(!localDataNonParsed) {
        return;
      }

      const parsed = JSON.parse(localDataNonParsed);
      setUserDataState(parsed);

    }



    useEffect(() => {
      loadUserData()
    }, [])




  const clearUserData = () => {
    setUserData(initialUserDataState);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserData must be used within a DadosUsuarioProvider');
  }
  return context;
};