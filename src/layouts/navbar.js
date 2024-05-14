import React, {useEffect, useRef, useState} from "react";
import '../styles/navbar.css'
import {AiOutlineDown, AiOutlineMenu} from "react-icons/ai";
import {Link, useLocation} from "react-router-dom";
import {BeatLoader} from "react-spinners";
import {GrUserAdmin} from "react-icons/gr";
import {MdSupervisorAccount} from "react-icons/md";
import {FaUser, FaUserSecret} from "react-icons/fa";
import ChangePass from "../components/modal/changePass";
import Api from "../Api/api";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../states/StateProvider";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showNestedDropdown, setShowNestedDropdown] = useState(false); // State to control the nested dropdown visibility

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const path = useLocation();
    const toggleNav = () => {
        setToggleMenu(!toggleMenu);
    };
    const [modal, setModal] = useState(false);
    const [version, setVersion] = useState('');
    const modalRef = useRef();
    const location = useLocation();

    const [{secretKey}] = useStateValue();
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8));

    useEffect(() => {
        Api().get('/version').then(res => {
            setVersion(Object.values(res.data[0])[0]);
        });
    }, []);

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', changeWidth);
        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (!modalRef.current.contains(e.target)) {
                setModal(false);
            }
        });
    }, []);

    function logout() {
        setLoading(true);
        setModal(!modal);
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        localStorage.removeItem('portal');
        localStorage.removeItem('hmFilter');
        localStorage.removeItem('dggFilter');
        setLoading(false);
        window.location.reload();
    }

    return (
        <nav className='shadow-lg shadow-whiteDark' style={{zIndex: '1'}} ref={modalRef}
             hidden={location.pathname.includes('anmeldung') || location.pathname.includes('registrieren') || location.pathname.includes('reset-password')}>
            <ul className="list">
                <li className='logo'>Projektportal</li>
                <li className='text-red mr-8 border border-y-0 border-l-0 pr-3 border-r-1 border-r-graph'> {version}</li>
                <li className='time'/>
                {(toggleMenu || screenWidth > 1200) && (
                    <>
                        <Link to={'/'} onClick={toggleNav}>
                            <li className={`items ${path.pathname === '/' && 'text-mainBlue'}  hover:text-mainBlue`}>Dashboard</li>
                        </Link>
                        <div className="dropdown">
                            <li className={`items ${(path.pathname === '/neu' || path.pathname === '/firmenprojekte-liste'
                                || path.pathname === '/storfalle') && 'text-mainBlue'}  hover:text-mainBlue`}>
                                Firmenprojekte <i className="dropdown-icon">▼</i>
                            </li>
                            <div className="dropdown-content">
                                <Link to={'/storfalle'} onClick={toggleNav}>
                                    <li className={`items ${path.pathname === '/storfalle' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                        Störfälle
                                    </li>
                                </Link>

                                {
                                    (user.role === 'ExtDGG' || user.role === 'ExtRUV' || (user.role === 'Internal' && user.isSAdmin === '1')) &&
                                    <Link to={'/neu'} onClick={toggleNav}>
                                        <li className={`items ${path.pathname === '/neu' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                            Neu
                                        </li>
                                    </Link>
                                }

                                <Link to={'/firmenprojekte-liste'} onClick={toggleNav}>
                                    <li className={`items ${path.pathname === '/firmenprojekte-liste' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                        Firmenprojekte
                                    </li>
                                </Link>

                                {
                                    (user.role === 'ExtDGG' || user.role === 'ManDGG' || user.role === 'Internal'|| user.role === 'Controller') &&
                                    <Link to={'/upselling'} onClick={toggleNav}>
                                        <li className={`items ${path.pathname === '/upselling' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                            Upselling
                                        </li>
                                    </Link>
                                }

                            </div>
                        </div>
                        {(user?.role === 'Internal' || user?.role === 'Controller') && (
                            <Link to={'/mail-verlauf'} onClick={toggleNav}>
                                <li className={`items ${path.pathname === '/mail-verlauf' && 'text-mainBlue'}  hover:text-mainBlue`}>
                                    Mailverlauf
                                </li>
                            </Link>
                        )}
                        <div
                            className="dropdown"
                            style={{marginLeft: '20px'}}
                        >
                            {
                                (
                                    (user?.role === 'Internal' && user.isUserAdmin === '1') ||
                                    user.isICAdmin === '1' || user.isIMAdmin === '1' || user.isSAdmin === '1'
                                ) && (
                                    <li className='items hover:text-mainBlue'>
                                        Administratives <i className="dropdown-icon">▼</i>
                                    </li>
                                )
                            }

                            <div className="dropdown-content">
                                {(user?.role === 'Internal' && (user.isUserAdmin === '1' || user.isSAdmin === '1')) && (
                                    <Link to={'/benutzerverwaltung'}>
                                        <li className={`items ${path.pathname === '/benutzerverwaltung' && 'text-mainBlue'} hover:text-mainBlue`}>
                                            Benutzerverwaltung
                                        </li>
                                    </Link>
                                )}
                                {(user?.role === 'Internal' && (user.isICAdmin === '1' || user.isSAdmin === '1')) && (
                                    <Link
                                        to={{
                                            pathname: '/info-crawler',
                                            state: {data: user.isICAdmin},
                                        }}>
                                        <li className={`items ${path.pathname === '/info-crawler' && 'text-mainBlue'} hover:text-mainBlue`}>
                                            InfoCrawler
                                        </li>
                                    </Link>
                                )}
                                {(user?.role === 'Internal' && (user.isIMAdmin === '1' || user.isSAdmin === '1')) && (
                                    <Link to={'/info-mail'} onClick={toggleNav}>
                                        <li className={`items ${path.pathname === '/mail-verlauf' && 'text-mainBlue'} hover:text-mainBlue`}>
                                            InfoMail
                                        </li>
                                    </Link>
                                )}
                                {(user?.role === 'Internal' && user.isSAdmin === '1') && (
                                    <>
                                        {/* Dropdown for MS Verwaltung */}
                                        <div className="dropdown"
                                             onMouseEnter={() => setShowNestedDropdown(true)}
                                             onMouseLeave={() => setShowNestedDropdown(false)}
                                        >
                                            <li className={`items ${path.pathname === '/admin-edit' && 'text-mainBlue'} hover:text-mainBlue`}>
                                                Verwaltung <i className="dropdown-icon">▼</i>
                                            </li>
                                            {
                                                showNestedDropdown &&
                                                <div className="dropdown-content-nested">
                                                    <Link
                                                        to={{
                                                            pathname: '/admin-edit-footer',
                                                            state: {data: user.isSAdmin},
                                                        }}>
                                                        <li className={`items ${path.pathname === '/admin-edit-footer' && 'text-mainBlue'} hover:text-mainBlue`}>
                                                            Footerzeile
                                                        </li>
                                                    </Link>
                                                    <Link
                                                        to={{
                                                            pathname: '/admin-edit-options',
                                                            state: {data: user.isSAdmin},
                                                        }}>
                                                        <li className={`items ${path.pathname === '/admin-edit-options' && 'text-mainBlue'} hover:text-mainBlue`}>
                                                            WV Optionen
                                                        </li>
                                                    </Link>
                                                    <Link
                                                        to={{
                                                            pathname: '/admin-edit-milestones',
                                                            state: {data: user.isSAdmin},
                                                        }}>
                                                        <li className={`items ${path.pathname === '/admin-edit-milestones' && 'text-mainBlue'} hover:text-mainBlue`}>
                                                            Meilensteine
                                                        </li>
                                                    </Link>
                                                    <Link
                                                        to={{
                                                            pathname: '/admin-edit',
                                                            state: {data: user.isSAdmin},
                                                        }}>
                                                        <li className={`items ${path.pathname === '/admin-edit' && 'text-mainBlue'} hover:text-mainBlue`}>
                                                            MS Schritte
                                                        </li>
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        {/*<Link to={'/reporting'} onClick={toggleNav}>*/}
                        {/*    <li className={`items ${path.pathname === '/reporting' && 'text-mainBlue'}  hover:text-mainBlue`}>Reporting</li>*/}
                        {/*</Link>*/}
                        <li className='userInfo cursor-pointer'>
                            {user?.role === 'Internal' ? (
                                <GrUserAdmin size={'30px'} color={'#565c8c'}/>
                            ) : user?.role === 'ExtRUV' ? (
                                <MdSupervisorAccount size={'35px'} color={'#3A46A9'}/>
                            ) : user?.role === 'ExtDGG' ? (
                                <MdSupervisorAccount size={'35px'} color={'#0a523f'}/>
                            ) : user?.role === 'ManRUV' ? (
                                <FaUser size={'30px'} color={'#565c8c'}/>
                            ) : user?.role === 'ManDGG' ? (
                                <FaUser size={'30px'} color={'#0a523f'}/>
                            ) : (
                                user && <FaUserSecret size={'30px'} color={'#565c8c'}/>
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
                                <AiOutlineDown onClick={() => setModal(!modal)}/>
                            </p>
                        </li>
                    </>
                )}
            </ul>
            <div className={modal ? 'modal-logout' : 'hidden'}>
                <ChangePass/>
                <button
                    onClick={logout}
                    className='text-left p-1 hover:text-red'
                >
                    {!loading ? 'Ausloggen' : <BeatLoader size={10} color={'#000000'}/>}
                </button>
            </div>
            <button onClick={toggleNav} className="btn"><AiOutlineMenu/></button>
        </nav>
    )
}

export default Navbar;
