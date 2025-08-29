// Utility: render a small table card
    function renderTable({ title, columns, rows, container }) {
      const card = document.createElement('div');
      card.className = 'card';

      const h2 = document.createElement('h2');
      h2.textContent = title;
      card.appendChild(h2);

      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const trHead = document.createElement('tr');
      columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        trHead.appendChild(th);
      });
      thead.appendChild(trHead);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      rows.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
          const td = document.createElement('td');
          td.textContent = cell;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      card.appendChild(table);

      container.appendChild(card);
    }

    // Show/hide status + spinner
    const statusEl = document.getElementById('status');
    function setStatus(text, spinning = false) {
      statusEl.innerHTML = spinning ? `<span class="spinner"></span>${text}` : text;
    }

    const errorEl = document.getElementById('error');
    function showError(msg) {
      errorEl.style.display = 'block';
      errorEl.textContent = msg;
    }
    function clearError() {
      errorEl.style.display = 'none';
      errorEl.textContent = '';
    }

    const tablesArea = document.getElementById('tablesArea');
    function clearTables() { tablesArea.innerHTML = ''; }

    // Core requirement: three functions returning Promises, each with setTimeout delay
    // Each resolves with resolve(true) *after* the data is rendered to UI.
    function promiseAPI1() {
      return new Promise((resolve, reject) => {
        setStatus('Waiting 1s, then fetching Posts...', true);
        setTimeout(() => {
          fetch('https://dummyjson.com/posts')
            .then(r => {
              if (!r.ok) throw new Error('Posts request failed');
              return r.json();
            })
            .then(data => {
              // Display first 10 items in a table (keep UI compact)
              const rows = (data.posts || []).slice(0, 10).map(p => [
                String(p.id), p.title, p.body.slice(0, 80) + (p.body.length > 80 ? '…' : '')
              ]);
              renderTable({
                title: 'Posts (first 10)',
                columns: ['ID', 'Title', 'Body (truncated)'],
                rows,
                container: tablesArea
              });
              resolve(true); // important: resolve only after rendering
            })
            .catch(err => reject(err));
        }, 1000); // 1000ms delay
      });
    }

    function promiseAPI2(prevResolved) {
      // Requirement: only proceed if previous promise resolved === true
      if (!prevResolved) return Promise.reject(new Error('Previous step not resolved'));
      return new Promise((resolve, reject) => {
        setStatus('Waiting 2s, then fetching Products...', true);
        setTimeout(() => {
          fetch('https://dummyjson.com/products')
            .then(r => {
              if (!r.ok) throw new Error('Products request failed');
              return r.json();
            })
            .then(data => {
              const rows = (data.products || []).slice(0, 10).map(p => [
                String(p.id), p.title, String(p.price), p.category
              ]);
              renderTable({
                title: 'Products (first 10)',
                columns: ['ID', 'Title', 'Price', 'Category'],
                rows,
                container: tablesArea
              });
              resolve(true);
            })
            .catch(err => reject(err));
        }, 2000); // 2000ms delay
      });
    }

    function promiseAPI3(prevResolved) {
      if (!prevResolved) return Promise.reject(new Error('Previous step not resolved'));
      return new Promise((resolve, reject) => {
        setStatus('Waiting 3s, then fetching Todos...', true);
        setTimeout(() => {
          fetch('https://dummyjson.com/todos')
            .then(r => {
              if (!r.ok) throw new Error('Todos request failed');
              return r.json();
            })
            .then(data => {
              const rows = (data.todos || []).slice(0, 10).map(t => [
                String(t.id), t.todo, t.completed ? 'Yes' : 'No', String(t.userId)
              ]);
              renderTable({
                title: 'Todos (first 10)',
                columns: ['ID', 'Todo', 'Completed', 'User ID'],
                rows,
                container: tablesArea
              });
              resolve(true);
            })
            .catch(err => reject(err));
        }, 3000); // 3000ms delay
      });
    }

    // Promise chaining using async/await (clean & readable)
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', async () => {
      startBtn.disabled = true;
      clearError();
      clearTables();
      setStatus('Starting…', true);

      try {
        const step1 = await promiseAPI1();             // Posts
        const step2 = await promiseAPI2(step1);        // Products (only if step1)
        await promiseAPI3(step2);                      // Todos (only if step2)
        setStatus('All data loaded ✅', false);
      } catch (err) {
        showError(err.message || 'Something went wrong.');
        setStatus('Failed ❌', false);
      } finally {
        startBtn.disabled = false;
      }
    });
