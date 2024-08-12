import "./ProfilePage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { ContentBox } from "../components/ContentBox";

const apiUrl = "http://localhost:3000/profile";

export function ProfilePage() {
  const [apiData, setApiData] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        setError("");
        const { data } = await axios.get(apiUrl);
        setApiData(data);
      } catch (error) {
        console.log(error);
        setError("Error fetching data.");
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <h1>🔒 Profile 🔒</h1>
      <p>
        This is <strong>protected</strong> content!
      </p>
      <p>It should only be visible for the logged in user.</p>
      <ContentBox title="API Content">
        <p>{JSON.stringify(apiData)}</p>
        {error && <p>{error}</p>}
      </ContentBox>
    </>
  );
}

export default ProfilePage;
