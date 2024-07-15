import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Routers } from './router'
import { store } from './store'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fallbackRender({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  console.log('fromErrorBoundary', error);
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

function App() {

  return (

    <ErrorBoundary FallbackComponent={fallbackRender}>
      <Provider store={store}>
        {/* <React.StrictMode>
        </React.StrictMode> */}
        <RouterProvider router={Routers}>
        </RouterProvider>
      </Provider >
    </ErrorBoundary>

  )
}

export default App