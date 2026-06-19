'use client';
import { useState, useEffect } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import HistoryCard from '@/components/History/HistoryCard';
import { generateMockHistory } from '@/lib/mockAI';
import { SUBJECTS } from '@/lib/constants';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all'); // all, high, low
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, highest
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setHistory(generateMockHistory());
      setLoading(false);
    }, 600);
  }, []);

  // Filter and sort
  const filteredData = history.filter(item => {
    const matchesSearch = item.topic.toLowerCase().includes(search.toLowerCase()) || 
                          item.preview.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subject ? item.subject === subject : true;
    
    let matchesRating = true;
    if (ratingFilter === 'high') matchesRating = item.qualityScore >= 7;
    if (ratingFilter === 'low') matchesRating = item.qualityScore <= 4;
    
    return matchesSearch && matchesSubject && matchesRating;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'highest') return b.qualityScore - a.qualityScore;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClearFilters = () => {
    setSearch('');
    setSubject('');
    setRatingFilter('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <AppLayout>
      <div className="page-header mb-md flex-between">
        <div>
          <h1>Generation History</h1>
          <p>Review and export your past lesson evaluations.</p>
        </div>
        <button className="btn btn-outline-gold">
          ⬇ Export All as CSV
        </button>
      </div>

      <div className="filter-bar">
        <div className="form-group" style={{flex: 2}}>
          <label className="form-label" style={{fontSize: 12}}>Search Topics</label>
          <input 
            type="text" className="form-input" 
            placeholder="Search by topic or content..." 
            value={search} onChange={e => {setSearch(e.target.value); setCurrentPage(1)}}
          />
        </div>
        <div className="form-group">
          <label className="form-label" style={{fontSize: 12}}>Subject</label>
          <select 
            className="form-input form-select" 
            value={subject} onChange={e => {setSubject(e.target.value); setCurrentPage(1)}}
          >
            <option value="">All Subjects</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" style={{fontSize: 12}}>Quality Score</label>
          <select 
            className="form-input form-select" 
            value={ratingFilter} onChange={e => {setRatingFilter(e.target.value); setCurrentPage(1)}}
          >
            <option value="all">All Scores</option>
            <option value="high">High (≥7)</option>
            <option value="low">Needs Improvement (≤4)</option>
          </select>
        </div>
        <button className="btn btn-ghost" onClick={handleClearFilters} style={{marginBottom: 4}}>
          Clear Filters
        </button>
      </div>

      <div className="sort-controls">
        <span style={{fontSize: 13, color: 'var(--color-text-muted)', marginRight: 8, display: 'flex', alignItems: 'center'}}>Sort by:</span>
        <button className={`sort-btn ${sortBy === 'newest' ? 'active' : ''}`} onClick={() => setSortBy('newest')}>Newest First</button>
        <button className={`sort-btn ${sortBy === 'oldest' ? 'active' : ''}`} onClick={() => setSortBy('oldest')}>Oldest First</button>
        <button className={`sort-btn ${sortBy === 'highest' ? 'active' : ''}`} onClick={() => setSortBy('highest')}>Highest Rated</button>
      </div>

      <div style={{minHeight: 400}}>
        {loading ? (
          <div className="flex-center" style={{height: 200}}>
            <div className="spinner" style={{borderColor: 'var(--color-primary)', borderTopColor: 'transparent', width: 30, height: 30, borderWidth: 4}}></div>
          </div>
        ) : currentData.length === 0 ? (
          <div className="card flex-center" style={{height: 200, flexDirection: 'column'}}>
            <div style={{fontSize: 40, marginBottom: 12, opacity: 0.5}}>📭</div>
            <h3 className="text-muted">No history found</h3>
            <p className="text-muted mt-sm">Try adjusting your filters</p>
          </div>
        ) : (
          <div>
            {currentData.map(gen => (
              <HistoryCard key={gen.id} generation={gen} />
            ))}
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            ←
          </button>
          
          {Array.from({ length: totalPages }).map((_, i) => (
            <button 
              key={i + 1} 
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            →
          </button>
        </div>
      )}
    </AppLayout>
  );
}
