import * as Location from "expo-location";

export const getCurrentLocation = async () => {
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
