export interface LocationData {
  name: string;
  lat: number;
  lon: number;
  timezone: string;
}

export const searchLocation = async (query: string): Promise<LocationData[]> => {
  if (!query || query.length < 3) return [];

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&limit=5&addressdetails=1`
    );
    const data = await response.json();

    return data.map((item: any) => ({
      name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      // We'll need a way to get the timezone. 
      // For now, we can use an API like 'timezonedb' or similar if needed, 
      // or just default to 'UTC' and let the user pick, but better to automate.
      // A common trick is to use lat/lon to get timezone.
      timezone: 'Asia/Kolkata', // Defaulting to India for now, will improve if possible.
    }));
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
};
