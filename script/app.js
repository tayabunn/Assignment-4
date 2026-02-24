document.addEventListener('DOMContentLoaded', () => {
  const totalEl = document.getElementById('totalCount');
  const appliedEl = document.getElementById('appliedCount');
  const interviewEl = document.getElementById('interviewCount');
  const rejectedEl = document.getElementById('rejectedCount');
  const tabCountEl = document.getElementById('tabCount');

  const filterButtons = {
    all: document.getElementById('all-filter-btn'),
    applied: document.getElementById('applied-filter-btn'),
    interview: document.getElementById('interview-filter-btn'),
    rejected: document.getElementById('rejected-filter-btn'),
  };

  // gather job sections (each top-level section with id "job-card-*")
  const sections = Array.from(document.querySelectorAll('section[id^="job-card-"]'));
  const jobs = sections.map(section => {
    const card = section.querySelector('.card') || section.querySelector('.job-card') || section;
    return {
      section,
      card,
      status: 'Not Applied', // initial
      badgeBtn: section.querySelector('#not-applied-btn') || section.querySelector('button'), // small status badge
    };
  });

  function updateCounts() {
    const counts = { total: 0, Applied: 0, Interview: 0, Rejected: 0 };
    jobs.forEach(j => {
      if (!document.body.contains(j.section)) return; // removed
      counts.total++;
      if (j.status === 'Applied') counts.Applied++;
      if (j.status === 'Interview') counts.Interview++;
      if (j.status === 'Rejected') counts.Rejected++;
    });
    totalEl.textContent = counts.total;
    appliedEl.textContent = counts.Applied;
    interviewEl.textContent = counts.Interview;
    rejectedEl.textContent = counts.Rejected;
  }

  function setBadgeVisual(badgeBtn, status) {
    if (!badgeBtn) return;
    badgeBtn.textContent = status.toUpperCase();
    // inline visual update
    badgeBtn.style.color = '#002c5c';
    badgeBtn.style.border = '2px solid transparent';
    badgeBtn.style.background = 'transparent';
    if (status === 'Applied') {
      badgeBtn.style.background = '#e6f0ff';
      badgeBtn.style.color = '#1e40af';
    } else if (status === 'Interview') {
      badgeBtn.style.background = '#ecfdf5';
      badgeBtn.style.color = '#047857';
    } else if (status === 'Rejected') {
      badgeBtn.style.background = '#fff1f2';
      badgeBtn.style.color = '#991b1b';
    } else {
      badgeBtn.style.background = '#eef4ff';
      badgeBtn.style.color = '#002c5c';
    }
  }

  function applyStatus(jobObj, newStatus) {
    jobObj.status = newStatus;
    setBadgeVisual(jobObj.badgeBtn, newStatus);
    updateCounts();
    // if a filter is active, re-apply it so UI reflects changes
    const activeFilter = currentFilter || 'all';
    toggleStyle(activeFilter);
  }

  // attach handlers for each job's buttons
  jobs.forEach(job => {
    const card = job.card;
    // status action buttons (APPLIED / INTERVIEW / REJECTED) - detect by text
    const buttons = Array.from(card.querySelectorAll('button'));
    buttons.forEach(btn => {
      const txt = (btn.textContent || '').trim().toUpperCase();
      if (txt === 'APPLIED') {
        btn.addEventListener('click', () => applyStatus(job, 'Applied'));
      } else if (txt === 'INTERVIEW') {
        btn.addEventListener('click', () => applyStatus(job, 'Interview'));
      } else if (txt === 'REJECTED') {
        btn.addEventListener('click', () => applyStatus(job, 'Rejected'));
      } else {
        // delete button detection: svg inside button (trash icon)
        if (btn.querySelector && btn.querySelector('svg')) {
          btn.addEventListener('click', () => {
            // remove from DOM and update counts
            if (job.section && job.section.parentElement) {
              job.section.parentElement.removeChild(job.section);
            } else if (job.card && job.card.parentElement) {
              job.card.parentElement.removeChild(job.card);
            }
            updateCounts();
            // re-apply current filter so tab count updates
            const activeFilter = currentFilter || 'all';
            toggleStyle(activeFilter);
          });
        }
      }
    });

    // initialize badge visuals
    setBadgeVisual(job.badgeBtn, job.status);
  });

  let currentFilter = 'all';
  window.toggleStyle = function(filter) {
    currentFilter = filter;
    // set active classes on filter buttons (simple bg switching)
    Object.entries(filterButtons).forEach(([key, btn]) => {
      if (!btn) return;
      if (key === filter) {
        btn.classList.remove('bg-white', 'border', 'text-[#64748b]');
        btn.classList.add('bg-blue-500', 'text-white');
      } else {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-white', 'border', 'text-[#64748b]');
      }
    });

    let matched = 0;
    jobs.forEach(job => {
      if (!document.body.contains(job.section)) return; // skip removed
      const s = job.status;
      let show = false;
      if (filter === 'all') show = true;
      else if (filter === 'applied' && s === 'Applied') show = true;
      else if (filter === 'interview' && s === 'Interview') show = true;
      else if (filter === 'rejected' && s === 'Rejected') show = true;
      job.section.style.display = show ? '' : 'none';
      if (show) matched++;
    });

    if (tabCountEl) tabCountEl.textContent = `${matched} jobs`;

    // Show empty state if no jobs match the filter
    const emptyState = document.getElementById('filtered-section');
    if (matched === 0) {
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
    }
  };

  // initial counts and ensure 'all' is active
  updateCounts();
  toggleStyle('all');
});