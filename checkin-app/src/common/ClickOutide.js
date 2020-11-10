import React, { useEffect, useRef, cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
const ClickOutside = ({ children, onClick }) => {
  const ref = useRef();
  useEffect(() => {
    if (!ref?.current) {
      return;
    }
    const handleClickOutside = (e) => {
      if (onClick && !ref.current.contains(e.target)) {
        onClick(e);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return <>{cloneElement(children, { ref })}</>;
};
ClickOutside.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ClickOutside;
export const Demo = () => {
  const [insideCount, setInsideCount] = useState(0);
  const [outsideCount, setOutsideCount] = useState(0);
  return (
    <>
      <ClickOutside onClick={() => setOutsideCount((count) => count + 1)}>
        <button onClick={() => setInsideCount((count) => count + 1)}>
          Click inside
        </button>
      </ClickOutside>
      <hr />
      <p>Inside clicks count: {insideCount}</p>
      <p>Outside clicks count: {outsideCount}</p>
    </>
  );
};