import React from 'react'

const Cell = ({ value, coordinateX, coordinateY, handleClick }) => {
  return (
    <>
      <button
        className={`flex w-4 h-4 border border-solid border-black justify-center items-center hover:bg-yellow-300`}
        style={{ backgroundColor: `hsl(${value},40%,${value === 0 ? "100%" : "50%"})` }}
        onClick={handleClick}
        coordinateX={coordinateX}
        coordinateY={coordinateY}
      >
      </button>
    </>
  )
}

export default Cell