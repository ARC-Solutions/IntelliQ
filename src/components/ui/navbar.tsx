import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import UserAvatar from '../user-avatar';

type Props = {};

const Navbar = async () => {
    return (
        <div className='fixed inset-x-0 top-0 z-[10] h-fit border-b border-primary bg-background py-2'>
            <div className='max-w-7-xl mx-auto flex h-full items-center justify-center gap-2 px-8'>
                <Link href='/dashboard' className='flex items-center gap-2'>
                    <Image
                        priority
                        src='/IntelliQ_Logo.png'
                        width={150}
                        height={150}
                        alt='IntelliQ_Logo'
                    />
                </Link>
                <UserAvatar />
            </div>
        </div>
    );
};

export default Navbar;
