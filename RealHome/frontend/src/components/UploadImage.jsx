import { Button, Group } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

const UploadImage = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleNext = ()=> {
    setPropertyDetails((prev)=> ({...prev, image: imageURL}));
    nextStep();
  }

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dgw3dfacb",
        uploadPreset: "v6x2jdei",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className="mt-12 flex-col flexCenter">
      {!imageURL ? (
        <div
          onClick={() => widgetRef.current?.open()}
          className="flexCenter flex-col w-3/4 h-[21rem] border-dashed border-2 cursor-pointer"
        >
          <MdOutlineCloudUpload size={44} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          onClick={() => widgetRef.current?.open()}
          className="w-3/4 h-[22rem] rounded-xl cursor-pointer overflow-hidden"
        >
          <img src={imageURL} alt="" className="h-full w-full object-cover" />
        </div>
      )}

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={handleNext} disabled={!imageURL}>Next</Button>
      </Group>
    </div>
  );
};

export default UploadImage;
