import React, {useEffect, useState, useRef} from 'react';

import EmptyDataPlaceholder from './components/empty-data-placeholder/EmptyDataPlaceholder';
import './App.scss';

let yStart = 0, yEnd = 0, diff = 0, isSplitterSelected, h;

// const useAnimationFrame = callback => {
//   // Use useRef for mutable variables that we want to persist
//   // without triggering a re-render on their change
//   const requestRef = useRef(getContentHeight());
//   const previousTimeRef = useRef(getContentHeight());
//
//   const animate = time => {
//     if (previousTimeRef.current !== undefined) {
//       const deltaTime = time - previousTimeRef.current;
//       callback(deltaTime)
//     }
//     previousTimeRef.current = time;
//     requestRef.current = requestAnimationFrame(animate);
//   }
//
//   useEffect(() => {
//     requestRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(requestRef.current);
//   }, []); // Make sure the effect runs only once
// }

function getContentHeight() {
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return height / 2
}

function App() {
  const initHeight = getContentHeight();
  const [blockHeight, setBlockHeight] = useState(initHeight);

  isSplitterSelected = useRef(false);
  diff = useRef(0);
  h = useRef(initHeight)

  console.log(blockHeight, '\n', 'requestRef', isSplitterSelected, '\n', 'h ===>', h);


  return (
    <div className='top-wrap' style={{position: 'relative', height: '100vh'}}
         onMouseMove={handleResize}
    >
      <div style={{height: '200px', border: '1px solid red'}}></div>
      <div className="App"
      >
        <div className={"admc-detailed-data-block-content-wrapper"}
             onMouseUp={endResize}
             onMouseDown={startResize}
             style={{'height': blockHeight}}
        >
          <div className="admc-detailed-block-switcher">
            <button className="admc-dividers-wrapper">
              <div className="divider"></div>
              <div className="divider"></div>
            </button>
          </div>
          <div className="admc-detailed-data-block-content">
            <EmptyDataPlaceholder/>
          </div>
        </div>
      </div>
    </div>
  );

  function startResize(event) {
    console.log('startResize ====>');
    yStart = event.clientY;
    isSplitterSelected.current = true
  }


  function endResize(event) {
    console.log('endResize ------->');
    if (isSplitterSelected) {
      isSplitterSelected.current = false
    }
  }

  function handleResize(event) {
    yEnd = event.clientY;
    diff.current = yStart - yEnd;
    yStart = yEnd;

    if (isSplitterSelected.current && diff.current !== 0) {
      console.log('diff=====>', diff);
      h.current = h.current + diff.current;
      requestAnimationFrame(() => {
        setBlockHeight(h.current)
      })
    }
  }
}

export default App;
