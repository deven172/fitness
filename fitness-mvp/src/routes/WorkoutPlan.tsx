import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Card from '../components/Card';
import { db } from '../db/db';

export default function WorkoutPlan() {
  const [name, setName] = useState('');
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState<string[]>([]);

  function addExercise() {
    if (!exercise) return;
    setExercises([...exercises, exercise]);
    setExercise('');
  }

  function save() {
    db.workoutPlans.add({ id: uuid(), name, scheduledDate: new Date().toISOString().slice(0,10), exercises });
    setName('');
    setExercises([]);
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Workout Plan</h1>
      <Card>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Plan name" className="border p-1 mb-2 w-full" />
        <div className="flex gap-2 mb-2">
          <input value={exercise} onChange={e => setExercise(e.target.value)} placeholder="Exercise" className="border p-1 flex-1" />
          <button className="btn" onClick={addExercise}>Add</button>
        </div>
        <ul className="mb-2 list-disc pl-4">
          {exercises.map((ex,i) => <li key={i}>{ex}</li>)}
        </ul>
        <button className="btn" onClick={save}>Save Plan</button>
      </Card>
    </div>
  );
}
