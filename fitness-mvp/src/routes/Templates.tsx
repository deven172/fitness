import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { DailyPlan, db } from '../db/db';

interface Template {
  name: string;
  plan: Omit<DailyPlan, 'date'>;
}

function todayISO() {
  return new Date().toISOString().slice(0,10);
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('templates');
    if (stored) setTemplates(JSON.parse(stored));
  }, []);

  function saveTemplates(t: Template[]) {
    localStorage.setItem('templates', JSON.stringify(t));
    setTemplates(t);
  }

  async function saveCurrent() {
    const plan = await db.dailyPlans.get(todayISO());
    if (!plan) return;
    const t = [...templates, { name, plan: { ...plan, date: undefined } as any }];
    saveTemplates(t);
    setName('');
  }

  function applyTemplate(t: Template) {
    db.dailyPlans.put({ date: todayISO(), ...t.plan });
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Templates</h1>
      <Card>
        <div className="mb-2 flex gap-2">
          <input value={name} onChange={e => setName(e.target.value)} className="border p-1 flex-1" placeholder="Template name" />
          <button className="btn" onClick={saveCurrent}>Save</button>
        </div>
        <ul>
          {templates.map((t,i) => (
            <li key={i} className="flex justify-between mb-1">
              {t.name}
              <div className="space-x-2">
                <button className="btn" onClick={() => applyTemplate(t)}>Apply</button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
