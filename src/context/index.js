import React, { useState, useEffect, useContext, createContext } from "react";
import { Platform } from "react-native";
import * as Location from "expo-location";
import * as SQLite from "expo-sqlite";

const AppContext = createContext(null);

const openDatabase = () => {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("pictures.db");
  return db;
};

const db = openDatabase();

console.log(db);

export const AppProvider = ({ children }) => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    // console.log(pictures);
  }, [pictures]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists pictures (id integer primary key not null, file text, location text);"
      );
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from pictures;`,
        [],
        (_, { rows: { _array } }) => {
          // console.log("PICTURES", _array);
          setPictures(_array);
        }
      );
    });
  }, []);

  const savePicture = async (base64) => {
    const location = await getCurrentLocation();
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into pictures (id, file, location) values (?, ?, ?)",
          [pictures.length, `data:image/png;base64,${base64}`, location],
          null,
          (transaction, result) => {
            console.log("RESULT", transaction, result);
          }
        );
      },
      null,
      null
    );
    db.transaction((tx) => {
      tx.executeSql(
        `select * from pictures;`,
        [],
        (_, { rows: { _array } }) => {
          setPictures(_array);
        }
      );
    });
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
