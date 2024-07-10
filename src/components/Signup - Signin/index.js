import react, { useState } from "react";
import "./styles.css"
import Input from "../header/Input";
import Button from "../Button/index.jsx";

const SigninSignup = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [confirmPassowrd,setConfirmPassword]=useState("");
    const [password,setPassword]=useState("");
    const [loading, setLoading] = useState(false);

    function signInWithGoogle() {}
    function signupWithEmail() { console.log('asjdf')}
    return(<>
      <div className="singup-wrapper">
       <h2 className="title">Sign Up on <span style={{color:"var(--theme)"}}>Financely.</span></h2>
      <form>
        <Input label={"Full Name"} state={name} setState={setName} placeholder={"John Doe"}></Input>
        <Input type={email} label={"Email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"}></Input>
        <Input type={"password"} label={"Password"} state={password} setState={setPassword} placeholder={"JohnDoe@123"}></Input>
        <Input type={"password"} label={"Confirm Password"} state={confirmPassowrd} setState={setConfirmPassword} placeholder={"JohnDoe@123"}></Input>
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


      </form>
      </div>
    </>)
}

export default SigninSignup;