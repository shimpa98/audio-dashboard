// src/components/TimelineView/TimelineView.jsx
import React, { useState, useEffect } from 'react';
import { apiEndpoints } from '../../services/api';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const TimelineView = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await apiEndpoints.getTimeline(); // Use current date or param
        setTimeline(response.data.timeline || []);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  if (loading) return <div>Loading timeline...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Processing Timeline</h2>
      <VerticalTimeline>
        {timeline.map((event, index) => (
          <VerticalTimelineElement
            key={index}
            date={event.timestamp_readable}
            iconStyle={{ background: event.status === 'success' ? 'green' : 'red', color: '#fff' }}
          >
            <h3 className="font-bold">{event.filename}</h3>
            <p>Duration: {event.processing_time.toFixed(2)}s</p>
            <span className={`inline-block px-2 py-1 rounded text-xs ${
              event.status === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
            }`}>
              {event.status}
            </span>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default TimelineView;