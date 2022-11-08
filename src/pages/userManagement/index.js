import React, {useEffect, useRef, useState} from "react";
import UserManagementTable from "./partial/table";
import BankManagerView from "./partial/bankManagerView";
import Api from "../../Api/api";
import {useStateValue} from "../../states/StateProvider";
import {useNavigate} from "react-router-dom";
import Modal from "../../hooks/modal";
import useModal from "../../hooks/useModal";
import AddUsers from "../../components/modal/addUsers";
import {toast} from "react-toastify";
import {BeatLoader} from "react-spinners";

const UserManagement = () => {
    const [search, setSearch] = useState('')
    const [searchKey, setSearchKey] = useState('')
    const [users, setUsers] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    const admin = user.isUserAdmin
    const userID = user.ID
    const role = user.role
    const [rows, setRows] = useState('10');
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingKeys, setLoadingKeys] = useState(false);
    const [modal, setModal] = useState(false)
    const [{
        userValidated,
        page,
        addUsersModal,
        sortUserColum,
        sortUserMethod,
        addUsersDone
    }, dispatch] = useStateValue();
    const navigate = useNavigate()
    const {toggleAddUsersModal} = useModal();
    const modalRef = useRef()

    useEffect(() => {
        getUsers(searchKey)
    }, [rows, userID, userValidated, page, sortUserMethod, sortUserColum, addUsersDone, searchKey]);

    useEffect(() => {
        const delayQuery = setTimeout(async () => {
            if (search.match(/^ *$/) === null) {
                let data = new FormData()
                data.append('userID', userID)
                data.append('search', search)
                setLoadingKeys(true)
                Api().post('/searchByMail', data).then(res => {
                    setSearchResults(res.data)
                    setLoadingKeys(false)
                    dispatch({type: "SET_PAGE", item: 1})
                }).catch((error) => {
                    setLoadingKeys(false)
                    toast.error('HOPPLA! etwas ist schief gelaufen')
                })
            }
        }, search ? 400 : 0)

        return () => clearTimeout(delayQuery)
    }, [search])

    useEffect(() => {
        if (searchResults.length > 0) {
            setModal(true)
        }
    }, [searchResults]);

    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (!modalRef.current.contains(e.target)) {
                setModal(false)
            }
        })
    }, []);

    useEffect(() => {
        if (!search) {
            setSearchKey('')
            setModal(false)
            setSearchResults([])
        }
    }, [search]);

    function getUsers(src) {
        if (role === 'External') {
            navigate('/')
        }
        setLoading(true)
        let data = new FormData()
        data.append('userID', userID)
        data.append('rows', rows)
        data.append('page', page)
        data.append('search', src)
        data.append('sortColumn', sortUserColum)
        data.append('sortMethod', sortUserMethod)

        Api().post('/getUsers', data).then(res => {
            setUsers(res.data)
            console.log('users', res.data)
            setTotal(Number(res.data[0].totalUsers))
            setLoading(false)
        }).catch(e => {
            setLoading(false)
        })
    }

    function setUpModal(e) {
        setSearchKey(e.target.value)
        setSearch(e.target.value)
        setModal(false)
    }

    function searchSubmit(e) {
        e.preventDefault();
        getUsers(search)
        setModal(false)
    }

    function setPageStates(e) {
        dispatch({type: "SET_PAGE", item: 1})
        setRows(e.target.value)
    }

    return (
        <div className='dashboardContainer'>
            <div className='lg:flex justify-between mt-10 sm:block'>
                <h2 className='text-2xl lg:text-left font-extrabold'>{admin === '0' ? 'Banken-Kooperations-Verwaltung' : 'Benutzerverwaltung'}</h2>
                <div className={admin === '0' ? 'hidden' :''}>
                    <p className={`px-3 py-2 rounded-2xl bg-mainBlue text-sm text-white ml-2 cursor-pointer`}
                       onClick={toggleAddUsersModal}>
                        Neuen Benutzer anlegen
                    </p>
                </div>
            </div>

            <div className='bg-white my-4'>
                <div className='rounded-xl p-8 lg:flex sm:block'>
                    <form onSubmit={searchSubmit} className=' xl:w-3/12 sm:w-full'>
                        <input type="text" className='mr-5 w-full'
                               value={search}
                               placeholder='Suche..'
                               onChange={(e) => setSearch(e.target.value)}
                        />
                        <input type="submit" value="Submit" hidden/>
                    </form>
                    <p className='text-sm text-grey ml-auto mt-2'>
                        {page === 1 ? page : (1 + (Number(rows) * page)) - Number(rows)} bis {(users.length < Number(rows)) ? users.length + Number(rows) < total ? users.length + (Number(rows) * page) - Number(rows) : total : (Number(rows) + (Number(rows) * page)) - Number(rows)} von {total} Eintragen
                    </p>
                    <h2 className='text-sm text-grey ml-6 mt-2 ml-10'>
                        Eintrage anzigen: <span>
                        <select onChange={setPageStates} className='bg-transparent text-mainBlue'>
                            <option value={'10'}>{10}</option>
                            <option value={'25'}>{25}</option>
                        </select>
                    </span>
                    </h2>
                </div>
                <div className='text-left absolute ml-9 -mt-9'>
                    {loadingKeys && <BeatLoader size='8'/>}
                </div>
                <div ref={modalRef}
                     className={`${!modal && 'hidden'} absolute w-72 max-h-80 ml-9 bg-offWhite p-5 z-10 -mt-6 overflow-y-scroll`}>
                    {
                        searchResults.map((res, i) => (
                            <input type='button' key={i} onClick={setUpModal}
                                   className='cursor-pointer flex flex-col text-mainBlue text-sm text-left border-none underline hover:text-red p-2'
                                   value={res.email}
                            />
                        ))
                    }

                </div>
                {
                    role === 'Internal' ?
                        <UserManagementTable users={users} pageSize={rows} total={total} loading={loading}/>
                        :
                        <BankManagerView users={users} pageSize={rows} total={total} loading={loading}/>
                }
            </div>

            <Modal toggle={toggleAddUsersModal}
                   visible={addUsersModal}
                   component={<AddUsers/>}
            />
        </div>
    )
}

export default UserManagement