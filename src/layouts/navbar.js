import React, {useEffect, useRef, useState} from "react";
import '../styles/navbar.css'
import {AiOutlineDown, AiOutlineMenu} from "react-icons/ai";
import image from '../assets/pp.jpg'
import {Link, useLocation} from "react-router-dom";
import {BeatLoader} from "react-spinners";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    // const [user, setUser] = useState('')

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const path=useLocation()
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }
    const [modal, setModal] = useState(false)
    const modalRef = useRef()
    const location=useLocation()
    const UserInfo=localStorage.user
    let user=JSON.parse(UserInfo?UserInfo:false)

    // useEffect(() => {
    //     try {
    //         const UserInfo=localStorage.user
    //         setUser(JSON.parse(UserInfo?UserInfo:false))
    //     } catch (e) {
    //         window.location.reload()
    //     }
    // }, []);


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
        localStorage.removeItem('admin')
        setLoading(false)
        window.location.replace('/anmeldung')
    }

    return (
        <nav style={{zIndex:'1'}} ref={modalRef} hidden={location.pathname.includes('anmeldung')|| location.pathname.includes('registrieren')}>
            <ul className="list">
                <li className='logo'>#DG-Projektportal</li>
                <li className='text-red mr-8'> 2.0 Beta</li>
                <li className='time'/>
                {
                    (toggleMenu || screenWidth > 1200) && (
                        <>
                            <Link to={'/'} onClick={toggleNav}>
                                <li  className={`items ${path.pathname==='/' && 'text-mainBlue'}`}>Dashboard</li>
                            </Link>
                            <Link to={'/neu'} onClick={toggleNav}>
                                <li className={`items ${path.pathname==='/neu' && 'text-mainBlue'}`}>Neu</li>
                            </Link>
                            <Link to={'/firmenprojekte-liste'} onClick={toggleNav}>
                                <li className={`items ${path.pathname.includes('/firmenprojekte') && 'text-mainBlue'}`}>Firmenprojekte</li>
                            </Link>
                            {
                                user?.role==='Internal' ?
                                    <Link to={'/benutzerverwaltung'}>
                                        <li className={`items ${path.pathname.includes('/benutzerverwaltung') && 'text-mainBlue'}`}>
                                            Benutzerverwaltung
                                        </li>
                                    </Link>
                                    :user?.role==='Supervisor' &&
                                    <Link to={'/bank-Kooperationspartner'}>
                                        <li className={`items ${path.pathname.includes('/bank-Kooperationspartner') && 'text-mainBlue'}`}>
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
                <button onClick={()=>setModal(!modal)} className='text-left p-1'> Einstellungen </button>
                <button onClick={logout} className='text-left p-1'> {!loading?'Ausloggen':<BeatLoader size={10} color={'#000000'}/>}</button>
            </div>
            <button onClick={toggleNav} className="btn"><AiOutlineMenu/></button>
        </nav>
    )
}

export default Navbar