import React, { useContext, useState } from "react";
import Searchbar from "../components/Searchbar";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import Item from "../components/Item";
import UserDetailContext from "../context/UserDetailContext";

const Bookings = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {userDetails: {bookings}} = useContext(UserDetailContext)

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

  // console.log(data);
  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
        <div className="">
          <Searchbar filter={filter} setFilter={setFilter} />
          {/* container */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
            {
              // data.map((property, i) => ( <Item key={i} property={property} /> ))
              data.filter((property)=> bookings.map((booking)=> booking.id).includes(property.id))
                .filter((property) => 
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
                )
                .map((property, i) => (
                  <Item key={i} property={property} />
                )
              )
            }
          </div>
        </div>
      </div>
    </main>
  );
};

export default Bookings;
