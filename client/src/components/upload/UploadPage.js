import React, { useState, useRef } from 'react';
import Navbar from '../../components/shared/Navbar';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const styles = {
  uploadContainer: {
    maxWidth: 600,
    margin: '40px auto',
    padding: 32,
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
    fontFamily: 'sans-serif'
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    color: '#333'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  label: {
    fontWeight: 600,
    marginBottom: 2
  },
  helperText: {
    fontSize: 12,
    color: '#888'
  },
  errorMessage: {
    color: '#d32f2f',
    fontSize: 13,
    marginTop: 2
  },
  input: {
    padding: '8px 10px',
    border: '1px solid #ccc',
    borderRadius: 5,
    fontSize: 16
  },
  select: {
    padding: '8px 10px',
    border: '1px solid #ccc',
    borderRadius: 5,
    fontSize: 16
  },
  textArea: {
    padding: '8px 10px',
    border: '1px solid #ccc',
    borderRadius: 5,
    fontSize: 16,
    minHeight: 80,
    resize: 'vertical'
  },
  submitButton: {
    marginTop: 18,
    padding: '12px 0',
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 18,
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  fileInput: {
    fontSize: 15
  }
};

const UploadPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const coverInputRef = useRef(null);
  const chaptersInputRef = useRef(null);
  const [Loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genres: [],
    status: '',
    summary: '',
    coverImage: null,
    chapters: []
  });
  const [summaryError, setSummaryError] = useState('');

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'summary') setSummaryError('');
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'coverImage' ? files[0] : Array.from(files)
    }));
  };

  const handleGenreChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setFormData(prev => ({ ...prev, genres: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      alert('Login required to upload a comic');
      navigate('/');
      return;
    }

    if (!formData.title || !formData.author || !formData.status || !formData.summary || !formData.coverImage || formData.genres.length === 0 || formData.chapters.length === 0) {
      alert('Please complete all required fields');
      return;
    }

    if (formData.summary.length < 100) {
      setSummaryError('Summary must be at least 100 characters.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('status', formData.status);
    data.append('summary', formData.summary);
    data.append('uploadedBy', user._id);
    data.append('coverImage', formData.coverImage);
    formData.genres.forEach(genre => data.append('genres', genre));
    (formData.chapters || []).forEach(file => data.append('chapters', file));

    try {
      const response = await axios.post('http://localhost:5000/api/comics/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert('Comic uploaded successfully!');
        setLoading(false);
        setFormData({
          title: '',
          author: '',
          genres: [],
          status: '',
          summary: '',
          coverImage: null,
          chapters: []
        });
        // Reset file inputs
        if (coverInputRef.current) coverInputRef.current.value = '';
        if (chaptersInputRef.current) chaptersInputRef.current.value = '';
      } else {
        alert(response.data.error || 'Upload failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Upload error. Please try again later.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.uploadContainer}>
        <h1 style={styles.title}>Upload Comic</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="title">Comic Title</label>
            <input
              style={styles.input}
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="author">Author</label>
            <input
              style={styles.input}
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="genres">Genres</label>
            <select
              style={styles.select}
              id="genres"
              name="genres"
              multiple
              value={formData.genres}
              onChange={handleGenreChange}
              required
            >
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="status">Status</label>
            <select
              style={styles.select}
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="">Select status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="summary">Summary</label>
            <small style={styles.helperText}>At least 100 characters</small>
            <textarea
              style={styles.textArea}
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
            />
            {summaryError && <span style={styles.errorMessage}>{summaryError}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="coverImage">Cover Image</label>
            <input
              style={styles.fileInput}
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
              required
              ref={coverInputRef}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="chapters">Comic Chapters (PDF)</label>
            <input
              style={styles.fileInput}
              type="file"
              id="chapters"
              name="chapters"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              required
              ref={chaptersInputRef}
            />
          </div>

          <button style={styles.submitButton} disabled={Loading} type="submit">{Loading?"Uploading...":"Upload Comic"}</button>
        </form>
      </div>
    </>
  );
};

export default UploadPage;
