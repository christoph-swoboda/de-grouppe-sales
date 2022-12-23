import React from "react";
import {ClipLoader, SkewLoader} from "react-spinners";

const Boxes = ({icon, data, col}) => {
    return (
        <div className=' rounded-md shadow-lg px-6 py-8 bg-white'>
            <div className='flex justify-between'>
                <div
                    className='px-4 py-2 absolute h-20 w-20 -mt-12 float-right centerItemsRelative rounded-md bg-mainBlue shadow-lg shadow-grey'>
                    {icon}
                </div>
                <p className='opacity-0'>gap</p>
                {
                    data.length === 0 ?
                        <ClipLoader color={'#dcdcdc'}/>
                        :
                        <p className='mt-2 text-sm'>{data[0]?.Label}
                            <span className='tracking-wider bg-silver text-lg px-2 py-1 ml-2 rounded-full'
                                  style={{color: col}}>
                        {data[0]?.FP}
                    </span>
                        </p>
                }
            </div>
            <hr className='h-px border-0 mt-4 mb-2 bg-whiteDark'/>
            {
                data.length === 0 ?
                    <SkewLoader size='5px' color={'#dcdcdc'}/>
                    :
                    <p className='float-right text-sm'>{data[1]?.Label}
                        <span className='tracking-wider text-lg bg-silver px-2 py-1 rounded-full ml-2'
                              style={{color: col}}>
                    {data[1]?.FP}
                </span>
                    </p>
            }
        </div>
    )
}

export default Boxes