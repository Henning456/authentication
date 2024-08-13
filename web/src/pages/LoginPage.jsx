import "./LoginPage.css";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSignIn } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";

export function LoginPage() {
  const { isSignedIn } = useUser();
  const { signIn, setActive } = useSignIn();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    try {
      const signInAttempt = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });
      console.log("Sign in worked");
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        console.log("Setting Session Id worked");
      } else {
        throw new Error("login failed");
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) console.log(err.errors);
      alert("Login failed");
    }

    setFormData({
      email: "",
      password: "",
    });
  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginPage;
