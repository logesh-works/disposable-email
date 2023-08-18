import './App.css';
import Mail from './Components/Mail';
import { Routes, Route } from 'react-router-dom';
import Viewmail from './Components/Viewmail';
import {useState} from 'react'
import userEvent from '@testing-library/user-event';
import {CgWebsite} from 'react-icons/cg'
import {BsLinkedin} from 'react-icons/bs'
import Modal from './Components/popup';
function App() {
  const [mailofid , SetMailofid] = useState()
  const [domainn , Setdomain] = useState()
  const [emailname ,Setemailname] = useState()
  const getid = (id,dm,nm) => {SetMailofid(id)
  Setdomain(dm)
  Setemailname(nm)
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="App">
      <Routes>
      <Route index  element={<Mail mailid={getid}/>} />
      <Route path="mailview" element = {<Viewmail id={mailofid} dom = {domainn} nameemail = {emailname}/>} />

      </Routes>
      <center>
      <div>
      <button onClick={openModal}>Plese Read this instructions </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
      <footer>
      <div class="footer">
      
    <div>
    <p></p>
      <a href="https://linktr.ee/me_logi">&copy; 2023. Created by @Logesh.</a>
    </div>
    
  </div>
      </footer>
      </center>
    </div>
    
  );
}

export default App;
