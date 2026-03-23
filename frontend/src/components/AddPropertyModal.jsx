import React, { useState, useEffect } from "react";
import { Container, Modal, Stepper } from "@mantine/core";
import AddLocation from "./AddLocation";
import { useMockAuth } from '../context/MockAuthContext'
import UploadImage from "./UploadImage";
import BasicDetails from "./BasicDetails";
import Facilities from "./Facilities";

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useMockAuth();
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

  // Reset step to 0 when modal closes so it doesn't stay on "Completed" or previous step
  useEffect(() => {
    if (!opened) {
      setActive(0);
    }
  }, [opened]);

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"34rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Location" description="Address">
            <AddLocation
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Images" description="Upload">
            <UploadImage 
            prevStep={prevStep}
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Basics" description="Details">
            <BasicDetails 
            prevStep={prevStep}
            nextStep={nextStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Facilities" description="Amenities">
            <Facilities 
            prevStep={prevStep}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            setOpened={setOpened}
            setActiveStep={setActive}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

export default AddPropertyModal;
