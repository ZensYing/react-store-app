import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface DeliveryAddressProps {
    onConfirm: (address: DeliveryAddress) => void;
    onCancel: () => void;
}

export interface DeliveryAddress {
    lat: number;
    lng: number;
    address: string;
    notes: string;
    phone: string;
}

// Custom green marker icon with better visibility
const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
    <div style="
      width: 30px;
      height: 30px;
      background: #16a34a;
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      position: relative;
      transform: translate(-50%, -50%);
    ">
      <div style="
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "></div>
    </div>
  `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
});

// Component to update map center when position changes
function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, 15, {
            animate: true,
            duration: 1,
        });
    }, [center, map]);

    return null;
}

function LocationMarker({ position, setPosition }: any) {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    return position ? <Marker position={position} icon={customIcon} /> : null;
}

export function DeliveryAddressSelector({ onConfirm, onCancel }: DeliveryAddressProps) {
    const [position, setPosition] = useState<[number, number]>([13.7563, 100.5018]); // Bangkok default
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [phone, setPhone] = useState("");
    const [isLocating, setIsLocating] = useState(false);
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);

    // Reverse geocode coordinates to get address
    const reverseGeocode = async (lat: number, lng: number) => {
        setIsLoadingAddress(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();

            if (data.display_name) {
                setAddress(data.display_name);
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        } finally {
            setIsLoadingAddress(false);
        }
    };

    // Get user's current location on mount
    useEffect(() => {
        if (navigator.geolocation) {
            setIsLocating(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const newPosition: [number, number] = [pos.coords.latitude, pos.coords.longitude];
                    setPosition(newPosition);
                    reverseGeocode(pos.coords.latitude, pos.coords.longitude);
                    setIsLocating(false);
                },
                () => {
                    setIsLocating(false);
                }
            );
        }
    }, []);

    // Update address when position changes (from map click or current location button)
    const handlePositionChange = (newPosition: [number, number]) => {
        setPosition(newPosition);
        reverseGeocode(newPosition[0], newPosition[1]);
    };

    const handleConfirm = () => {
        if (!address || !phone) {
            alert("Please fill in all required fields");
            return;
        }

        onConfirm({
            lat: position[0],
            lng: position[1],
            address,
            notes,
            phone,
        });
    };

    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                animate={{ y: 0 }}
                className="w-full bg-white dark:bg-gray-900 rounded-t-3xl max-h-[90vh] overflow-hidden"
                initial={{ y: "100%" }}
                transition={{ type: "spring", damping: 25 }}
            >
                <Card className="border-0 rounded-t-3xl">
                    <CardHeader className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Delivery Address
                        </h3>
                        <button
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                            onClick={onCancel}
                        >
                            <svg
                                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M6 18L18 6M6 6l12 12"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                />
                            </svg>
                        </button>
                    </CardHeader>

                    <CardBody className="p-0 overflow-y-auto max-h-[calc(90vh-80px)]">
                        {/* Map Section */}
                        <div className="relative h-64 w-full">
                            <MapContainer
                                center={position}
                                className="h-full w-full"
                                zoom={15}
                                zoomControl={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <MapUpdater center={position} />
                                <LocationMarker position={position} setPosition={handlePositionChange} />
                            </MapContainer>

                            {/* Current Location Button */}
                            <button
                                className="absolute bottom-4 right-4 z-[1000] w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700"
                                disabled={isLocating}
                                onClick={() => {
                                    if (navigator.geolocation) {
                                        setIsLocating(true);
                                        navigator.geolocation.getCurrentPosition(
                                            (pos) => {
                                                const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
                                                setPosition(newPos);
                                                reverseGeocode(pos.coords.latitude, pos.coords.longitude);
                                                setIsLocating(false);
                                            },
                                            () => setIsLocating(false)
                                        );
                                    }
                                }}
                            >
                                <svg
                                    className={`w-5 h-5 text-green-600 ${isLocating ? "animate-spin" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                    />
                                    <path
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Address Form */}
                        <div className="p-4 space-y-4">
                            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-3">
                                <p className="text-xs text-green-700 dark:text-green-300">
                                    📍 Tap on the map to select your delivery location
                                </p>
                            </div>

                            <Input
                                isRequired
                                label="Phone Number"
                                placeholder="+1 234 567 8900"
                                type="tel"
                                value={phone}
                                variant="bordered"
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <Textarea
                                isRequired
                                description={isLoadingAddress ? "Loading address..." : "Auto-filled from your location"}
                                isDisabled={isLoadingAddress}
                                label="Delivery Address"
                                placeholder="Enter your street address, building name, floor, etc."
                                rows={3}
                                value={address}
                                variant="bordered"
                                onChange={(e) => setAddress(e.target.value)}
                            />

                            <Textarea
                                label="Delivery Notes (Optional)"
                                placeholder="Any special instructions for delivery..."
                                rows={2}
                                value={notes}
                                variant="bordered"
                                onChange={(e) => setNotes(e.target.value)}
                            />

                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                    Selected Location:
                                </p>
                                <p className="text-xs font-mono text-gray-800 dark:text-gray-200">
                                    {position[0].toFixed(6)}, {position[1].toFixed(6)}
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    className="flex-1"
                                    color="default"
                                    variant="bordered"
                                    onPress={onCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-green-600 text-white font-bold"
                                    onPress={handleConfirm}
                                >
                                    Confirm Location
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </motion.div>
    );
}
