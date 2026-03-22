import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Stepper } from "@mantine/core";
import AddLocation from "../components/AddLocation";
import { useMockAuth } from "../context/MockAuthContext";
import UploadImage from "../components/UploadImage";
import BasicDetails from "../components/BasicDetails";
import Facilities from "../components/Facilities";
import { motion } from "framer-motion";
import { FaLock, FaCheckCircle } from "react-icons/fa";

const AddProperty = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const { user, isAuthenticated } = useMockAuth();
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: user?.email,
  });

  // Update userEmail when user changes
  useEffect(() => {
    if (user?.email) {
      setPropertyDetails((prev) => ({
        ...prev,
        userEmail: user.email,
      }));
    }
  }, [user?.email]);

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  // Auth required screen
  if (!isAuthenticated) {
    return (
      <div className="bg-ivory-200 min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-ivory-300 shadow-md p-12 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-navy-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaLock className="text-navy-700 text-2xl" />
          </div>
          <h2 className="font-display font-bold text-2xl text-charcoal-900 mb-3">
            Authentication Required
          </h2>
          <p className="text-neutral-600 mb-8">
            Please log in to list your property
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-navy-700 hover:bg-navy-800 text-white rounded-xl font-semibold transition-all shadow-navy"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory-200 min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-ivory-300 shadow-md p-6 sm:p-8"
        >
          {/* Hero Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              New Listing
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-charcoal-900 mb-2">
              List Your Property
            </h1>
            <p className="text-neutral-600 text-sm">
              Add your property to our premium listings in just a few simple
              steps
            </p>
          </div>

          <Container w="100%" p={0}>
            <Stepper
              active={active}
              onStepClick={setActive}
              breakpoint="sm"
              allowNextStepsSelect={false}
              size="sm"
              classNames={{
                step: "data-[completed]:before:bg-navy-700",
                stepIcon:
                  "border-navy-700 data-[completed]:bg-navy-700 data-[completed]:border-navy-700 data-[progress]:border-gold-600",
                separator: "data-[active]:bg-navy-700",
              }}
            >
              <Stepper.Step label="Location" description="Address">
                <div className="py-6 min-h-[400px]">
                  <AddLocation
                    nextStep={nextStep}
                    propertyDetails={propertyDetails}
                    setPropertyDetails={setPropertyDetails}
                  />
                </div>
              </Stepper.Step>

              <Stepper.Step label="Images" description="Upload">
                <div className="py-6 min-h-[400px]">
                  <UploadImage
                    prevStep={prevStep}
                    nextStep={nextStep}
                    propertyDetails={propertyDetails}
                    setPropertyDetails={setPropertyDetails}
                  />
                </div>
              </Stepper.Step>

              <Stepper.Step label="Basics" description="Details">
                <div className="py-6 min-h-[400px]">
                  <BasicDetails
                    prevStep={prevStep}
                    nextStep={nextStep}
                    propertyDetails={propertyDetails}
                    setPropertyDetails={setPropertyDetails}
                  />
                </div>
              </Stepper.Step>

              <Stepper.Step label="Facilities" description="Amenities">
                <div className="py-6 min-h-[400px]">
                  <Facilities
                    prevStep={prevStep}
                    propertyDetails={propertyDetails}
                    setPropertyDetails={setPropertyDetails}
                    setOpened={null}
                    setActiveStep={setActive}
                    onSuccess={() => setActive(4)}
                  />
                </div>
              </Stepper.Step>

              <Stepper.Completed>
                <div className="py-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="text-green-500 text-4xl" />
                  </div>
                  <h2 className="font-display font-bold text-2xl text-charcoal-900 mb-2">
                    Property Added Successfully!
                  </h2>
                  <p className="text-neutral-600 mb-8">
                    Your property has been listed and is now visible to
                    potential buyers.
                  </p>
                  <motion.button
                    onClick={() => {
                      setActive(0);
                      setPropertyDetails({
                        title: "",
                        description: "",
                        price: 0,
                        country: "",
                        city: "",
                        address: "",
                        image: null,
                        facilities: {
                          bedrooms: 0,
                          parkings: 0,
                          bathrooms: 0,
                        },
                        userEmail: user?.email,
                      });
                      navigate("/listing");
                    }}
                    className="px-8 py-3 bg-navy-700 hover:bg-navy-800 text-white rounded-xl font-semibold transition-all shadow-navy"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View All Properties
                  </motion.button>
                </div>
              </Stepper.Completed>
            </Stepper>
          </Container>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProperty;
