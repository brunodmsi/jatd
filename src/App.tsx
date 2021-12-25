import { useCallback, useState } from 'react';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';

type Activity = {
  id: string;
  description: string;
  created: Date;
}

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [description, setDescription] = useState('');

  const saveActivity = useCallback(() => {
    if (!description || description.length === 0) {
      return;
    }

    setActivities(oldActivities => [
      {
        id: uuidv4(),
        description,
        created: new Date()
      }, 
      ...activities
    ])

    setDescription('')
  }, [activities, description])

  return (
    <>
      <Header />

      <div
        className="flex justify-center items-center flex-col mt-3"
      >
        <div className="flex flex-col max-w-lg w-full">
          <label className="block">
            <span className="after:content-['*'] after:text-red-500 after:ml-0.5 block text-md font-medium text-gray-700">
              Activity
            </span>
            <input 
              type="text" 
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="buying groceries"
            />
          </label>

          <button
            className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-bold text-sm rounded-md py-1 px-8 mt-1"
            onClick={saveActivity}
          >
            Save
          </button>
        </div>
        
        <div className="max-w-lg w-full mt-5">
          <h1 className="font-bold text-2xl">Activities</h1>
          
          <div className="flex flex-col">
            {activities.map(activity => (
              <div key={activity.id} className="flex flex-row justify-between items-center my-2">
                <div className="flex flex-row items-center">
                  <input type="checkbox" className="mr-3 default:ring-2" />
                  <p>{activity.description}</p>
                </div>
                {/* <div className="flex flex-row">
                  <small>{activity.created.toLocaleDateString()}</small>
                  <button>
                    deletar
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
