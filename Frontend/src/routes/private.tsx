import { validateToken } from "@/Utils/ApiUtils";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateProps {
  children: React.JSX.Element;
}

export default function Private({ children }: PrivateProps) {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const validate = async () => {
    const status = await validateToken(token);
    console.log(status)
    if(!status) {
      logout();
      // navigate("/", { state: { redirectMessage: "Invalid Token"}})
    }
  } 

  useEffect(() => {
    validate();
  }, [])


  return(
    children
  )
}
