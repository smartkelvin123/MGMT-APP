import React from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../component/spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";

const Project = () => {
  const { id } = useParams();
  console.log(id);

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: {
      id,
    },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error :(something is wrong)</p>;

  if (!data.project) {
    return <p>Project not found.</p>;
  }

  return (
    <div>
      <div className="mx-auto w-75 card p-5">
        <Link to="/" className="btn btn-light btn-sm w-25 mb-3">
          Back
        </Link>
        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>
        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{data.project.status}</p>
      </div>
    </div>
  );
};

export default Project;
