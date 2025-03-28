import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";

const LuxoraMap = ({ card }) => {
  const location = card.location;
  const [coordinates, setCoordinates] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}`,
        {
          method: "GET",
          headers: {
            "User-Agent": "Luxora/1.0 (your-email@example.com)",
          },
        }
      );
      const data = await response.json();
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
    if (mapRef.current && coordinates) {
      mapRef.current.setView([coordinates.lat, coordinates.lon], 12);
    }
  }, [coordinates]);

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-gray-800 bg-white py-4">
        Where You'll Be
      </h1>
      <div className="w-full max-w-2xl mx-auto mt-4 relative z-0">
        <div className="overflow-hidden rounded-lg shadow-md border border-gray-300 relative z-0">
          <MapContainer
            center={
              coordinates ? [coordinates.lat, coordinates.lon] : [51.505, -0.09]
            }
            zoom={12}
            scrollWheelZoom={false}
            className="h-[300px] w-full relative z-0"
            ref={mapRef}
            style={{ position: "relative", zIndex: 0 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coordinates && (
              <Marker position={[coordinates.lat, coordinates.lon]}>
                <Popup>
                  <span className="font-semibold text-gray-800">
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
