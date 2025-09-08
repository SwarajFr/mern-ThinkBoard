import { useState, useEffect } from 'react'
import toast from "react-hot-toast";
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

export const HomePage = () => {
  const [israteLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
          const res = await api.get("/notes");
          console.log(res.data);
          setNotes(res.data);
          setIsRateLimited(false);
      } catch (error) {
        console.log('Error Fetching Notes');
        console.log(error.response);
        if(error.response?.status === 429){
          setIsRateLimited(true);
        }else {
          toast.error("Failed to load notes");
        }
      } finally {
        setloading(false);
      }
    };
    fetchNotes();
  }, [])


  return (
    <div className='min-h-screen'>
      <Navbar />
      {israteLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>

        {loading && <div className='text-center text-primary text-lg font-semibold py-10'>
          Loading Note<span className='animate-pulse'>...</span>
        </div>}

        {notes.length == 0 && !israteLimited && <NotesNotFound />}

        {notes.length > 0 && !israteLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
            {notes.map(note => (
              <NoteCard key = {note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default HomePage;