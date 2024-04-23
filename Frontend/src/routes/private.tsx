import { validateToken } from "@/Utils/ApiUtils"; // Corrected typo
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateProps {
  children: JSX.Element;
}

export default function Private({ children }: PrivateProps) {
  const { token, logout} = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    async function validate() {
      const status = await validateToken(token);
      if (!status) {
        logout();
        navigate("/", { state: { redirectMessage: "Invalid Token"}});
      }
    }

    validate();
  }, [token]);

  return <>{children}</>; 
}
