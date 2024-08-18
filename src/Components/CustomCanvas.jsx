import React, { useState, useEffect } from 'react';

import Cell from './Cell';

const CustomCanvas = () => {
  const [grid, setGrid] = useState([[]]);
  const [init, setInit] = useState(1);
  const [hsl, setHsl] = useState(0);

  const width = 35;

  useEffect(() => {
    if (init === 1) {
      setInit(0);

      const tempGrid = []

      for (let i = 0; i < width; i++) {
        const row = []
        for (let j = 0; j < width; j++) {
          row.push(0);
        }

        tempGrid.push(row);
      }

      setGrid(tempGrid);
      return;
    }

    let tempGrid = grid.map((row, indexX) => {
      return row.map((value, indexY) => { return value; })
    });

    let updated = 0;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        if (i < width - 1 && grid[i][j] !== 0) {
          if ((i < width - 1) && (grid[i + 1][j] === 0)) {
            tempGrid[i + 1][j] = tempGrid[i][j];
            tempGrid[i][j] = 0;

            updated = 1;
          }
          else {
            if (Math.random() < 0.5) {
              if ((j > 0) && (grid[i + 1][j - 1] === 0)) {
                tempGrid[i + 1][j - 1] = tempGrid[i][j];
                tempGrid[i][j] = 0;

                updated = 1;
              }
              else if ((j < width - 1) && (grid[i + 1][j + 1] === 0)) {
                tempGrid[i + 1][j + 1] = tempGrid[i][j];
                tempGrid[i][j] = 0;

                updated = 1;
              }
            }
            else {
              if ((j < width - 1) && (grid[i + 1][j + 1] === 0)) {
                tempGrid[i + 1][j + 1] = tempGrid[i][j];
                tempGrid[i][j] = 0;

                updated = 1;
              }
              else if ((j > 0) && (grid[i + 1][j - 1] === 0)) {
                tempGrid[i + 1][j - 1] = tempGrid[i][j];
                tempGrid[i][j] = 0;

                updated = 1;
              }
            }
          }
        }
      }
    }

    if (updated === 1)
      setTimeout(() => {
        setGrid(tempGrid);
      }, 5);

  }, [grid])

  const handleClick = (e) => {
    // console.log('Clicked: ', 'x:', e.target.attributes.coordinateX.value, ' y:', e.target.attributes.coordinateY.value);

    if (grid[e.target.attributes.coordinateX.value][e.target.attributes.coordinateY.value] !== 0) return;

    hsl + 4 > 360 ? setHsl(10) : setHsl(hsl + 4);

    const tempGrid = grid.map((row, indexX) => {
      return row.map((value, indexY) => {
        if (indexX == e.target.attributes.coordinateX.value && indexY == e.target.attributes.coordinateY.value) {
          if (value !== 0) {
            return value;
          }

          return hsl;
        }

        return value;
      })
    })

    setGrid(tempGrid);
  }


  return (
    <>
      <div className='border-4 border-solid border-teal-600 rounded-md'>
        <div className={`grid grid-cols-35 bg-gray-300`}>
          {
            grid.map((row, indexX) => {
              return (
                <>
                  {
                    row.map((value, indexY) => {
                      return <>
                        <Cell
                          value={value}
                          coordinateX={indexX}
                          coordinateY={indexY}
                          handleClick={handleClick}
                        />
                      </>
                    })
                  }
                </>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default CustomCanvas