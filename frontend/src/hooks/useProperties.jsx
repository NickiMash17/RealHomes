import React from "react";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties",
    getAllProperties,
    { refetchOnWindowFocus: false }
  );
  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};

export default useProperties;
