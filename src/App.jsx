import { useState } from 'react'
import './App.css'

function StudentRegistration() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedCourse = course.trim()
    if (!trimmedName || !trimmedCourse) return
    const newStudent = {
      id: Date.now(),
      name: trimmedName,
      course: trimmedCourse,
    }
    setStudents((s) => [newStudent, ...s])
    setName('')
    setCourse('')
  }

  function handleDelete(id) {
    setStudents((s) => s.filter((st) => st.id !== id))
  }

  return (
    <section className="panel">
      <h2>Student Registration App</h2>
      <form onSubmit={handleAdd} className="form">
        <div>
          <label>
            Name:{' '}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student name"
            />
          </label>
        </div>
        <div>
          <label>
            Course:{' '}
            <input
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Course"
            />
          </label>
        </div>
        <button type="submit">Add student</button>
      </form>

      <h3>Registered students ({students.length})</h3>
      {students.length === 0 ? (
        <p>No students registered yet.</p>
      ) : (
        <ul className="list">
          {students.map((st) => (
            <li key={st.id} className="list-item">
              <span>
                <strong>{st.name}</strong> — {st.course}
              </span>
              <button onClick={() => handleDelete(st.id)} className="small">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function BlogApp() {
  const [posts, setPosts] = useState([])
  const [text, setText] = useState('')
  const [currentUser, setCurrentUser] = useState('Me')

  function handlePost(e) {
    e.preventDefault()
    const trimmed = text.trim()
    const authorName = currentUser.trim() || 'Me'
    if (!trimmed) return
    const newPost = {
      id: Date.now(),
      text: trimmed,
      author: authorName,
      likes: 0,
    }
    setPosts((p) => [newPost, ...p])
    setText('')
  }

  function handleLike(id) {
    setPosts((p) =>
      p.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post))
    )
  }

  function handleDelete(id) {
    setPosts((p) => p.filter((post) => post.id !== id))
  }

  return (
    <section className="panel">
      <h2>Blog Application (Like Twitter)</h2>
      <form onSubmit={handlePost} className="form">
        <div>
          <label>
            Author:{' '}
            <input value={currentUser} onChange={(e) => setCurrentUser(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            What's happening?{' '}
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a post"
            />
          </label>
        </div>
        <button type="submit">Post</button>
      </form>

      <h3>Posts ({posts.length})</h3>
      {posts.length === 0 ? (
        <p>No posts yet — be the first!</p>
      ) : (
        <ul className="list">
          {posts.map((post) => (
            <li key={post.id} className="list-item">
              <div>
                <strong>{post.author}</strong>
                <p className="post-text">{post.text}</p>
                <div className="post-actions">
                  <button onClick={() => handleLike(post.id)} className="small">
                    Like ({post.likes})
                  </button>
                  {post.author === currentUser && (
                    <button onClick={() => handleDelete(post.id)} className="small danger">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function App() {
  const [view, setView] = useState('students')

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Student Registration & Blog Demo</h1>
        <nav>
          <button onClick={() => setView('students')} className={view === 'students' ? 'active' : ''}>
            Student Registration
          </button>
          <button onClick={() => setView('blog')} className={view === 'blog' ? 'active' : ''}>
            Blog Application
          </button>
        </nav>
      </header>

      <main>
        {view === 'students' && <StudentRegistration />}
        {view === 'blog' && <BlogApp />}
      </main>

      <footer className="app-footer">
        <small>Built with React - features: forms, useState, arrays, .map(), event handling, conditional rendering</small>
      </footer>
    </div>
  )
}

export default App
