import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Home } from "../src/components/screens/Home/Home";


export const ProtectedRoutes = () => {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};
