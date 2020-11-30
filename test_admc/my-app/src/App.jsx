import React, { useLayoutEffect, useEffect, useState, useRef } from "react";

import EmptyDataPlaceholder from "./components/empty-data-placeholder/EmptyDataPlaceholder";
import "./App.scss";

function App() {
  const wrapper = useRef();
  const currentToggleLine = useRef();
  const [isDragged, setIsDragged] = useState(false);
  const [blockHeight, setBlockHeight] = useState(0);
  const [heightStates, setHeightStates] = useState([0, 0]);

  useLayoutEffect(() => {
    const { height } = wrapper.current.getBoundingClientRect();
    setBlockHeight(height);
    const elementHeight =
      (height - (25 * heightStates.length - 1)) / heightStates.length;
    setHeightStates((prev) => prev.map(() => elementHeight));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App container for dynamic block" ref={wrapper}>
      <div
        onMouseUp={endResize}
        onMouseMove={handleResize}
        className={"admc-detailed-data-block-content-wrapper"}
        style={{ height: blockHeight }}
      >
        <div style={{ height: heightStates[0] }}>
          <EmptyDataPlaceholder />
        </div>
        <div className="admc-detailed-block-switcher" onMouseDown={startResize}>
          <div className="admc-dividers-wrapper">
            <div className="divider"></div>
            <div className="divider"></div>
          </div>
        </div>
        <div style={{ height: heightStates[1] }}>
          <EmptyDataPlaceholder />
        </div>
      </div>
    </div>
  );

  function startResize(event) {
    if (isDragged) {
      return;
    }

    const { target, pageY } = event;
    const dY = pageY - target.offsetTop;

    currentToggleLine.current = { target, dY };
    setIsDragged(true);
  }

  function endResize(event) {
    currentToggleLine.current = null;
    setIsDragged(false);
  }

  function handleResize(event) {
    if (!currentToggleLine.current || !isDragged) {
      return;
    }
    const { dY } = currentToggleLine.current;
    const { pageY, movementY } = event;
    console.dir(dY, pageY, movementY);

    const firstBlock = pageY - dY;
    const secondBlock = wrapper.current.offsetHeight - firstBlock - 25;

    setHeightStates([firstBlock, secondBlock]);
  }
}

export default App;
