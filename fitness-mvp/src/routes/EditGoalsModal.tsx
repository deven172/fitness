import { FormEvent, useState } from 'react';
import { db, DailyPlan } from '../db/db';
import Card from '../components/Card';

interface Props {
  plan: DailyPlan | null;
  onClose: () => void;
  onSave: (plan: DailyPlan) => void;
}

function todayISO() {
  return new Date().toISOString().slice(0,10);
}

export default function EditGoalsModal({ plan, onClose, onSave }: Props) {
  const [form, setForm] = useState<DailyPlan>(plan || {
    date: todayISO(),
    stepsTarget: 0,
    caloriesTarget: 0,
    proteinTarget: 0,
    waterTargetMl: 0,
    sleepTargetMin: 0,
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    db.dailyPlans.put(form).then(() => {
      onSave(form);
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center">
      <Card>
        <h2 className="text-lg mb-2">Edit Goals</h2>
        <form onSubmit={submit} className="space-y-2">
          {['stepsTarget','caloriesTarget','proteinTarget','waterTargetMl','sleepTargetMin'].map(key => (
            <div key={key} className="flex justify-between">
              <label>{key.replace(/Target|Ml|Min/g,'')}</label>
              <input
                type="number"
                value={(form as any)[key]}
                onChange={e => setForm({ ...form, [key]: Number(e.target.value) })}
                className="border p-1 w-24"
              />
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="btn bg-gray-300 text-black">Cancel</button>
            <button type="submit" className="btn">Save</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
