declare module './App.jsx' {
  import { FC } from 'react'
  const App: FC
  export default App
}

declare module './redux/store.js' {
  import { Store } from 'redux'
  const store: Store
  export default store
}
