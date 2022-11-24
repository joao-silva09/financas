import React from "react";
import { Navigate } from "react-router-dom";
import { GetToken } from "../../utils/GetToken";

export default function Home() {
  const token = GetToken();

  return (
    <div>
      {/* {setTimeout(() => {
        if (!token) {
          return <Navigate to="/login" />;
        }
      }, 50)} */}
    </div>
  );
}
