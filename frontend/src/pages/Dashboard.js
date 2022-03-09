import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'
import { getGoals, reset } from '../features/goal/goalSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => { dispatch(reset) }
  }, [user, navigate, isError, message, dispatch])
  
  if(isLoading) {
    return <Spinner />
  }

  return <>
    <section className="header">
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
    </section>

    <GoalForm />

    <section className="content">
      {goals.length > 0 ? (
        <div className='goals'>
          {goals.map((goal) => (
            <GoalItem key={goal._id}  goal={goal} />
          ))}
        </div>
      ) : (<h2>You have not set any goals</h2>)}
    </section>
  </>
}

export default Dashboard