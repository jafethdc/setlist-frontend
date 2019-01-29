import React, { useState } from 'react';

const App = () => {
  console.dir('Render!');
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        The button is pressed:
        {counter}
        times.
        <button
          type="submit"
          onClick={() => setCounter(counter + 1)}
          style={{ padding: '1rem 2rem' }}
        >
          Click me!
        </button>
      </header>
    </div>
  );
};

export default App;
