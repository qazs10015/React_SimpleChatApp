import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { Router } from './router.tsx'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  console.log('fromErrorBoundary', error);
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallbackRender={fallbackRender}>
    <React.StrictMode>
      <RouterProvider router={Router}>
      </RouterProvider>

    </React.StrictMode>,
  </ErrorBoundary>
)
