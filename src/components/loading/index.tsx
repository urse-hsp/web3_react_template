import React from 'react';
import './index.scss';

interface LoadingProps {
  text?: string;
  show: boolean;
}

export function Loading(props: LoadingProps = { show: false, text: '' }) {
  return (
    props.show && (
      <div className="loading">
        <div className="loading-round" />
        {props.text && <div className="loading-text">{props.text}</div>}
      </div>
    )
  );
}

/* loading组件的 React.Element */
export const LoadingElement = React.createElement(
  'div',
  { className: 'loading' },
  React.createElement('div', { className: 'loading-round' }),
  React.createElement('div', { className: 'loading-text' }, 'Loading'),
);

export function Loader({
  size = '15px',
  stroke,
}: {
  size?: string;
  stroke?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="svg-loading"
      style={{
        height: size,
        width: size,
      }}
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          stroke,
        }}
      />
    </svg>
  );
}

export default Loader;
