"use client";

import "leaflet/dist/leaflet.css";
import RoundedButton from "@/components/buttons/RoundedButton";
import Label from "@/components/form-fields/Label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRegisterStore } from "@/providers/register-provider";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { useRouter } from "next/navigation";
import L from "leaflet";
import { DialogClose } from "@radix-ui/react-dialog";

const customMarkerIcon = L.icon({
  iconUrl: "/static/marker.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Add this helper function to fetch address from lat/lng
async function fetchAddressFromLatLng(lat, lng, setAddress) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    const data = await response.json();
    if (data && data.display_name) {
      setAddress(data.display_name);
    }
  } catch (e) {
    // Optionally handle error
  }
}

const LocationSelector = ({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
  setAddress,
}) => {
  const [position, setPosition] = useState(() => {
    if (latitude && longitude) return [latitude, longitude];
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setPosition(coords);
          setLatitude(pos.coords.latitude);
          setLongitude(pos.coords.longitude);
          fetchAddressFromLatLng(
            pos.coords.latitude,
            pos.coords.longitude,
            setAddress,
          );
        },
        () => {},
        { enableHighAccuracy: true },
      );
    }
    return [33.6844, 73.0479]; // Default: Islamabad
  });

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
      fetchAddressFromLatLng(e.latlng.lat, e.latlng.lng, setAddress);
    },
  });

  return (
    <Marker
      position={position}
      icon={customMarkerIcon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const pos = marker.getLatLng();
          setPosition([pos.lat, pos.lng]);
          setLatitude(pos.lat);
          setLongitude(pos.lng);
          fetchAddressFromLatLng(pos.lat, pos.lng, setAddress);
        },
      }}
    />
  );
};

const LocationSelectionDialog = ({ trigger }) => {
  const router = useRouter();

  const {
    latitude,
    longitude,
    address,
    setLatitude,
    setLongitude,
    setAddress,
  } = useRegisterStore((state) => state);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="px-4 md:pt-0">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <Label text="Location" />
            <input
              type="text"
              className="h-10 min-w-60 rounded-md border border-[#F8F7FB] bg-[#F8F7FB] px-3 text-sm outline-none focus:border-moonstone"
              placeholder="Islamabad, Pakistan"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="h-[400px] w-full overflow-hidden rounded-xl md:h-[539px]">
            <MapContainer
              center={[latitude || 33.6844, longitude || 73.0479]}
              zoom={13}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationSelector
                latitude={latitude}
                longitude={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setAddress={setAddress}
              />
            </MapContainer>
          </div>
          <DialogClose asChild>
            <RoundedButton
              title="Confirm"
              showIcon
              className="h-12 w-[182px] self-center text-sm"
              icon={
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.42745 11.2197L6.10875 6.53843C6.35671 6.29046 6.4807 6.16648 6.4807 6.01241C6.4807 5.85834 6.35671 5.73436 6.10875 5.48639L1.42745 0.805093"
                    stroke="white"
                    strokeWidth="1.4878"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSelectionDialog;
