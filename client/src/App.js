import React, { useEffect } from 'react';
import Router from './Components/Router/Router';
import HTTP from './Utils/HTTP';
import userStore from './Store/user.store';
import pageStore from './Store/page.store';

function App() {
  const fetchUser = async (signal) => {
    const response = await HTTP.GET('/api/profile', signal);
    userStore.dispatch({ type: 'set', data: response.data });
  }

  const fetchPageSettings = async (signal) => {
    const response = await HTTP.GET('/', signal);
    pageStore.dispatch({ type: 'set', data: response.data });
  }

  useEffect(() => {
    const abort = new AbortController();
    fetchUser(abort.signal);
    fetchPageSettings(abort.signal);
    return () => abort.abort();
  }, []);

  return (
    <div className="App">
      <Router></Router>
    </div>
  );
}

export default App;
