import { useNavigate } from 'react-router-dom';
import { useEffect } from "react"

const Logout = ({onLogout}) => {
    const navigate = useNavigate();
    useEffect(() => {
      const performLogout = async () => {
        await onLogout();
        navigate("/");
      };
      performLogout();
    }, [navigate, onLogout]); 
    return null;
};
export default Logout