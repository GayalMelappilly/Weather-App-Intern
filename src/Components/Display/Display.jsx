import React from 'react'

function Display() {
    return (
        <div className='container mx-auto h-screen flex justify-center'>
            <div className='w-4/12'>
                <div className='px-10 bg-gradient-to-bl from-cyan-400 to-yellow-100 h-2/5 rounded-lg shadow-lg shadow-gray-400'>
                    <h1>Dipsplay</h1>
                </div>
                <div className="py-3"></div>
                <div className='px-10 bg-gradient-to-bl from-cyan-400 to-yellow-100 h-2/6 rounded-lg shadow-lg shadow-gray-400'>
                    <h1>Dipsplay</h1>
                </div>
            </div>

            <div className='px-3'></div>

            <div className="w-4/12">
                <div className='px-10 bg-gradient-to-bl from-cyan-400 to-yellow-100 h-2/6 rounded-lg shadow-lg shadow-gray-400'>
                    <h1>Dipsplay</h1>
                </div>
                <div className="py-3"></div>
                <div className='px-10 bg-gradient-to-bl from-cyan-400 to-yellow-100 h-2/5  rounded-lg shadow-lg shadow-gray-400'>
                    <h1>Dipsplay</h1>
                </div>
            </div>
        </div>
    )
}

export default Display