import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Display from "./pages/Display/Display"
import Upload from "./pages/Upload/Upload"
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";

function App() {

  return (
   <div className="App">
     <Router>
      <Header/>
      <Routes>
        <Route path="/display" element={<Display/>}/>
        <Route path="/" element={<Upload/>}/>
        <Route/>
      </Routes>
      <ToastContainer />
     </Router>
   </div>
  )
}

export default App
