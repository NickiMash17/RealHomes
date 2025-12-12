import React from "react";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    "allProperties",
    getAllProperties,
    { 
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useProperties;
