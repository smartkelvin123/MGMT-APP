import React from "react";

import AddClientModal from "../component/addClientModal";
import Clients from "../component/client";
import Project from "../component/project";
import AddProjectModal from "../component/addProjectModal";

const Home = () => {
  return (
    <div>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>

      <Project />
      <hr />
      <hr />
      <Clients />
    </div>
  );
};

export default Home;
