import React from 'react';

type Props = {};

const Spinner = (props: Props) => {
    return (
        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-black'></div>
    );
};

export default Spinner;
