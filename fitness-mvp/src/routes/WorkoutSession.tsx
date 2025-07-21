import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import { db, WorkoutPlan, WorkoutSession, ActualSet } from '../db/db';
import { v4 as uuid } from 'uuid';

export default function WorkoutSessionPage() {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [sessionId, setSessionId] = useState('');
  const [sets, setSets] = useState<ActualSet[]>([]);

  useEffect(() => {
    if (!id) return;
    db.workoutPlans.get(id).then(setPlan);
    const sId = uuid();
    setSessionId(sId);
    db.workoutSessions.add({ id: sId, planId: id, start: new Date().toISOString() });
  }, [id]);

  function updateSet(exercise: string, plannedReps: number, actualReps: number, actualWeightKg: number) {
    const set: ActualSet = { sessionId, exercise, plannedReps, actualReps, actualWeightKg };
    db.actualSets.put(set);
    setSets(prev => [...prev.filter(s => s.exercise !== exercise), set]);
  }

  function finish() {
    db.workoutSessions.update(sessionId, { end: new Date().toISOString() });
    alert('Workout complete!');
  }

  if (!plan) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Session: {plan.name}</h1>
      {plan.exercises.map(ex => {
        const set = sets.find(s => s.exercise === ex);
        return (
          <Card key={ex}>
            <div>{ex}</div>
            <div className="flex gap-2">
              <input type="number" placeholder="Planned" defaultValue={0} onChange={e => updateSet(ex, Number(e.target.value), set?.actualReps || 0, set?.actualWeightKg || 0)} className="border p-1 w-16" />
              <input type="number" placeholder="Actual reps" onChange={e => updateSet(ex, set?.plannedReps || 0, Number(e.target.value), set?.actualWeightKg || 0)} className="border p-1 w-16" />
              <input type="number" placeholder="Weight kg" onChange={e => updateSet(ex, set?.plannedReps || 0, set?.actualReps || 0, Number(e.target.value))} className="border p-1 w-16" />
            </div>
          </Card>
        );
      })}
      <button className="btn" onClick={finish}>Finish</button>
    </div>
  );
}
