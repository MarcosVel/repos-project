import React from "react";
import { useParams } from "react-router-dom";

function Repository() {
  const { repositorio } = useParams();

  return (
    <>
      <h1 style={{ color: "white" }}>
        {repositorio}
      </h1>
    </>
  );
}

export default Repository;
