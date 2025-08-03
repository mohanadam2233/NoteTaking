import Navbar from '../components/Navbar'
import {useState,useEffect} from 'react'
import RateLimitedUi from '../components/RateLimitedUi'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'
import api from '../lib/axios'
function Homepage() {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes,setnotes]= useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes=async ()=>{
      try {
        const res=await api.get('/notes');
        setnotes(res.data);
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching notes:");
        console.log(error);
        if(error.response?.status === 429){
          setIsRateLimited(true);
        } else{
          toast.error("failed to fetch notes");
      }
       } finally {
          setLoading(false);
        }
    };
    fetchNotes();
  },[]);
  return (
    <div className="min-h-screen">
      <Navbar/>
     
      {isRateLimited &&<RateLimitedUi />}

      <div className="max-w-7xl max-auto p-4 mt-6">
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound/>}
        {notes.length >0 &&  !isRateLimited &&(
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map(note => (
          <div key={note._id}>
          <NoteCard note={note} setnotes={setnotes} />
         </div>
     ))}

          </div>
        )}
      </div>
    </div>
  )
}

export default Homepage
