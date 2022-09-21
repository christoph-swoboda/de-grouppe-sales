import React, {useEffect, useRef, useState} from "react";
import '../styles/navbar.css'
import {AiOutlineDown, AiOutlineMenu} from "react-icons/ai";
import image from '../assets/pp.jpg'
import {Link, useLocation} from "react-router-dom";
import {BeatLoader} from "react-spinners";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const path=useLocation()
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }
    const [modal, setModal] = useState(false)
    const modalRef = useRef()
    const location=useLocation()
    const UserInfo=localStorage.user
    const roleInfo=localStorage.role
    const role=JSON.parse(roleInfo?roleInfo:false)
    const user=JSON.parse(UserInfo?UserInfo:false)

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)
        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (!modalRef.current.contains(e.target)) {
                setModal(false)
            }
        })
    }, []);

    function logout(){
        setLoading(true)
        setModal(!modal)
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        setLoading(false)
        window.location.replace('/')
    }

    return (
        <nav style={{zIndex:'1'}} ref={modalRef} hidden={location.pathname==='/login'|| location.pathname==='/register'}>
            <ul className="list">
                <li className='logo'>#DG-Projektportal</li>
                <li className='time'>Firmenprojeckte | 22.04a</li>
                {
                    (toggleMenu || screenWidth > 1200) && (
                        <>
                            <Link to={'/'} onClick={toggleNav}>
                                <li  className={`items ${path.pathname==='/' && 'text-mainBlue'}`}>Dashboard</li>
                            </Link>
                            <Link to={'/new'} onClick={toggleNav}>
                                <li className={`items ${path.pathname==='/new' && 'text-mainBlue'}`}>New Creation</li>
                            </Link>
                            <Link to={'/bestant-list'} onClick={toggleNav}>
                                <li className={`items ${path.pathname.includes('/bestant') && 'text-mainBlue'}`}>Bestant</li>
                            </Link>
                            {
                                role==='Internal' ?
                                    <Link to={'/benutzerverwaltung'}>
                                        <li className={`items ${path.pathname.includes('/Benutzerverwaltung') && 'text-mainBlue'}`}>
                                            Benutzerverwaltung
                                        </li>
                                    </Link>
                                    :role==='BankManager' &&
                                    <Link to={'/Bank-Kooperationspartner'}>
                                        <li className={`items ${path.pathname.includes('/Bank-Kooperationspartner') && 'text-mainBlue'}`}>
                                            Bank-Kooperationspartner
                                        </li>
                                    </Link>
                            }

                            <li className='userInfo cursor-pointer' >
                                <img src={image} alt='image'/>
                                <div>
                                    <p onClick={() => setModal(!modal)}>{user?.fullname}</p>
                                    <p onClick={() => setModal(!modal)} className='text-xs'>{user?.email}</p>
                                </div>
                                <p className='cursor-pointer m-1'><AiOutlineDown onClick={() => setModal(!modal)}/></p>
                            </li>
                        </>
                    )
                }
            </ul>
            <div className={modal ? 'modal-logout' : 'hidden'}>
                <button onClick={()=>setModal(!modal)} className='text-left p-1'> Settings </button>
                <button onClick={logout} className='text-left p-1'> {!loading?'Log Out':<BeatLoader size={10} color={'#000000'}/>}</button>
            </div>
            <button onClick={toggleNav} className="btn"><AiOutlineMenu/></button>
        </nav>
    )
}

export default Navbar