import React from 'react';
import Another from './Another';
import './App.css';
import useAxios from './useAxios';

function App() {
  let {data, loading} = useAxios('http://api.tvmaze.com/shows');
  return (
    <div className='App'>
      <div>
        {loading ? (
          'Loading...'
        ) : (
          data.map((show) => {
            return (
              <div key={show.id} id={show.id}>
                {show.name}
              </div>
            );
          })
        )}
      </div>
      <hr />
      <br />
      PokeMon API
      <Another />
    </div>
  );
}

export default App;
