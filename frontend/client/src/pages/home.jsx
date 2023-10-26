import React from "react";

import AddClientModal from "../component/addClientModal";
import Clients from "../component/client";
import Project from "../component/project";

const Home = () => {
  return (
    <div>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
      </div>

      <Project />
      <hr />
      <Clients />
    </div>
  );
};

export default Home;
