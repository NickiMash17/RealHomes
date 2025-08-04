import React, { useState, useEffect } from "react";
import { useMockAuth } from "../context/MockAuthContext";
import { motion } from "framer-motion";
import { FaHeart, FaMapMarkerAlt, FaStar, FaCrown, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { PROPERTIES } from "../constant/data";
import Searchbar from "../components/Searchbar";
import useFavourites from "../hooks/useFavourites";
import { PuffLoader } from "react-spinners";
import Item from "../components/Item";
import UserDetailContext from "../context/UserDetailContext";

const Favourites = () => {
  const { data, isError, isLoading } = useFavourites();
  const [filter, setFilter] = useState("");
  const { isAuthenticated, loginWithRedirect } = useMockAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) {
    return (
      <div className="h-64 flexCenter">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#555"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#555"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
        <div className="">
          <Searchbar filter={filter} setFilter={setFilter} />
          {/* container */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
            {
              data?.filter((property) => 
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((property, i) => (
                <Item key={i} property={property} />
              ))
            }
          </div>
          {data?.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">No favorites found. Start adding properties to your favorites!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Favourites;
