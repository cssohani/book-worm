import { useState } from 'react'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { useNavigate, Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa'
import * as GiIcons from 'react-icons/gi'
import axios from 'axios'


const MenuBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try{
      await axios.post("http://localhost:8080/logout", {}, 
        {
          withCredentials : true
        }
      )
      navigate("/")
    }catch(error){
      console.log("Error logging out", error.response?.data || error.message);
    }
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bg-dark col-auto col-md-5 min-vh-100">
          
          <h5 className="text-decoration-none text-white align-item-center">Book Worm</h5>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item text-white fs-4">
              
              <a href="/search-books" className="nav-link text-white fs-5" aria-current="page"><span><FaIcons.FaSearch /></span>  Search Books</a>
            </li>
            <li className="nav-item text-white fs-4">
              <a href="/my-books" className="nav-link text-white fs-5" aria-current="page"><span><FaIcons.FaBookOpen /></span>  My Books</a>
            </li>
            <li className="nav-item text-white fs-4">
              <Link onClick={handleLogout} className="nav-link text-white fs-5" aria-current="page">Logout</Link>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};



export default MenuBar