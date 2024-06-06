import React from 'react';
import MainRouter from './router/MainRouter';
import { theme } from './styles/theme';
import { ThemeProvider } from '@emotion/react';
import Navbar from './components/navigation/Navbar';
import Sidebar from './components/navigation/Sidebar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex' }}>
        <Navbar />
        <Sidebar />
        <div style={{ flex: 1 }}>
          <MainRouter />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
