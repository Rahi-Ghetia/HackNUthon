// import './App.css';
import { useState, useEffect } from 'react';
import VideosTemplates from './VideosTemplates';
import AskForVideo from './AskForVideo';
import SelectedVideoOpen from './SelectedVideoOpen';

function App() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState("home");
  const [username, setUserName] = useState("Rahi")

  const [videoOpend, setVideoOpen] = useState("")
  const [videoOpendPath, setVideoOpenPath] = useState("")

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/getAllContents/');
        if (!response.ok) {
          throw new Error('Http Response Error');
        }
        const data = await response.json();
        setContent(() => data)
      } catch (error) {
        console.error(error);
      }
    }
    getData()
  }, []);

  const getPageData = () => {
    if (page == 'home') {
      console.log(content);
      return <VideosTemplates videos={content} username={username} setVideoOpen={setVideoOpen} setPage={setPage} setVideoOpenPath={setVideoOpenPath}></VideosTemplates>
    } else if (page == 'upload') {
      return <AskForVideo setContent={setContent} username={username}></AskForVideo>
    } else if (page == 'video') {
      return <SelectedVideoOpen videoOpend={videoOpend} path={videoOpendPath}></SelectedVideoOpen>
    } else if (page == 'profile') {
    } else if (page == 'login') {
    } else if (page == 'logout') {
    } else {
      return <div>Loading</div>
    }
  }

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg bg-dark text-white">
        <div className="container-fluid text-white">
          <a className="navbar-brand text-white fs-4" href="#">Logo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i className="bi bi-segmented-nav text-white"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav flex-row ">
              <li className="nav-item">
                <button className='btn nav-link text-white' onClick={() => setPage("home")}>Home</button>
              </li>
              <li className="nav-item">
                <button className='btn nav-link text-white' onClick={() => setPage("upload")}>Upload</button>
              </li>
              <li className="nav-item">
                <button className='btn nav-link text-white' onClick={() => setPage("upload")}>Profile</button>
              </li>
              <li className="nav-item">
                <div className="input-group d-flex">
                  <input type="text" className="form-control bg-secondary-subtle" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                  <span className="input-group-text bg-secondary-subtle" id="basic-addon1"><i className="bi bi-search"></i></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {getPageData()}
    </div>
  );
}

export default App;
