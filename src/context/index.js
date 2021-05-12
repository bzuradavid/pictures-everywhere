import React, { useState, useEffect, useContext, createContext } from "react";
import { useDatabase } from "../hooks/useDatabase";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [pictures, setPictures] = useState([]);
  const { createTableIfNotExists, loadPictures, persistPicture } =
    useDatabase();

  useEffect(() => {
    createTableIfNotExists();
    loadPictures(setPictures);
  }, []);

  const savePicture = async (base64) => {
    await persistPicture(pictures.length, base64);
    loadPictures(setPictures);
  };

  return (
    <AppContext.Provider value={{ pictures, savePicture }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

AppProvider.displayName = "AppProvider";
