import { useState } from 'react'
import { Route, Routes} from "react-router-dom";
import ClientDashboard from './pages/client/ClientDashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Routes>
          <Route path="/client" element={<ClientDashboard />} />
        </Routes>
      </div>
    </>
  )
}

export default App
