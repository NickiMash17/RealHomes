import { useMockAuth } from "../context/MockAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuthCheck = () => {
  const { isAuthenticated } = useMockAuth();
  const navigate = useNavigate();

    const validateLogin = () => {
        if(!isAuthenticated){
            toast.error("Please Login first", {position: "bottom-right"})
            return false
        } else return true
    }
  return {
    validateLogin
  }
}

export default useAuthCheck