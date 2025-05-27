import React, { useState } from 'react';
import {
  UploadOverlay,
  UploadForm,
  FormGroup,
  GenreSelect,
  FileUpload,
  FormActions,
  ActionButton,
  ErrorMessage,
  PreviewImage
} from './AdminStyles';
import api from '../../services/api';
import axios from 'axios';

const AVAILABLE_GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
  'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life'
];

const AdminUploadForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genres: [],
    status: 'Ongoing',
    summary: '',
    coverImage: null,
    chapterFiles: []
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleGenreChange = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChapterFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      chapterFiles: [...prev.chapterFiles, ...files]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (formData.genres.length === 0) newErrors.genres = 'Select at least one genre';
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
    if (formData.summary.length < 100) newErrors.summary = 'Summary must be at least 100 characters';
    if (!formData.coverImage) newErrors.coverImage = 'Cover image is required';
    if (formData.chapterFiles.length === 0) newErrors.chapterFiles = 'At least one chapter file is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started');

    if (!validateForm()) {
      console.log('Form validation failed:', errors);
      return;
    }
    console.log('Form validation passed');

    try {
      setLoading(true);
      const formDataToSend = new FormData();

      // Log form data before sending
      console.log('Form data before sending:', formData);

      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'genres') {
          formData.genres.forEach(genre => {
            formDataToSend.append('genres[]', genre);
          });
        } else if (key === 'chapterFiles') {
          formData.chapterFiles.forEach(file => {
            formDataToSend.append('chapters', file);
          });
        } else if (key === 'coverImage') {
          formDataToSend.append('coverImage', formData.coverImage);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add approved flag for admin uploads
      formDataToSend.append('approved', 'true');

      // Log the FormData contents
      console.log('FormData contents:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      console.log('Sending request to /admin/comics/upload');
      formDataToSend.append('uploadedBy', 'admin');
      const response = await axios.post('http://localhost:5000/api/comics/upload', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload response:', response.data);

      onSuccess(response.data);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setErrors({
        submit: error.response?.data?.message || 'Failed to upload comic. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <UploadOverlay>
      <UploadForm>
        <h2>Upload New Comic</h2>
        <form onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter comic title"
            />
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter author name"
            />
            {errors.author && <ErrorMessage>{errors.author}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label>Genres</label>
            <GenreSelect>
              {AVAILABLE_GENRES.map(genre => (
                <label key={genre}>
                  <input
                    type="checkbox"
                    checked={formData.genres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                  />
                  {genre}
                </label>
              ))}
            </GenreSelect>
            {errors.genres && <ErrorMessage>{errors.genres}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="summary">Summary</label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              placeholder="Enter comic summary (minimum 100 characters)"
            />
            {errors.summary && <ErrorMessage>{errors.summary}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label>Cover Image</label>
            <FileUpload onClick={() => document.getElementById('coverImage').click()}>
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                onChange={handleCoverImageChange}
              />
              <div className="upload-icon">📷</div>
              <div className="upload-text">
                {formData.coverImage ? formData.coverImage.name : 'Click to upload cover image'}
              </div>
            </FileUpload>
            {coverPreview && <PreviewImage src={coverPreview} alt="Cover preview" />}
            {errors.coverImage && <ErrorMessage>{errors.coverImage}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label>Chapter Files</label>
            <FileUpload onClick={() => document.getElementById('chapterFiles').click()}>
              <input
                type="file"
                id="chapterFiles"
                multiple
                accept=".pdf,.zip,.rar"
                onChange={handleChapterFilesChange}
              />
              <div className="upload-icon">📚</div>
              <div className="upload-text">
                {formData.chapterFiles.length > 0
                  ? `${formData.chapterFiles.length} files selected`
                  : 'Click to upload chapter files'}
              </div>
            </FileUpload>
            {errors.chapterFiles && <ErrorMessage>{errors.chapterFiles}</ErrorMessage>}
          </FormGroup>

          {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

          <FormActions>
            <ActionButton
              type="button"
              onClick={() => {
                console.log('Cancel button clicked');
                onClose();
              }}
              disabled={loading}
            >
              Cancel
            </ActionButton>
            <ActionButton
              type="submit"
              success
              disabled={loading}
              style={{ marginLeft: '1rem' }}
              onClick={() => console.log('Submit button clicked')}
            >
              {loading ? 'Uploading...' : 'Upload Comic'}
            </ActionButton>
          </FormActions>
        </form>
      </UploadForm>
    </UploadOverlay>
  );
};

export default AdminUploadForm; 