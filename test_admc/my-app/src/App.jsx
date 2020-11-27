import React, {useLayoutEffect, useState} from 'react';

import EmptyDataPlaceholder from './components/empty-data-placeholder/EmptyDataPlaceholder';
import './App.scss';

let yStart = 0, yEnd = 0, resizerEl;

function App() {
  const [blockHeight, setBlockHeight] = useState(0);
  const [isSplitterSelected, setIsSplitterSelected] = useState(false);

  useLayoutEffect (() =>{
    const initHeight = getContentHeight();
    setBlockHeight(initHeight);
  }, [])


  console.log(11, isSplitterSelected, blockHeight);

  return (
    <div className="App">
      <div className={"admc-detailed-data-block-content-wrapper"}
           style={{'height': blockHeight}}
           onMouseUp={endResize}
      >
        <div className="admc-detailed-block-switcher"
             onMouseDown={startResize}
             onMouseMove={handleResize}
        >
          <div className="admc-dividers-wrapper">
            <div className="divider"></div>
            <div className="divider"></div>
          </div>
        </div>
        <div className="admc-detailed-data-block-content">
          <EmptyDataPlaceholder/>
        </div>
      </div>
    </div>
  );

  function startResize(event) {
    console.log('startResize ====>');
    yStart = event.clientY;
    setIsSplitterSelected(true)
  }


  function endResize(event) {
    console.log('endResize ------->');
    if(isSplitterSelected){
      setIsSplitterSelected(false)
    }
  }

  function handleResize(event) {
    if (isSplitterSelected) {
      yEnd = event.clientY;

      console.log('blockHeight + yStart - yEnd', blockHeight, yStart - yEnd);

      requestAnimationFrame(() => {
        setBlockHeight(blockHeight + yStart - yEnd)
      });
    }
  }

  function getContentHeight(){
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return height/2
  }
}

export default App;
