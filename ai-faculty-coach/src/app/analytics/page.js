'use client';
import { useState, useEffect } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { generateMockAnalytics } from '@/lib/mockAI';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(generateMockAnalytics());
  }, []);

  if (!data) return (
    <AppLayout>
      <div className="flex-center" style={{height: '100vh'}}>
        <div className="spinner" style={{borderColor: 'var(--color-primary)', borderTopColor: 'transparent', width: 40, height: 40, borderWidth: 4}}></div>
      </div>
    </AppLayout>
  );

  return (
    <AppLayout>
      <div className="page-header mb-md flex-between">
        <div>
          <h1>Quality Analytics</h1>
          <p>System-wide pedagogical trends and insights.</p>
        </div>
        <select className="form-input form-select" style={{width: 200, background: 'white'}}>
          <option>Last 30 Days</option>
          <option>This Semester</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon dark">📄</div>
          <div>
            <div className="kpi-value">2,845</div>
            <div className="kpi-label">Total Generations</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon success">⭐</div>
          <div>
            <div className="kpi-value">7.8</div>
            <div className="kpi-label">Average Quality Score</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon success">📈</div>
          <div>
            <div className="kpi-value">68%</div>
            <div className="kpi-label">High Quality Rate (≥7)</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon gold">👨‍🏫</div>
          <div>
            <div className="kpi-value">142</div>
            <div className="kpi-label">Active Teachers</div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Quality Trend Chart */}
        <div className="chart-card full-width">
          <h3>📈 Quality Score Trend (Last 30 Days)</h3>
          <div style={{width: '100%', height: 300}}>
            <ResponsiveContainer>
              <LineChart data={data.days} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="date" tick={{fontSize: 12, fill: '#6B6B6B'}} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{fontSize: 12, fill: '#6B6B6B'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{borderRadius: 12, border: '1px solid #E0D5C5', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}}
                />
                <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="var(--color-gold)" strokeWidth={3} dot={false} activeDot={{r: 6, fill: 'var(--color-primary)'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="chart-card">
          <h3>⭐ User Rating Distribution</h3>
          <div style={{width: '100%', height: 260}}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data.ratingDist}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.ratingDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: 12}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Generations per Day */}
        <div className="chart-card">
          <h3>📊 Generations per Day</h3>
          <div style={{width: '100%', height: 260}}>
            <ResponsiveContainer>
              <BarChart data={data.days}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="date" tick={{fontSize: 10, fill: '#6B6B6B'}} axisLine={false} tickLine={false} interval="preserveStartEnd" minTickGap={30} />
                <YAxis tick={{fontSize: 12, fill: '#6B6B6B'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'rgba(212, 165, 55, 0.1)'}} />
                <Bar dataKey="count" name="Evaluations" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Teaching Methods Radar */}
        <div className="chart-card">
          <h3>🎯 Avg Quality by Teaching Method</h3>
          <div style={{width: '100%', height: 320}}>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.methodData}>
                <PolarGrid stroke="#eee" />
                <PolarAngleAxis dataKey="method" tick={{fontSize: 11, fill: '#1A1A1A'}} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{fontSize: 10}} />
                <Radar name="Quality Score" dataKey="avgScore" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Teachers */}
        <div className="chart-card">
          <h3>🏆 Top Performing Teachers</h3>
          <table className="data-table mt-sm" style={{width: '100%'}}>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Dept</th>
                <th>Generations</th>
                <th>Avg Score</th>
              </tr>
            </thead>
            <tbody>
              {data.topTeachers.map((t, i) => (
                <tr key={i}>
                  <td>
                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                      <div style={{width: 28, height: 28, borderRadius: '50%', background: 'var(--color-gold)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 'bold'}}>
                        {t.avatar}
                      </div>
                      <span style={{fontWeight: 500}}>{t.name}</span>
                    </div>
                  </td>
                  <td style={{fontSize: 13, color: 'var(--color-text-muted)'}}>{t.dept}</td>
                  <td style={{textAlign: 'center'}}>{t.count}</td>
                  <td>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                      <span style={{fontWeight: 600, color: t.avgScore >= 8 ? 'var(--color-success)' : 'inherit'}}>{t.avgScore.toFixed(1)}</span>
                      <div style={{width: 40, height: 4, background: '#eee', borderRadius: 2}}>
                        <div style={{width: `${(t.avgScore/10)*100}%`, height: '100%', background: t.avgScore >= 8 ? 'var(--color-success)' : 'var(--color-gold)', borderRadius: 2}}></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
