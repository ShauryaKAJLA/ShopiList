import React from 'react'

function Loading() {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-black"></div>
        </div>
    )
}

export default Loading
