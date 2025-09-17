import {Route, Routes} from 'react-router';
import HomePage from './pages/HomePage.jsx';
import SignupPage from './pages/SignupPage.jsx';  
import LoginPage from './pages/LoginPage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';


const App = () => {
  return (
    <div className='relative h-full w-full'> 
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#37bdf840_100%)]"/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/note/:id" element={<NoteDetailPage/>} />
      </Routes>
    </div>
  )
}

export default App;
