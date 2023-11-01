import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECT } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutation/projectMutation";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();
  //   const { loading, error, data } = useQuery(GET_PROJECT);
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id: projectId,
    },

    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECT }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2">
        <FaTrash
          className="icon"
          onClick={() => {
            deleteProject();
          }}
        />
        Delete project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
