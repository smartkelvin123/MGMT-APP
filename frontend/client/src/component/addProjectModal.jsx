import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { ADD_CLIENT } from "../mutation/clientMuataion";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new"); // the value of "new" is for "Not Started"

  //   const [addProject] = useMutation(ADD_PROJECT, {
  //     update(cache, { data: { addProject } }) {
  //       const { projects } = cache.readQuery({ query: GET_PROJECTS });
  //       cache.writeQuery({
  //         query: GET_PROJECTS,
  //         data: {
  //           projects: projects.concat(addProject),
  //         },
  //       });
  //     },
  //   });

  const onSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }

    // addProject({
    //   variables: {
    //     name,
    //     description,
    //     status,
    //   },
    // });

    setName("");
    setDescription("");
    setStatus("new"); // Reset the status to "Not Started"
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModalLabel"
      >
        <div className="d-flex align-items-center">
          <FaList className="icon" />
          <div>New project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addProjectModalLabel"
        tabIndex="-1"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addProjectModalLabel">
                New Project
              </h1>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="nameHelp"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    aria-describedby="descriptionHelp"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
