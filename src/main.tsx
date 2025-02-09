import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// import { styled } from '@mui/material/styles';
import { Global } from '@emotion/react';

/**
 * Рендерим наи странички, прописываем глобально стили если надо
 */
createRoot(document.getElementById('root')!).render(
  
  <StrictMode>

    <Global
        styles={{
          '#root': {
              width: '100%'
          },
        }}
    />

    <App />
  </StrictMode>,
)