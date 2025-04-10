import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {

  // const currentCandidate = {
  //   username: "octocat",
  //   location: "San Francisco",
  //   image: "https://placehold.co/200",
  // }

  const [currentCandidate, setCurrentCandidate] = useState({
    username: "octocat",
    location: "San Francisco",
    image: "https://placehold.co/200",
  });

  const [candidates, setCandidates] = useState<any[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    async function getCandidates() {
      const data = await searchGithub();

      setCandidates(data);

    }

    getCandidates();

  }, [])


  useEffect(() => {
    async function getCandidateDetails() {
      const data = await searchGithubUser(candidates[currentIndex]?.login || "octocat")

      setCurrentCandidate({
        username: data.login,
        location: data.location || "No location found",
        image: data.avatar_url,
      })
    }

    getCandidateDetails()

  }, [candidates, currentIndex])


  function nextCandidate() {
    
    // if reachead the end of list, do not show next candidate
    
    
    
    setCurrentIndex(currentIndex + 1)


    
  }


  return (
    <div>
      <h1>CandidateSearch</h1>
      <div className='card'>
        <img src={currentCandidate.image} alt="" />

        <h2>{currentCandidate.username}</h2>

        <p>Location: {currentCandidate.location}</p>

      </div>

      <div className="button-container">
        <button
          onClick={() => {
            nextCandidate()
          }}
        >Red</button>
        <button onClick={() => {
          // save candidate to local storage
          const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
          savedCandidates.push(currentCandidate);
          localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
          nextCandidate()
        }}>Green</button>


      </div>


    </div>
  );
};

export default CandidateSearch;
