import Header from "../../_components/Header";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default layout;
