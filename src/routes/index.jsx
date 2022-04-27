import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../views/Main";
import Header from "../views/Header";
import HomePage from "../views/Home";
// import MainLayout from "../views/components/MainLayout";
// import HomePage from "../views/pages/Home";
// import AuthPage from "../views/pages/Auth";
// import QuestionPage from "../views/components/Question";

const AppRouter = () => {
  return (
    <>
      {/* <MainLayout /> */}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
        {/* <Route path="/auth" element={<AuthPage />} />
        <Route path="question/:qId" element={<QuestionPage />} /> */}
      </Routes>
    </>
  );
};

export default AppRouter;
