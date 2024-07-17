import react, { useEffect } from "react";
import styles from "./styles.css"
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import userImg from '../../assets/user.svg'




const Header =()=>{

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  function logout() {
    signOut(auth)
      .then(() => {
        toast.success("Logged out!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
    return(<>
     <div className="navbar">
     <p className="logo">Financely</p>
     {user && (<div className="logo_div">
        <img src={user.photoURL ? user.photoURL:userImg} alt="" />
        <p onClick={logout} className="link">
          Logout
        </p>
        </div>)}
     </div>
    </>)
}

export default Header;