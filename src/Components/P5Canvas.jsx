import React, { useEffect } from 'react';
import p5 from 'p5';

const P5Canvas = () => {
  const myRef = React.createRef();

  const Sketch = (p) => {
    // Destructuring
    Object.entries(p).forEach(([key, value]) => {
      globalThis[key] = value;
    });

    let grid;
    let pixelWidth = 4;
    let rows, cols;
    let hueValue = 50;
    let range = 15;
    let acc = 0.08;

    // speed = (end - curr)*acc

    function getGrid(rows, cols) {
      let grid = new Array(rows);

      for (let i = 0; i < rows; i++) {
        let tempRow = new Array(cols);

        for (let j = 0; j < cols; j++)tempRow[j] = 0;

        grid[i] = tempRow;
      }

      return grid;
    }

    function validRange(x, y) {
      return (x >= 0) && (x < rows) && (y >= 0) && (y < cols);
    }

    function nextValidLocation(i, j, length) {
      for (let d = 1; d <= length; d++) {
        let below = (i < rows - 1) ? grid[i + 1][j] : -1;
        let belowL = (i < rows - 1 && j > 0) ? grid[i + 1][j - 1] : -1;
        let belowR = (i < rows - 1 && j < cols - 1) ? grid[i + 1][j + 1] : -1;
        let dir = Math.random();

        if (below === 0) {
          i = i + 1;
        }
        else if (belowL === 0 || belowR === 0) {
          if (dir < 0.5) {
            if (belowL === 0) {
              i = i + 1;
              j = j - 1;
            }
            else if (belowR === 0) {
              i = i + 1;
              j = j + 1;
            }
          }
          else {
            if (belowR === 0) {
              i = i + 1;
              j = j + 1;
            }
            else if (belowL === 0) {
              i = i + 1;
              j = j - 1;
            }
          }
        }
      }

      return { 'validX': i, 'validY': j };
    }

    p.mouseDragged = () => {
      let col = p.floor(p.mouseX / pixelWidth);
      let row = p.floor(p.mouseY / pixelWidth);

      for (let i = -range; i <= range; i++) {
        for (let j = -range; j <= range; j++) {
          if (validRange(i, j) && (Math.random() > 0.9) && grid[row + i][col + j] === 0) {
            grid[row + i][col + j] = hueValue;
          }
        }
      }

      hueValue = hueValue + 0.5;
      if (hueValue > 360) hueValue = 10;
    }

    p.setup = () => {
      const Canvas = p.createCanvas(1000, 600);
      p.colorMode(p.HSB, 360, 255, 255);

      rows = p.height / pixelWidth;
      cols = p.width / pixelWidth;

      grid = getGrid(rows, cols);

      for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++)
          grid[i][j] = 0;
    }

    p.draw = () => {
      p.background(0);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          p.noStroke();
          if (grid[i][j] > 0) {
            p.fill(grid[i][j], 255, 255);

            let x = i * pixelWidth;
            let y = j * pixelWidth;

            p.square(y, x, pixelWidth);
          }
        }
      }

      let nextGrid = getGrid(rows, cols);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (grid[i][j] !== 0) {
            let speed = (i) * acc;
            let coord = nextValidLocation(i, j, speed > 1 ? speed : 1);

            let x = coord.validX;
            let y = coord.validY;

            nextGrid[i][j] = 0;
            nextGrid[x][y] = grid[i][j];
          }
        }
      }

      grid = nextGrid;
    }
  }

  useEffect(() => {
    const myP5 = new p5(Sketch, myRef.current)
  }, [])

  return (
    <div ref={myRef} />
  )
}

export default P5Canvas;