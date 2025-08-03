import React, { useContext, useEffect, useRef } from 'react'
import UserDetailContext from '../context/UserDetailContext'
import { useQuery } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllFav, getAllProperties } from '../utils/api'

const useFavourites = () => {
    
    const { userDetails, setUserDetails } = useContext(UserDetailContext)
    const queryRef = useRef()
    const { user, getAccessTokenSilently } = useAuth0()

    const { data: favIds, isLoading: favLoading, isError: favError, refetch: favRefetch } = useQuery({
        queryKey: "allFavourites",
        queryFn: async () => {
            const token = await getAccessTokenSilently()
            return getAllFav(user?.email, token)
        },
        onSuccess: (data) => setUserDetails((prev) => ({ ...prev, favourites: data })),
        enabled: user !== undefined,
        staleTime: 30000
    })

    const { data: allProperties, isLoading: propertiesLoading } = useQuery({
        queryKey: "allProperties",
        queryFn: () => getAllProperties(),
        staleTime: 30000
    })

    // Filter properties to only show favourited ones
    const favouriteProperties = allProperties?.filter(property => 
        favIds?.includes(property.id)
    ) || []

    queryRef.current = favRefetch;

    useEffect(() => {
        queryRef.current && queryRef.current()
    }, [userDetails?.token])

    return { 
        data: favouriteProperties, 
        isError: favError, 
        isLoading: favLoading || propertiesLoading, 
        refetch: favRefetch 
    }
}

export default useFavourites