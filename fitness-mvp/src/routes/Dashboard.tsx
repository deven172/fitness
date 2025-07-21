import { useEffect, useState } from 'react';
import Card from '../components/Card';
import ProgressRing from '../components/ProgressRing';
import EditGoalsModal from './EditGoalsModal';
import { db, DailyPlan } from '../db/db';

function todayISO() {
  return new Date().toISOString().slice(0,10);
}

export default function Dashboard() {
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    db.dailyPlans.get(todayISO()).then(p => {
      if (p) setPlan(p);
    });
  }, []);

  const completion = plan ? (
    ['stepsTarget','caloriesTarget','proteinTarget','waterTargetMl','sleepTargetMin'].reduce((acc,key) => acc + ((plan as any)[key] ? 1 : 0),0)/5
  ) : 0;

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Today</h1>
      <Card>
        <div className="flex justify-between items-center">
          <ProgressRing progress={completion} />
          <button className="btn" onClick={() => setShowModal(true)}>Edit Goals</button>
        </div>
      </Card>
      {showModal && <EditGoalsModal plan={plan} onClose={() => setShowModal(false)} onSave={setPlan} />}
    </div>
  );
}
