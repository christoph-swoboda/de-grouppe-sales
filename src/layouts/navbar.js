import React, {useEffect, useRef, useState} from "react";
import '../styles/navbar.css'
import {AiOutlineDown, AiOutlineMenu} from "react-icons/ai";
import image from '../assets/pp.jpg'
import {Link, useLocation} from "react-router-dom";

const Navbar = ({user}) => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const path=useLocation()
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }
    const [modal, setModal] = useState(false);
    const modalRef = useRef();

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

    return (
        <nav ref={modalRef}>
            <ul className="list">
                <li className='logo'>#DG-Projektportal</li>
                <li className='time'>Firmenprojeckte | 22.04a</li>
                {
                    (toggleMenu || screenWidth > 500) && (
                        <>
                            <Link to={'/'}>
                                <li className={`items ${path.pathname==='/' && 'text-mainBlue'}`}>Dashboard</li>
                            </Link>
                            <Link to={'/new'}>
                                <li className={`items ${path.pathname==='/new' && 'text-mainBlue'}`}>New Creation</li>
                            </Link>
                            <Link to={'/inventory'}>
                                <li className={`items ${path.pathname==='/inventory' && 'text-mainBlue'}`}>Inventory</li>
                            </Link>
                            <Link to={'/bestant-list'}>
                                <li className={`items ${path.pathname.includes('/bestant') && 'text-mainBlue'}`}>Bestant</li>
                            </Link>
                            <Link to={'/evaluation'}>
                                <li className={`items ${path.pathname==='/evaluation' && 'text-mainBlue'}`}>Evaluation</li>
                            </Link>
                            <Link to={'/instruction'}>
                                <li className={`items ${path.pathname==='/instruction' && 'text-mainBlue'}`}>Instruction</li>
                            </Link>
                            <li className='userInfo cursor-pointer'>
                                <img src={image} alt='image'/>
                                <div>
                                    <p onClick={() => setModal(!modal)}>Username</p>
                                    <p onClick={() => setModal(!modal)} className='text-xs'>Id: 132255214</p>
                                </div>
                                <p className='cursor-pointer m-1'><AiOutlineDown onClick={() => setModal(!modal)}/></p>
                            </li>
                        </>
                    )
                }
            </ul>
            <p className={modal ? 'modal-logout' : 'hidden'}>
                <button className='text-left p-1'> Settings </button>
                <Link className='text-left p-1' to={'/benutzerverwaltung'}>Benutzerverwaltung</Link>
                <button className='text-left p-1'> Log Out</button>
            </p>
            <button onClick={toggleNav} className="btn"><AiOutlineMenu/></button>
        </nav>
    )
}

export default Navbar