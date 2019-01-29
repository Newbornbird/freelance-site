import React from 'react';

const JobPostStatus = (props) => (
  <div className="job-post-status flexbox justify-space-between">
    <div>
      <span className="status-text"><em>Job was posted successfully</em></span>
      <a href="#">Preview</a>
      <a href="#">Go to My Jobs</a>
    </div>
    <button className="btn btn-bg-transparent close-btn icon-btn"><span className="glyphicon glyphicon-remove"></span></button>
  </div>
)

export default JobPostStatus;
