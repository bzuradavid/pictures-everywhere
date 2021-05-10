import React, { useState, useEffect, useContext, createContext } from "react";
import * as Location from "expo-location";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [pictures, setPictures] = useState([]);

  const savePicture = async (base64) => {
    const location = await getCurrentLocation();
    setPictures([
      ...pictures,
      {
        id: pictures.length,
        file: `data:image/png;base64,${base64}`,
        location,
      },
    ]);
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return "No se pudo determinar la ubicación";
      }

      const geoLocation = await Location.getCurrentPositionAsync({
        accuracy: 3,
      });
      const [currentLocation] = await Location.reverseGeocodeAsync({
        latitude: geoLocation.coords.latitude,
        longitude: geoLocation.coords.longitude,
      });

      const subregion =
        !!currentLocation && !!currentLocation.subregion
          ? `${currentLocation.subregion} ,`
          : "";

      const region =
        !!currentLocation && !!currentLocation.region
          ? `${currentLocation.region}`
          : "";

      return `${subregion}${region}`;
    } catch (err) {
      console.warn(err);
      return "No se pudo determinar la ubicación";
    }
  };

  return (
    <AppContext.Provider value={{ pictures, setPictures, savePicture }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

AppProvider.displayName = "AppProvider";
