import React from "react";
import {ClipLoader, SkewLoader} from "react-spinners";
import {FiRotateCcw, FiRotateCw} from "react-icons/fi";

const Boxes = ({icon, data, col, title, toggleState, rotate}) => {

    const handleClick = () => {
        toggleState(); // Call the function to update the state in the main component
    };

    return (
        <div className={`rounded-md shadow-lg px-6 py-8 bg-white ${rotate && title!=='Alle Projekte' ? 'box rotate' : 'box2 rotate2'}`}>
            <div className='flex justify-between'>
                <div
                    className='px-3 absolute h-16 -mt-6 float-right centerItemsRelative rounded-md bg-mainBlue shadow-lg shadow-grey'>
                    <p>{icon}</p> <p
                    className={`text-white text-sm ${title === 'Alle Projekte' ? 'ml-3' : 'ml-1'}`}>{title}</p>
                </div>
                <p className='opacity-0'>gap</p>
                {
                    data.length === 0 ?
                        <ClipLoader color={'#dcdcdc'}/>
                        :
                        <p className='mt-2 text-sm'>{data[0]?.Label}
                            <span className='tracking-wider bg-silver text-lg px-2 py-1 ml-2 rounded-full'
                                  style={{color: col}}>
                        {Number(data[0]?.FP)}
                    </span>
                        </p>
                }
            </div>
            <hr className='h-px border-0 mt-4 mb-2 bg-whiteDark'/>
            {
                data.length === 0 ?
                    <SkewLoader size='5px' color={'#dcdcdc'}/>
                    :
                    <div className='flex justify-between'>
                        {/* {
                            title !== 'Alle Projekte' ?
                                <a title={`${title==='Abgesagt'?'Ansicht abgeschlossen': 'Ansicht abgebrochen'}`} className={`cursor-pointer rounded-full p-1`} onClick={handleClick}>
                                    {
                                        title === 'Abgeschlossen' ?
                                            <FiRotateCw color={'#595959'} size='30px'/>
                                            :
                                            <FiRotateCcw color={'#525252'} size='30px'/>
                                    }
                                </a>
                                : <p/>
                        } */}





                        {/* REMOVE THIS P */}
                        <p></p>
                         {/* REMOVE THIS P */}





                        <p className='float-right text-sm'>{data[1]?.Label}
                            <span className='tracking-wider text-lg bg-silver px-2 py-1 rounded-full ml-2'
                                  style={{color: col}}>
                            {Number(data[1]?.FP)}
                        </span>
                        </p>
                    </div>
            }
        </div>
    )
}

export default Boxes