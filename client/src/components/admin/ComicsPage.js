import React, { useState, useEffect } from 'react';
import {
  PageHeader,
  PageTitle,
  Subtitle,
  SearchInput,
  UsersTable as ComicsTable,
  UsersTableHeader as ComicsTableHeader,
  UsersTableRow as ComicsTableRow,
  ActionButton,
  StatusBadge,
  GenreTag,
  GenresList,
  UploadButton,
  UploaderInfo
} from './AdminStyles';
import AdminUploadForm from './AdminUploadForm';
import api from "../../services/api"

const ComicsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const fetchComics = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/comics');
    
      setComics(res.data);
    } catch (error) {
      console.error('Failed to fetch comics:', error);
      setComics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);

  const filteredComics = comics.filter(comic => {
    if (!comic) return false;

    const searchLower = searchQuery.toLowerCase();
    const titleMatch = comic.title?.toLowerCase().includes(searchLower) || false;
    const authorMatch = comic.author?.toLowerCase().includes(searchLower) || false;
    const genreMatch = comic.genres?.some(genre =>
      genre?.toLowerCase().includes(searchLower)
    ) || false;

    return titleMatch || authorMatch || genreMatch;
  });

  const handleApprove = async (comicId, userid) => {
    try {
      setLoading(true);
      const response = await api.patch(`/admin/comics/${comicId}/approve/${userid}`);
      if (response.status === 200) {
        await fetchComics(); // Only refetch on success
      }
    } catch (error) {
      console.error('Approve failed:', error);
      alert('Failed to approve comic. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (comicId) => {
    try {
      setLoading(true);
      const response = await api.patch(`/admin/comics/${comicId}/reject`);
      if (response.status === 200) {
        await fetchComics(); // Only refetch on success
      }
    } catch (error) {
      console.error('Reject failed:', error);
      alert('Failed to reject comic. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (isapproved) => {
    if (isapproved === true) return 'success';
    if (isapproved === false) return 'danger';
    return 'warning';
  };

  const getStatusLabel = (isapproved) => {
    if (isapproved === true) return 'Approved';
    if (isapproved === false) return 'Rejected';
    return 'Pending';
  };

  const handleUploadSuccess = async (newComic) => {
    // Add the new comic to the list with approved status
    setComics(prev => [{
      ...newComic,
      isapproved: true,
      isAdminUpload: true,
      uploadedBy: {
        ...newComic.uploadedBy,
        isAdmin: true
      }
    }, ...prev]);
    await fetchComics(); // Refetch to get latest data
  };

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Comics</PageTitle>
          <Subtitle>Manage comics and upload new content</Subtitle>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <UploadButton onClick={() => setShowUploadForm(true)}>
            Upload New Comic
          </UploadButton>
          <SearchInput
            type="text"
            placeholder="Search comics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
        </div>
      </PageHeader>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading comics...</div>
      ) : filteredComics.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          {searchQuery ? 'No comics found matching your search.' : 'No comics available.'}
        </div>
      ) : (
        <ComicsTable>
          <thead>
            <ComicsTableHeader>
              <th>TITLE</th>
              <th>AUTHOR</th>
              <th>GENRES</th>
              <th>UPLOADER</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </ComicsTableHeader>
          </thead>
          <tbody>
            {filteredComics.map(comic => (
              <ComicsTableRow key={comic._id}>
                <td>{comic.title}</td>
                <td>{comic.author}</td>
                <td>
                  <GenresList>
                    {comic.genres?.map((genre, index) => (
                      <GenreTag key={index}>{genre}</GenreTag>
                    ))}
                  </GenresList>
                </td>
                <td>
                  <UploaderInfo>
                    <div className="username">{comic.uploadedBy || 'Unknown'}</div>
                    <div className="role">{comic.isAdminUpload ? 'Admin' : 'User'}</div>
                  </UploaderInfo>
                </td>
                <td>
                  <StatusBadge $status={getStatusColor(comic.isapproved)}>
                    {getStatusLabel(comic.isapproved)}
                  </StatusBadge>
                </td>
                <td>
                  {!comic.isAdminUpload && (
                    <>
                      <ActionButton
                        success
                        onClick={() => handleApprove(comic._id , comic?.uploadedBy)}
                        disabled={loading || comic.isapproved === true}
                        style={{
                          opacity: comic.isapproved === true ? 0.5 : 1,
                          cursor: comic.isapproved === true ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Approve
                      </ActionButton>
                      <ActionButton
                        danger
                        onClick={() => handleReject(comic._id)}
                        disabled={loading || comic.isapproved === false}
                        style={{
                          opacity: comic.isapproved === false ? 0.5 : 1,
                          cursor: comic.isapproved === false ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Reject
                      </ActionButton>
                    </>
                  )}
                  {comic.isAdminUpload && (
                    <StatusBadge $status="info">Admin Upload</StatusBadge>
                  )}
                </td>
              </ComicsTableRow>
            ))}
          </tbody>
        </ComicsTable>
      )}

      {showUploadForm && (
        <AdminUploadForm
          onClose={() => setShowUploadForm(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </>
  );
};

export default ComicsPage;
