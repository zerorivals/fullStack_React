import React, { useState } from "react";
const SavedCandidates = () => {

// loading the candidates from localstorage
  const candidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
  const [savedCandidates, setSavedCandidates] = useState(candidates);
  

  return (
    <>
      <h1>Potential Candidates</h1>
      {/* create a table to display candidates info */}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Location</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate: any, index: number) => (
            <tr key={index}>
              <td>{candidate.username}</td>
              <td>{candidate.location}</td>
              <td><img src={candidate.image} alt="" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
