import { Provider } from "react-redux"
import MainRouters from "./routers/MainRouters"
import { persistor, store } from "./redux/store/store"
import { PersistGate } from "redux-persist/integration/react"


function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainRouters />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
