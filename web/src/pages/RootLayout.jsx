import { NavBar } from "../components/NavBar";
import "./RootLayout.css";
import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default RootLayout;
