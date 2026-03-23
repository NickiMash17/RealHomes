import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Container, Modal, Stepper } from "@mantine/core";
import AddLocation from "./AddLocation";
import { useMockAuth } from '../context/MockAuthContext'
import UploadImage from "./UploadImage";
import BasicDetails from "./BasicDetails";
import Facilities from "./Facilities";

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useMockAuth();

  const initialPropertyDetails = useMemo(() => ({
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
    userEmail: user?.email || "",
  }), [user?.email]);

  const [propertyDetails, setPropertyDetails] = useState(initialPropertyDetails);

  // Reset step AND form data when modal closes
  useEffect(() => {
    if (!opened) {
      setActive(0);
      setPropertyDetails(initialPropertyDetails);
    }
  }, [opened, initialPropertyDetails]);

  // Sync user email if it loads after component mount
  useEffect(() => {
    if (user?.email) {
      setPropertyDetails((prev) => ({ ...prev, userEmail: user.email }));
    }
  }, [user?.email]);

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
      <Container h={"auto"} w={"100%"}>
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

AddPropertyModal.propTypes = {
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
};

export default AddPropertyModal;
