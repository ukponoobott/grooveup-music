import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

export default function IconText({iconName, displayText, active, targetLink}){
    
    return (
        <Link to={targetLink} className='block'>
            <div className='flex items-center justify-start cursor-pointer' >
                <div className='px-5 py-2'>
                    <Icon icon={iconName} color={active?"white":"gray"} fontSize={25} />
                </div>

                <div className={`${active?"text-white":"text-gray-500"} text-sm font-semibold hover:text-white`}>
                    {displayText}
                </div>
            </div>
        </Link>
    )
}