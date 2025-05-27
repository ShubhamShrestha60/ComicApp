import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import styled from 'styled-components';
import Navbar from '../../components/shared/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  margin-top: 80px;
  padding: 2rem;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
`;

const ProfileCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin: 0 auto 1.5rem auto;
`;

const UserName = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  color: ${props => props.theme.colors.text}99;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const StatsContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
`;

const StatItem = styled.div``;

const StatNumber = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.8rem;
`;

const InfoContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  padding: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.secondary};
  }
`;

const InfoLabel = styled.div`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.9rem;
`;

const InfoValue = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

// --- New styles for My Comics section ---
const ComicsSection = styled.div`
  margin-top: 2rem;
`;

const ComicCard = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const ComicCover = styled.img`
  width: 60px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const ComicInfo = styled.div`
  flex: 1;
`;

const ComicTitle = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

const ComicAuthor = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.text}99;
`;

const AddChapterButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const ChapterList = styled.ul`
  margin: 0.5rem 0 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.85rem;
`;

const ChapterItem = styled.li`
  margin-bottom: 0.25rem;
`;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comics, setComics] = useState([]);
  const [showFileInput, setShowFileInput] = useState({});
  const [uploading, setUploading] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch comics after user is loaded and user._id is available
  useEffect(() => {
    if (user && user._id) {
      axios.get(`http://localhost:5000/api/get/comics/user/${user._id}`)
        .then(response => {
          setComics(response.data);
        })
        .catch(error => {
          console.error('Error fetching comics:', error);
        });
    }
  }, [user]);

  // Handle Add Chapter button click
  const handleAddChapterClick = (comicId) => {
    setShowFileInput(prev => ({ ...prev, [comicId]: true }));
  };

  // Handle file upload
  const handleFileChange = async (e, comicId) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, [comicId]: true }));

    const formData = new FormData();
    formData.append('chapters', file);

    try {

      await axios.post(
        `http://localhost:5000/api/comics/add-chapters/${comicId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'

          }
        }
      );
      // Refresh comics list after upload
      const response = await axios.get(`http://localhost:5000/api/get/comics/user/${user._id}`);
      setComics(response.data);
      setShowFileInput(prev => ({ ...prev, [comicId]: false }));
    } catch (err) {
      alert('Failed to upload chapter');
    } finally {
      setUploading(prev => ({ ...prev, [comicId]: false }));
    }
  };

  if (loading) return <PageContainer>Loading...</PageContainer>;
  if (error) return <PageContainer>Error: {error}</PageContainer>;
  if (!user) return <PageContainer>No user data</PageContainer>;

  return (
    <>
      <Navbar />
      <PageContainer>
        <ProfileCard>
          <Avatar>{user.username ? user.username.charAt(0) : '?'}</Avatar>
          <UserName>{user.username}</UserName>
          <UserEmail>{user.email}</UserEmail>

          <StatsContainer>
            <StatsGrid>
              <StatItem>
                <StatNumber>{comics.length || 0}</StatNumber>
                <StatLabel>Uploads</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{user.stats?.favorites || 0}</StatNumber>
                <StatLabel>Favorites</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{user.stats?.downloads || 0}</StatNumber>
                <StatLabel>Downloads</StatLabel>
              </StatItem>
            </StatsGrid>
          </StatsContainer>

          <InfoContainer>
            <InfoItem>
              <InfoLabel>Username</InfoLabel>
              <InfoValue>{user.username}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{user.email}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Comics Uploaded</InfoLabel>
              <InfoValue>{comics.length}</InfoValue>
            </InfoItem>
          </InfoContainer>

          {/* --- My Comics Section --- */}
          <ComicsSection>
            <h2 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem' }}>My Comics</h2>
            {comics.length === 0 && (
              <div style={{ color: '#ccc', fontSize: '0.95rem' }}>No comics uploaded yet.</div>
            )}
            {comics.map(comic => (
              <ComicCard key={comic._id} onclick={() => navigate(`/comic/${comic._id}`)}
                style={{ cursor: 'pointer' }}>
                <ComicCover src={comic.coverImage} alt={comic.title} onClick={() => {
                  navigate(`/comic/${comic._id}`);
                }} />
                <ComicInfo>
                  <ComicTitle onClick={() => {
                    navigate(`/comic/${comic._id}`);
                  }}>{comic.title}</ComicTitle>
                  <ComicAuthor>by {comic.author}</ComicAuthor>
                  <ChapterList>
                    {comic.chapters && comic.chapters.length > 0 ? (
                      comic.chapters.map((ch, idx) => (
                        <ChapterItem key={ch}>

                          Chapter {idx + 1}

                        </ChapterItem>
                      ))
                    ) : (
                      <ChapterItem>No chapters yet.</ChapterItem>
                    )}
                  </ChapterList>
                  {showFileInput[comic._id] ? (
                    <div>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={e => handleFileChange(e, comic._id)}
                        disabled={uploading[comic._id]}
                      />
                      {uploading[comic._id] && <span style={{ marginLeft: 8 }}>Uploading...</span>}
                    </div>
                  ) : (
                    <AddChapterButton onClick={() => handleAddChapterClick(comic._id)}>
                      Add Chapter
                    </AddChapterButton>
                  )}
                </ComicInfo>
              </ComicCard>
            ))}
          </ComicsSection>
        </ProfileCard>
      </PageContainer>
    </>
  );
};

export default ProfilePage;