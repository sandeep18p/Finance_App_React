import react, { useState } from "react";
import "./styles.css"
import Input from "../Input/index.jsx";
import { toast } from "react-toastify";
import Button from "../Button/index.jsx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, doc, setDoc, db, getDoc, provider } from "../../firebase";

import { useNavigate } from "react-router-dom";




const SigninSignup = () => {
  const [loginForm, setLoginForm] = useState(false);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [password,setPassword]=useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function loginWithEmail() {
      setLoading(true);
      console.log(email, password);
  
      if (email === "" || password === "") {
        toast.error("All Fields are manadatory!");
        console.log("errr");
        setLoading(false);
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Login Successful!");
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          console.log("comming");
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(error.message);
          setLoading(false);
        });
    }

    function signInWithGoogle() {
      setLoading(true);
      try {
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("op ",user)
            createDoc(user);
            setLoading(false);
            navigate("/dashboard")
            toast.success("Google Authenticated!");
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData?.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            toast.error(error.message);
            setLoading(false);
            // ...
          });
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    }
    async function signupWithEmail() {
      setLoading(true);
  
      if (name === "" || email === "" || password === "") {
        toast.error("All Fields are mandatory!");
        setLoading(false);
        return;
      } else if (password !== confirmPassword) {
        toast.error("Password and Confirm Password should match!");
        setLoading(false);
        return;
      }
  
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await createDoc(user);
        toast.success("User Created Successfully!");
        setLoading(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }

  async function createDoc(user) {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Document created successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Document already exists!");
    }
  }
    return(
      <>
      {loginForm ? (<>
        <div className="singup-wrapper">
       <h2 className="title">Login on <span style={{color:"var(--theme)"}}>Financely.</span></h2>
      <form>
        
      <Input
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={"johndoe@mail.com"}
          />
          <Input
            type={"password"}
            label={"Password"}
            state={password}
            setState={setPassword}
            placeholder={"example1234"}
          />
          <Button
            text={loading ? "Loading..." : "Login using Email and Password"}
            onClick={loginWithEmail}
            disabled={loading}
          />
          <p style={{ textAlign: "center" }}>Or</p>
          <Button
            onClick={signInWithGoogle}
            text={loading ? "Loading..." : "Login Using Google"}
            blue={true}
            disabled={loading}
          />
          <p className="p-op" style={{cursor:"pointer"}} onClick={() => setLoginForm(false)}>
            Or Don't have an account? Click Here.
          </p>
        

      </form>
      </div>
      </>) : (<> <div className="singup-wrapper">
       <h2 className="title">Sign Up on <span style={{color:"var(--theme)"}}>Financely.</span></h2>
      <form>
        <Input label={"Full Name"} state={name} setState={setName} placeholder={"John Doe"}></Input>
        <Input type={email} label={"Email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"}></Input>
        <Input type={"password"} label={"Password"} state={password} setState={setPassword} placeholder={"JohnDoe@123"}></Input>
        <Input type={"password"} label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"JohnDoe@123"}></Input>
        <Button
            text={loading ? "Loading..." : "Signup using Email and Password"}
            onClick={signupWithEmail}
            disabled={loading}
          />
          <p style={{ textAlign: "center" }}>Or</p>
          <Button
            
            onClick={signInWithGoogle}
            text={loading ? "Loading..." : "Signup Using Google"}
            blue={true}
            disabled={loading}
          />
          <p className="p-op" style={{cursor:"pointer"}} onClick={() => setLoginForm(true)}>
            Or have an account already? Click Here.{" "}
          </p>

      </form>
      </div></>)}
     
    </>)
}

export default SigninSignup;