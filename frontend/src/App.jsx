import Header from "./components/Header/Header";
import "./App.css";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import userService from "./backendConnect/user";
import Store from "./components/Store/Store";

function App() {
  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      const response = await userService.login("one@gmail.com", "1234567");
      console.log("API Response:", response);
      setData(response); // Update state with the resolved data
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Store />
      <Footer />
    </>
  );
}

export default App;
