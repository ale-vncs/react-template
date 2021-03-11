import React from 'react';
import Button from '@components/Button';
import ReactDOM from 'react-dom';

const App = () => (
  <>
    <Button name={'Aperte'} />
    <h1>My React and TypeScript App!</h1>
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
