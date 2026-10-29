
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [internships, setInternships] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    rollNumber: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/internships')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Could not load internships');
        }
        return res.json();
      })
      .then(setInternships)
      .catch(() => {
        setMessage('Unable to load internships. Please try again.');
      });
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function viewDetails(item) {
    setSelected(item);
    setMessage('');
  }

  function applyNow(item) {
    setSelected(item);
    setMessage('');

    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    if (!selected) {
      setMessage('Please select an internship first.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          internship: selected.title
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Application failed');
      }

      setMessage('Application submitted successfully!');
      setForm({
        name: '',
        email: '',
        rollNumber: ''
      });
    } catch (error) {
      setMessage(error.message || 'Unable to submit application.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="portal">
      <header className="hero">
        <p className="eyebrow">YOUR CAREER STARTS HERE</p>
        <h1>Student Internship Portal</h1>
        <p>
          Discover opportunities, learn new skills, and take your next step.
        </p>
      </header>

      <main className="content">
        <section>
          <h2>Explore Internships</h2>
          <p className="subheading">
            Choose an opportunity that interests you.
          </p>

          {internships.length === 0 && !message && (
            <p>Loading internships...</p>
          )}

          <div className="internship-grid">
            {internships.map((item) => (
              <article className="internship-card" key={item.id}>
                <span className="tag">{item.duration}</span>

                <h3>{item.title}</h3>
                <p className="company">{item.company}</p>
                <p>{item.description}</p>

                <div className="card-actions">
                  <button
                    type="button"
                    onClick={() => viewDetails(item)}
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    className="apply-button"
                    onClick={() => applyNow(item)}
                  >
                    Apply Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {selected && (
          <section className="application-section">
            <h2>Internship Details</h2>
            <h3>{selected.title}</h3>
            <p>
              <strong>Company:</strong> {selected.company}
            </p>
            <p>
              <strong>Duration:</strong> {selected.duration}
            </p>
            <p>
              <strong>Description:</strong> {selected.description}
            </p>
          </section>
        )}

        {selected && (
          <section
            className="application-section"
            id="application-form"
          >
            <h2>Apply for {selected.title}</h2>
            <p className="subheading">
              Complete the form below to submit your application.
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                minLength={2}
                placeholder="Enter your full name"
              />

              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />

              <label htmlFor="rollNumber">Roll Number</label>
              <input
                id="rollNumber"
                name="rollNumber"
                type="text"
                value={form.rollNumber}
                onChange={handleChange}
                required
                placeholder="Enter your roll number"
              />

              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>

            {message && (
              <p className="message" role="status">
                {message}
              </p>
            )}
          </section>
        )}

        {!selected && message && (
          <p className="message" role="status">
            {message}
          </p>
        )}
      </main>

      <footer>
        Student Internship Portal · Learn. Apply. Grow.
      </footer>
    </div>
  );
}

export default App;
