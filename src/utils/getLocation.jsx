export const getMapLocation = (googleLocation) => {
    if (!googleLocation) {
      return;
    }

    try {
      const decodedLocation = googleLocation.replace(/\\/g, "");

      const cleanedGoogleLocation =
        decodedLocation.startsWith('"') && decodedLocation.endsWith('"')
          ? decodedLocation.slice(1, -1)
          : decodedLocation;

      const locationData = JSON.parse(cleanedGoogleLocation);

      const cleanedLocationData = {};
      Object.keys(locationData).forEach((key) => {
        const trimmedKey = key.trim();
        cleanedLocationData[trimmedKey] = locationData[key];
      });

      const { lat, long } = cleanedLocationData;

      if (lat && long) {
        const googleMapsUrl = `https://www.google.com/maps?q=${lat},${long}`;
        window.open(googleMapsUrl, "_blank");
      } else {
        console.log("Invalid location data");
      }
    } catch (error) {
      console.error("Failed to parse location data", error);
    }
  };