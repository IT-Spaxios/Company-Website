import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchForm from './SearchForm';
import '../../Css/Header.css'
import { RiPencilFill } from 'react-icons/ri'
import { FaUserEdit } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { BsBookmarks } from 'react-icons/bs'
import SkeletonElement from '../Skeletons/SkeletonElement';
import { AuthContext } from '../../Context/AuthContext';
import { MdWork } from "react-icons/md"; // add this import

const Header = () => {
    const bool = localStorage.getItem("authToken") ? true : false
    const [auth, setAuth] = useState(bool)
    const { activeUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        setAuth(bool)
        setTimeout(() => {
            setLoading(false)
        }, 1600)

    }, [bool])


    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/')
    };

    return (

        <header>
            <div className="averager">

                <Link to="/" className="logo">
                    <h5>
                       ADMIN blog
                    </h5>
                </Link>
                <SearchForm />
                <div className='header_options'>

                    {auth ?
                        <div className="auth_options">


                            <Link className='addStory-link' to="/addstory"><RiPencilFill /> Add Story </Link>


                            <Link to="/readList" className='readList-link'>
                                <BsBookmarks />
                                <span id="readListLength">
                                     {activeUser?.readListLength ?? 0}
                                </span>
                            </Link>
                          <Link className='chatsubmit-link' to="/chat-section"> Chat Section </Link>

                            <div className='header-profile-wrapper '>


                                {loading ? <SkeletonElement type="minsize-avatar" />

                                    :

                                   <img
  src={activeUser.photo || '/default-avatar.png'}
  alt={activeUser.username}
/>

                                }


                                <div className="sub-profile-wrap  ">
                                    <Link className='profile-link' to="/profile"  > <FaUserEdit />  Profile </Link>
                                     <Link className='profile-link' to="/career"  >  <MdWork />  Career </Link>

                                    <button className='logout-btn' onClick={handleLogout}> <BiLogOut />  Logout</button>

                                </div>

                            </div>


                        </div>

                        :
                        <div className="noAuth_options">

                            <Link className='login-link' to="/login"> Login </Link>

                            <Link className='register-link' to="/register"> Get Started</Link>
                        </div>

                    }
                </div>

            </div>

        </header>

    )
}

export default Header;
