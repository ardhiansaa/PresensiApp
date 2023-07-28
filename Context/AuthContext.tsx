import { BASE_URL, tokenKey } from "../config";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../services/axios";
import { AxiosResponse } from "axios";
import * as SplashScreen from "expo-splash-screen";
// import axios from "axios";

type Data = {
  token: string;
  user: {
    id: number;
    nip: number;
    nama: string;
    username: string;
    email: string;
    izin: number;
    sakit: number;
  };
  role: {
    divisi: string;
  };
};
type LoginBody = {
  username: string;
  password: string;
};

type Response = {
  status: string;
  message: string;
  data: Data;
  code: number;
};
// Define types for the userInfo object
// interface UserInfo {
//   token: string;
//   // Add other properties of the user if available in the response
// }

type UserData = {};

// Define the AuthContext interface to be used in the provider
interface AuthContextType {
  isLoading: boolean;
  userInfo: Data;
  login: (username: string, password: string) => void;
  logout: () => void;
  Auth: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  userInfo: {
    token: "",
    user: {
      id: 0,
      nip: 0,
      nama: "",
      username: "",
      email: "",
      izin: 0,
      sakit: 0,
    },
    role: {
      divisi: "",
    },
  },
  login: () => {},
  logout: () => {},
  Auth: false,
});

// Functional component
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<Data>({
    token: "",
    user: {
      id: 0,
      nip: 0,
      nama: "",
      username: "",
      email: "",
      izin: 0,
      sakit: 0,
    },
    role: {
      divisi: "",
    },
  });
  const [Auth, setAuth] = useState(false);
  const [isPreparingApp, setPreparingApp] = useState(true);
  useEffect(() => {
    console.log("userInfo nih bos", userInfo);
  }, [userInfo]);
  // const BASE_URL = 'YOUR_BASE_URL'; // Repslace 'YOUR_BASE_URL' with your actual base URL
  async function loadResourcesAndDataAsync() {
    try {
      SplashScreen.preventAutoHideAsync();
      // Load fonts
      // await Font.loadAsync({
      //     ...MaterialCommunityIcons.font,
      // });
      const token = await AsyncStorage.getItem(tokenKey);
      if (token) {
        await checkToken(token);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setPreparingApp(false);
      SplashScreen.hideAsync();
    }
  }

  useEffect(() => {
    loadResourcesAndDataAsync();
  }, []);

  const login = (username: string, password: string) => {
    setIsLoading(true);

    axios
      .post<LoginBody, AxiosResponse<Response>>(`${BASE_URL}/login`, {
        username,
        password,
      })
      .then(async (res) => {
        let userInfo = res.data.data;
        console.log("userInfo", userInfo);
        setUserInfo(userInfo);
        await AsyncStorage.setItem(tokenKey, userInfo.token);
        setIsLoading(false);
        setAuth(true);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        setIsLoading(false);
        setAuth(false);
      });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .get(`${BASE_URL}/logout`, {})
      .then(async (res) => {
        console.log(res.data);
        await AsyncStorage.removeItem(tokenKey);
        setUserInfo({
          token: "",
          user: {
            id: 0,
            nip: 0,
            nama: "",
            username: "",
            email: "",
            izin: 0,
            sakit: 0,
          },
          role: {
            divisi: "",
          },
        });
        setIsLoading(false);
        setAuth(false);
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        console.log(e.response.headers);
        setIsLoading(false);
      });
  };

  const checkToken = async (token: string) => {
    setIsLoading(true);

    axios
      .get<Response>(`${BASE_URL}/check-token?token=${token}`, {})
      .then(async (res) => {
        let userInfo = res.data.data;
        console.log("userInfo", userInfo);
        setUserInfo(userInfo);
        await AsyncStorage.setItem(tokenKey, token);
        setIsLoading(false);
        setAuth(true);
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        AsyncStorage.removeItem(tokenKey);
        setIsLoading(false);
        setAuth(false);
      });
  };

  if (isPreparingApp) return null;

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        login,
        logout,
        Auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
