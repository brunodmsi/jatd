import { FaTrashAlt } from "react-icons/fa";
import useFetch, { RequestStatus } from "../../hooks/useFetch"
import { axiosOptions } from "../config/axios";

type Activity = {
  id: string;
  description: string;
  checked: boolean;
  created: string;
}

const ActivityList = () => {
	const [{ status, data: activities, error }, executeGet] = useFetch<Activity[]>('activities', axiosOptions)

	const [, executeChange] = useFetch(
		'activities', 
		{
			...axiosOptions,
			method: 'DELETE'
		},
		{ manual: true }
	)

	const [, executeDelete] = useFetch(
		'', {
			...axiosOptions,
			method: 'PUT'
		},
		{ manual: true }
	)

	const handleDeleteActivity = (id: string) => {
		executeDelete(`activities/${id}`, {
			method: 'DELETE'
		})

		executeGet('activities');
  };

	if (status === RequestStatus.fetching) {
		return <h1>loading</h1>
	}

	if (error) {
		return <h1>{error}</h1>
	}

	return (
		<>
			{(!activities || !activities.length) && (
				<span className="italic text-gray-500">No saved activities..</span>
			)}

			{activities && activities.length > 0 && activities.map(activity => (
				<div key={activity.id} className="flex flex-row justify-between items-center my-2">
					<div className="flex flex-row items-center">
						<input 
							type="checkbox" 
							className={`mr-3 default:ring-2 ${activity.checked ? 'italic line-through' : ''}`}
							defaultChecked={activity.checked}
							onChange={() => {
								const activityIdx = activities.findIndex(idxAct => idxAct.id === activity.id); 
								const activityToUpdate = activities[activityIdx];
								activityToUpdate.checked = !activityToUpdate.checked;
								executeChange(`activities/${activityToUpdate.id}`, {
									data: activityToUpdate,
									method: 'PUT'
								});
							}}
						/>
						<p className={`${activity.checked ? 'italic line-through' : ''}`}>{activity.description}</p>
					</div>
					<div className="flex flex-col items-end">
						<button 
							className="mb-1" 
							onClick={() => handleDeleteActivity(activity.id)}
						>
							<FaTrashAlt className="text-indigo-500 hover:text-indigo-700 transition-colors" />
						</button>
						<small className="text-xs">{new Date(activity.created).toDateString()} at {new Date(activity.created).toLocaleTimeString()}</small>
					</div>
				</div>
			))}
		</>
	)
}

export default ActivityList;