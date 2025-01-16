"use client";
import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

interface NavBarProps {
  setActiveSection: (section: string) => void;
}

export default function Price({ setActiveSection }: NavBarProps) {
  const [data, setData] = useState<any[]>([]);
  const [visibleService, setVisibleService] = useState("Static");
  const [serviceCategory, setServiceCategory] = useState("Front-End");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch("/api/services/get"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDiscount = (price: number, discount: number) => {
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  const toggleService = (name: string) => {
    setVisibleService(name);
  };

  const toggleCategory = (name: string) => {
    setServiceCategory(name);
  };

  const filteredServices = data.filter(
    (service) => service.category === serviceCategory
  );

  const selectedService = filteredServices.find(
    (service) => service.name === visibleService
  );

  return (
    <div className="w-full md:px-20 px-4 flex flex-col md:flex-row justify-between gap-8 md:pl-56">
      <div className="md:sticky top-10 text-start w-full md:w-1/3">
        <h1 className="text-base text-secondary">Pricing</h1>
        <h1 className="text-4xl font-bold">My Pricing</h1>
        <div className="w-full md:w-[30rem] bg-box-gradient-2 rounded-lg mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center rounded-xl shadow shadow-white/10">
            {["Front-End", "AI/ML"].map((name, index) => (
              <button
                key={index}
                className={`${
                  serviceCategory === name
                    ? "shadow-white/10 text-secondary shadow-md"
                    : ""
                } px-4 py-5 w-full text-center hover:shadow-white/10 hover:shadow-md hover:text-secondary rounded-xl font-bold text-xl transition-all duration-700`}
                onClick={() => toggleCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-[30rem] bg-box-gradient-2 rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <FaSpinner className="animate-spin-slow text-secondary text-4xl" />
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center rounded-xl shadow shadow-white/20">
              {filteredServices.map((service, index) => (
                <button
                  key={index}
                  className={`${
                    visibleService === service.name
                      ? "shadow-white/10 text-secondary shadow-md"
                      : ""
                  } px-4 py-5 w-full text-center hover:shadow-white/10 hover:shadow-md hover:text-secondary rounded-xl font-bold text-base transition-all duration-700`}
                  onClick={() => toggleService(service.name)}
                >
                  {service.name}
                </button>
              ))}
            </div>

            {selectedService && (
              <div className="text-white p-6 rounded-lg shadow-lg flex flex-col items-center mt-6">
                <p className="text-gray-400 mb-4">
                  {selectedService.description}
                </p>
                {selectedService.discount > 0 && (
                  <p className="text-red-500 text-sm mb-2">
                    Save {selectedService.discount}%!
                  </p>
                )}
                <div className="text-4xl font-bold text-red-500 mb-2">
                  $
                  {handleDiscount(
                    selectedService.price,
                    selectedService.discount
                  ).toFixed(2)}
                </div>
                {selectedService.discount > 0 && (
                  <div className="text-sm text-gray-500 line-through">
                    ${selectedService.price.toFixed(2)}
                  </div>
                )}
                <ul className="text-sm text-gray-300 my-4 space-y-1 text-start">
                  {selectedService.features.map((feature: any, idx: any) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>

                <button
                  className="mt-6 shadow-sm shadow-white/30 text-white px-4 py-2 rounded-lg font-bold hover:shadow-md hover:shadow-white/20"
                  onClick={() => {
                    setActiveSection("contact");
                  }}
                >
                  ORDER NOW →
                </button>
                <div className="text-xs text-gray-400 flex justify-between mt-2 w-1/2">
                  <p>{selectedService.delivery} Days</p>
                  <p>{selectedService.revision} Revisions</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
