import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { db, DailyPlan } from '../db/db';

function last7Days() {
  const arr: string[] = [];
  for (let i=6;i>=0;i--) {
    const d = new Date();
    d.setDate(d.getDate()-i);
    arr.push(d.toISOString().slice(0,10));
  }
  return arr;
}

export default function Insights() {
  const [data, setData] = useState<{date:string, completion:number}[]>([]);

  useEffect(() => {
    Promise.all(last7Days().map(async date => {
      const plan = await db.dailyPlans.get(date);
      if (!plan) return { date, completion: 0 };
      const vals = ['stepsTarget','caloriesTarget','proteinTarget','waterTargetMl','sleepTargetMin'].map(k => (plan as any)[k] ? 1 : 0);
      const completion = vals.reduce((a,b) => a + b, 0)/5;
      return { date, completion };
    })).then(setData);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Insights</h1>
      <Card>
        <svg width="100%" height="100" viewBox="0 0 200 100">
          {data.map((d,i) => (
            <rect key={d.date} x={i*28} y={100 - d.completion*100} width="20" height={d.completion*100} fill="var(--color-primary)" />
          ))}
        </svg>
      </Card>
    </div>
  );
}
