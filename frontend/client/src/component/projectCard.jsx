import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title">{project.name}</h5>
              <a className="btn btn-gray" href={"/projects/${project.id"}>
                view
              </a>
            </div>
            <p className="card-text">
              status : <strong>{project.status}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
