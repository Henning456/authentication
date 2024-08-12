import "./HomePage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { ContentBox } from "../components/ContentBox";

const apiUrl = "http://localhost:3000/";

export function HomePage() {
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
      <h1>Home</h1>
      <p>
        This is <strong>public</strong> content!
      </p>
      <p>It should be visible for all users.</p>
      <ContentBox title="API Content">
        <p>{JSON.stringify(apiData)}</p>
        {error && <p>{error}</p>}
      </ContentBox>
    </>
  );
}

export default HomePage;
