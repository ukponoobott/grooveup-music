import React from 'react';
import { Icon } from '@iconify/react';

export default function IconText({iconName, displayText, active}){
    return (
        <div className='flex items-center justify-start cursor-pointer'>
            <div className='px-5 py-2'>
                <Icon icon={iconName} color={active?"white":"gray"} fontSize={25} />
            </div>

            <div className={`${active?"text-white":"text-gray-500"} text-sm font-semibold hover:text-white`}>
                {displayText}
            </div>
        </div>
    )
}