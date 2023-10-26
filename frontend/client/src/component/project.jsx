import React from "react";
import Spinner from "./spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./projectCard";

const Project = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <p>Error :(something is wrong)</p>;
  return (
    <div>
      {data.projects.length > 0 ? (
        data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
};

export default Project;
