import React, { useState } from 'react';

const My = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      my
      <button onClick={handleClick}>该按钮点击了{count}次</button>
    </div>
  );
};

export default My;
