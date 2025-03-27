import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";

const LuxoraMap = ({ card }) => {
  const location = card.location;
  const [coordinates, setCoordinates] = useState(null);
  const mapRef = useRef(null); //Reference for the map

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}`,
        {
          method: "GET",
          headers: {
            "User-Agent": "Luxora/1.0 (your-email@example.com)", //prevent rate-limiting
          },
        }
      );
      const data = await response.json();
      console.log("API Response:", data);
      if (!data.length) {
        console.error("No coordinates found for:", location);
        return;
      }
      setCoordinates({
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      });
    };
    fetchCoordinates();
  }, [location]);

  useEffect(() => {
    console.log("Updated Coordinates:", coordinates);
    if (mapRef.current && coordinates) {
      mapRef.current.setView([coordinates.lat, coordinates.lon], 10); //update map center
    }
  }, [coordinates]);

  return (
    <>
      <h1 className="text-center text-3xl font-semibold text-red-500 bg-white p-4">
        Where You'll Be
      </h1>
      <div className="w-full max-w-4xl mx-auto mt-6">
        <div className="overflow-hidden rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
          <MapContainer
            center={
              coordinates ? [coordinates.lat, coordinates.lon] : [51.505, -0.09]
            }
            zoom={10}
            scrollWheelZoom={false}
            className="h-[400px] w-full"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coordinates && (
              <Marker position={[coordinates.lat, coordinates.lon]}>
                <Popup>
                  <span className="font-semibold text-gray-800 dark:text-gray-300">
                    A luxury stay awaits you.
                  </span>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default LuxoraMap;
