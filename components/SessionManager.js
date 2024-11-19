import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [sessionToken, setSessionToken] = useState(null);

  const checkSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem('session');
      const session = sessionData ? JSON.parse(sessionData) : null;

      if (session && session.token && session.user?.name) {
        setSessionToken(session.token);
      } else {
        setSessionToken(null);
      }
    } catch (error) {
      console.log('Error retrieving session data:', error);
    }
  };

  const login = async (session) => {
    try {
      await AsyncStorage.setItem('session', JSON.stringify(session));
      setSessionToken(session.token);
      checkSession();
    } catch (error) {
      console.log('Error saving session data:', error);
    }
  };

  const logout = async () => {
    console.log("inside logout");
    await AsyncStorage.removeItem('session');
    setSessionToken(null); 
    checkSession();
  };

  useEffect(() => {
    checkSession(); 
  }, []);

  return (
    <SessionContext.Provider value={{ sessionToken, login, checkSession, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
