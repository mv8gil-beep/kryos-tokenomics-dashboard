import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Landing";
import App from "./App";
import "./index.css";
import ThankYou from "./ThankYou";
import TokenomicsPage from "./pages/TokenomicsPage";
import FdvPage from "./pages/FdvPage";
import UnlockPage from "./pages/UnlockPage";
import ExampleReportPage from "./pages/ExampleReportPage";
import Success from "./pages/Success";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     <Routes>
       
       <Route path="/" element={<Landing />} />
       <Route path="/app" element={<App />} />
       <Route path="/success" element={<Success />} />
       <Route path="/tokenomics-analysis" element={<TokenomicsPage />} />
       <Route path="/fdv-crypto" element={<FdvPage />} />
       <Route path="/token-unlock-schedule" element={<UnlockPage />} />
       <Route path="/thank-you" element={<ThankYou />} />
       <Route path="/reports/example-token" element={<ExampleReportPage />} />
     </Routes>
    </BrowserRouter>
  </React.StrictMode>
);