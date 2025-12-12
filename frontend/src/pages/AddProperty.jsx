import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Stepper } from '@mantine/core'
import AddLocation from '../components/AddLocation'
import { useMockAuth } from '../context/MockAuthContext'
import UploadImage from '../components/UploadImage'
import BasicDetails from '../components/BasicDetails'
import Facilities from '../components/Facilities'
import { motion } from 'framer-motion'

const AddProperty = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const { user, isAuthenticated } = useMockAuth()
  const [propertyDetails, setPropertyDetails] = useState({
    title: '',
    description: '',
    price: 0,
    country: '',
    city: '',
    address: '',
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: user?.email,
  })

  // Update userEmail when user changes
  useEffect(() => {
    if (user?.email) {
      setPropertyDetails(prev => ({
        ...prev,
        userEmail: user.email
      }))
    }
  }, [user?.email])

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current))
  }
  
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current))
  }

  // Show loading or error state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to list your property
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
        >
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              List Your Property
            </h1>
            <p className="text-gray-600">
              Add your property to our premium listings in just a few simple steps
            </p>
          </div>

          <Container w="100%" p={0}>
            <Stepper
              active={active}
              onStepClick={setActive}
              breakpoint="sm"
              allowNextStepsSelect={false}
              size="sm"
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
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Property Added Successfully!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your property has been listed and is now visible to potential buyers.
                  </p>
                  <motion.button
                    onClick={() => {
                      setActive(0)
                      setPropertyDetails({
                        title: '',
                        description: '',
                        price: 0,
                        country: '',
                        city: '',
                        address: '',
                        image: null,
                        facilities: {
                          bedrooms: 0,
                          parkings: 0,
                          bathrooms: 0,
                        },
                        userEmail: user?.email,
                      })
                      navigate('/listing')
                    }}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
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
  )
}

export default AddProperty