import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

export const openDatabase = () => {
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