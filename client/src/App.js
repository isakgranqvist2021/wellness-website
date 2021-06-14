import React from 'react';
import Router from './Components/Router/Router';
import HTTP from './Utils/HTTP';
import userStore from './Store/user.store';

function App() {
  (async () => {
    const response = await HTTP.GET('/api/profile');
    if (response.success) {
      userStore.dispatch({ type: 'set', data: response.data });
    }

  })();

  return (
    <div className="App">
      <Router></Router>
    </div>
  );
}

export default App;
