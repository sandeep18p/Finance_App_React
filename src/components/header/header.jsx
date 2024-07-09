import react from "react";
import styles from "./styles.css"

function logout() {
    // auth.signOut();
    // navigate("/");
  }

const Header =()=>{
    return(<>
     <div className="navbar">
     <p className="logo">Financely</p>
     <p className="logo link" onClick={logout}>logout</p>
     </div>
    </>)
}

export default Header;