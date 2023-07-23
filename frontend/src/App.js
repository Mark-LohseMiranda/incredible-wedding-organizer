import React, { useState } from "react";
// import API from "./utils/API";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
// import Background from "./components/Background/Background";
import DisplayWedding from "./components/Wedding/DisplayWedding";
import DisplayParty from "./components/Party/DisplayParty";
import Navbar from "./components/Navbar/Navbar";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Profile } from "./components/Profile/Profile";
import { About } from "./components/About/About";
import { UpdateProfile } from "./components/Profile/UpdateProfile";

export default function App() {
  const [userState, setUserState] = useState({
    firstname: "",
    email: "",
    id: "",
  });
  const [token, setToken] = useState();
  const [weddings, setWeddings] = useState();
  const [parties, setParties] = useState();
  const [weddingId, setWeddingId] = useState();
  const [guestId, setGuestId] = useState();
  const [guests, setGuests] = useState();
  const [gifts, setGifts] = useState();
  const [giftId, setGiftId] = useState();

  return (
    <div className="dark:bg-gray-700">
      <BrowserRouter>
        <Navbar
          userState={userState}
          setUserState={setUserState}
          setWeddings={setWeddings}
          setParties={setParties}
          setGuests={setGuests}
          setWeddingId={setWeddingId}
          setToken={setToken}
        />
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} setUserState={setUserState} />}
          />
          <Route
            path="/signup"
            element={<Signup setToken={setToken} setUserState={setUserState} />}
          />
          <Route
            path="/"
            element={
              <Home
                userState={userState}
                setUserState={setUserState}
                token={token}
                setToken={setToken}
                setWeddings={setWeddings}
              />
            }
          />
          <Route path="profile" element={<Profile userState={userState} />} />
          <Route
            path="/updateprofile"
            element={
              <UpdateProfile
                token={token}
                setToken={setToken}
                setUserState={setUserState}
              />
            }
          />
          <Route path="About" element={<About />} />
          <Route
            path="/weddings"
            element={
              <DisplayWedding
                token={token}
                weddings={weddings}
                setWeddings={setWeddings}
                setParties={setParties}
                setWeddingId={setWeddingId}
              />
            }
          />
          <Route
            path="/parties"
            element={
              <DisplayParty
                parties={parties}
                setParties={setParties}
                token={token}
                weddingId={weddingId}
                weddings={weddings}
                setWeddings={setWeddings}
              />
            }
          
          />
        </Routes>
        {/* <div className="py-10 px-5 md:p-10 h-screen bg-yellow-100 dark:bg-slate-800">
          <Background />
        </div> */}
      </BrowserRouter>
    </div>
  );
}
