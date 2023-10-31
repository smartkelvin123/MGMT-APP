import React from "react";
import { FaPhone, FaIdBadge, FaEnvelope } from "react-icons/fa";

const ClientInfo = ({ client }) => {
  return (
    <div className="card">
      <div className="card-header lead">Client Information</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <FaIdBadge className="lead" /> {client.name}
        </li>
        <li className="list-group-item">
          <FaEnvelope className="lead" /> {client.email}
        </li>
        <li className="list-group-item">
          <FaPhone className="lead" /> {client.phone}
        </li>
      </ul>
    </div>
  );
};

export default ClientInfo;
