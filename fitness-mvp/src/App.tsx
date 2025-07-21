import { NavLink, Route, Routes } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import Templates from './routes/Templates';
import WorkoutPlan from './routes/WorkoutPlan';
import WorkoutSession from './routes/WorkoutSession';
import Insights from './routes/Insights';

export default function App() {
  return (
    <div className="max-w-md mx-auto p-4">
      <nav className="flex justify-around mb-4">
        <NavLink to="/" end className={({isActive}) => isActive ? 'text-primary' : ''}>Today</NavLink>
        <NavLink to="/plan" className={({isActive}) => isActive ? 'text-primary' : ''}>Workout</NavLink>
        <NavLink to="/insights" className={({isActive}) => isActive ? 'text-primary' : ''}>Insights</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plan" element={<WorkoutPlan />} />
        <Route path="/session/:id" element={<WorkoutSession />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </div>
  );
}
