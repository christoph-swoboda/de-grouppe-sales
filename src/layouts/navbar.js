import React, {useEffect, useRef, useState} from "react";
import '../styles/navbar.css'
import {AiOutlineDown, AiOutlineMenu} from "react-icons/ai";
import {Link, useLocation} from "react-router-dom";
import {BeatLoader} from "react-spinners";
import {GrUserAdmin} from "react-icons/gr";
import {MdSupervisorAccount} from "react-icons/md";
import {FaUser, FaUserAlt, FaUserCog, FaUserSecret, FaUserTie} from "react-icons/fa";
import ChangePass from "../components/modal/changePass";
import Api from "../Api/api";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../states/StateProvider";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isICAdmin, setIsICAdmin] = useState()

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const path = useLocation()
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }
    const [modal, setModal] = useState(false)
    const [version, setVersion] = useState('')
    const modalRef = useRef()
    const location = useLocation()

    const [{secretKey}] = useStateValue();
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))

    useEffect(() => {
        Api().get('/version').then(res => {
            setVersion(Object.values(res.data[0])[0])
        })
        Api().get(`/icAdminCheck/${user.ID}`).then(res => {
            setIsICAdmin(res.data)
        })
    }, []);

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

    function logout() {
        setLoading(true)
        setModal(!modal)
        localStorage.removeItem('user')
        localStorage.removeItem('admin')
        setLoading(false)
        window.location.reload()
    }

    return (
        <nav className='shadow-lg shadow-whiteDark' style={{ zIndex: '1' }} ref={modalRef} hidden={location.pathname.includes('anmeldung') || location.pathname.includes('registrieren') || location.pathname.includes('reset-password')}>
            <ul className="list">
                <li className='logo'>Projektportal</li>
                <li className='text-red mr-8 border border-y-0 border-l-0 pr-3 border-r-1 border-r-graph'> {version}</li>
                <li className='time' />
                {(toggleMenu || screenWidth > 1200) && (
                    <>
                        <Link to={'/'} onClick={toggleNav}>
                            <li className={`items ${path.pathname === '/' && 'text-mainBlue'}  hover:text-mainBlue`}>Dashboard</li>
                        </Link>
                        <div className="dropdown">
                            <li className={`items ${ (path.pathname === '/neu' || path.pathname === '/firmenprojekte-liste' 
                                || path.pathname === '/storfalle') && 'text-mainBlue'}  hover:text-mainBlue`}>
                                Firmenprojekte <i className="dropdown-icon">▼</i>
                            </li>
                            <div className="dropdown-content">
                                <Link to={'/storfalle'} onClick={toggleNav} >
                                    <li className={`items ${path.pathname === '/storfalle' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                        Störfälle
                                    </li>
                                </Link>
                                <Link to={'/neu'} onClick={toggleNav}>
                                    <li className={`items ${path.pathname === '/neu' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                        Neu
                                    </li>
                                </Link>
                                <Link to={'/firmenprojekte-liste'} onClick={toggleNav}>
                                    <li className={`items ${path.pathname === '/firmenprojekte-liste' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                        Firmenprojekte
                                    </li>
                                </Link>
                            </div>
                        </div>
                        {user?.role === 'Internal' && (
                            <Link to={'/mail-verlauf'} onClick={toggleNav}>
                                <li className={`items ${path.pathname === '/mail-verlauf' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                    Mailverlauf
                                </li>
                            </Link>
                        )}
                        <div className="dropdown" style={{marginLeft:'20px'}}>
                            <li className='items hover:text-mainBlue'>Administratives <i className="dropdown-icon">▼</i></li>
                            <div className="dropdown-content">
                                {user?.role === 'Internal' && user?.isUserAdmin === '1' ? (
                                    <Link to={'/benutzerverwaltung'}>
                                        <li className={`items ${path.pathname === '/benutzerverwaltung' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                            Benutzerverwaltung
                                        </li>
                                    </Link>
                                ) : (
                                    user?.role !== 'External' && (
                                        <Link to={'/benutzerubersicht'}>
                                            <li className={`items ${path.pathname === '/benutzerubersicht' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                                Benutzerübersicht
                                            </li>
                                        </Link>
                                    )
                                )}
                                {isICAdmin === 1 && (
                                    <Link
                                        to={{
                                            pathname: '/info-crawler',
                                            state: { data: isICAdmin },
                                        }}>
                                        <li className={`items ${path.pathname === '/info-crawler' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                            InfoCrawler
                                        </li>
                                    </Link>
                                )}
                                {/*{user?.role === 'Internal' && (*/}
                                {/*    <Link to={'/mail-verlauf'} onClick={toggleNav}>*/}
                                {/*        <li className={`items ${path.pathname === '/mail-verlauf' && 'text-mainBlue'}  hover:text-mainBlue`}>*/}
                                {/*            InfoMail*/}
                                {/*        </li>*/}
                                {/*    </Link>*/}
                                {/*)}*/}
                            </div>
                        </div>
                        <li className='userInfo cursor-pointer'>
                            {user?.role === 'Internal' ? (
                                <GrUserAdmin size={'30px'} color={'#565c8c'} />
                            ) : user?.role === 'External' ? (
                                <MdSupervisorAccount size={'35px'} color={'#3A46A9'} />
                            ) : user?.role === 'Supervisor' ? (
                                <FaUser size={'30px'} color={'#565c8c'} />
                            ) : (
                                user && <FaUserSecret size={'30px'} color={'#565c8c'} />
                            )}
                            <div>
                                <p className='pl-1' onClick={() => setModal(!modal)}>
                                    {user?.fullname}
                                </p>
                                <p onClick={() => setModal(!modal)} className='text-xs pl-1'>
                                    {user?.email}
                                </p>
                            </div>
                            <p className='cursor-pointer m-1'>
                                <AiOutlineDown onClick={() => setModal(!modal)} />
                            </p>
                        </li>
                    </>
                )}
            </ul>
            <div className={modal ? 'modal-logout' : 'hidden'}>
                <ChangePass />
                <button
                    onClick={logout}
                    className='text-left p-1 hover:text-red'
                >
                    {!loading ? 'Ausloggen' : <BeatLoader size={10} color={'#000000'} />}
                </button>
            </div>
            <button onClick={toggleNav} className="btn"><AiOutlineMenu /></button>
        </nav>
    )
}

export default Navbar