import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { calendarEvents } from '../data/mockData';
import { SectionHeader } from '../components/shared/Primitives';

const EVENT_COLORS = {
  workshop: 'signal-cyan',
  deadline: 'signal-amber',
  event: 'signal-violet',
  recruitment: 'signal-magenta',
  hackathon: 'signal-violet'
};

export default function CalendarModule() {
  const [currentMonth, setCurrentMonth] = useState('August 2026');

  // Simple mock calendar grid generation
  const daysInMonth = 31;
  const firstDayOffset = 6; // Starts on Saturday for Aug 2026
  
  const days = [];
  for (let i = 0; i < firstDayOffset; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateStr = `2026-08-${day.toString().padStart(2, '0')}`;
    return calendarEvents.filter(e => e.date === dateStr);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%' }}>
      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Schedule</p>
          <h1 className="page-header__title">Calendar</h1>
        </div>
        <div className="page-header__actions">
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Add Event</button>
        </div>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0 }}>
        {/* Calendar Header */}
        <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="flex items-center gap-4">
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--bone)' }}>{currentMonth}</h2>
            <div className="flex gap-1">
              <button className="btn btn-ghost btn-sm" style={{ padding: 4 }}><ChevronLeft size={16} /></button>
              <button className="btn btn-ghost btn-sm" style={{ padding: 4 }}><ChevronRight size={16} /></button>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'var(--space-2)' }}>Today</button>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 text-2xs text-mono text-mist uppercase tracking-wider">
               <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--signal-violet)' }}></span> Events
             </div>
             <div className="flex items-center gap-2 text-2xs text-mono text-mist uppercase tracking-wider">
               <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--signal-amber)' }}></span> Deadlines
             </div>
             <div className="flex items-center gap-2 text-2xs text-mono text-mist uppercase tracking-wider">
               <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--signal-cyan)' }}></span> Workshops
             </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--surface-border)', background: 'var(--surface-1)' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ padding: 'var(--space-2)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', color: 'var(--mist)' }}>
              {day}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: 'minmax(100px, 1fr)', flex: 1, background: 'var(--surface-0)' }}>
          {days.map((day, i) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div key={i} style={{ 
                borderRight: '1px solid var(--surface-border)', 
                borderBottom: '1px solid var(--surface-border)',
                padding: 'var(--space-2)',
                background: day === 12 ? 'var(--surface-2)' : 'transparent' // highlight 'today'
              }}>
                {day && (
                  <>
                    <div style={{ 
                      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', 
                      color: day === 12 ? 'var(--signal-violet)' : 'var(--mist)', 
                      marginBottom: 'var(--space-2)',
                      fontWeight: day === 12 ? 600 : 400
                    }}>
                      {day}
                    </div>
                    <div className="flex flex-col gap-1">
                      {dayEvents.map(e => (
                        <div key={e.id} style={{ 
                          fontSize: 'var(--text-2xs)', 
                          padding: '2px 4px', 
                          borderRadius: 'var(--radius-sm)', 
                          background: `var(--${EVENT_COLORS[e.type]}-muted)`,
                          color: `var(--${EVENT_COLORS[e.type]})`,
                          border: `1px solid rgba(var(--${EVENT_COLORS[e.type]}), 0.2)`,
                          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'
                        }}>
                          {e.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
