import { getCurrentLocation } from "../utils/location";
import { openDatabase } from "../utils/database";

const db = openDatabase();

export const useDatabase = () => {
  const createTableIfNotExists = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists pictures (id integer primary key not null, file text, location text);"
      );
    });
  };

  const loadPictures = (setPictures) => {
    db.transaction((tx) => {
      tx.executeSql(`select * from pictures;`, [], (_, { rows: { _array } }) =>
        setPictures(_array)
      );
    });
  };

  const persistPicture = async (id, base64) => {
    const location = await getCurrentLocation();
    db.transaction((tx) => {
      tx.executeSql(
        "insert into pictures (id, file, location) values (?, ?, ?)",
        [id, `data:image/png;base64,${base64}`, location]
      );
    });
  };

  return { createTableIfNotExists, loadPictures, persistPicture };
};
