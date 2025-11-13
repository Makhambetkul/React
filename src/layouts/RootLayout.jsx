import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Layout.css";


export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
