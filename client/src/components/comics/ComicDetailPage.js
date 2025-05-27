import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../../components/shared/Navbar';
import { useAuth } from '../../context/AuthContext';


const PageContainer = styled.div`
  margin-top: 80px;
  padding: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const ComicHeader = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CoverImage = styled.div`
  width: 100%;
  height: 400px;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ComicInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;
  color: ${props => props.theme.colors.text}99;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};

  &:hover {
    background-color: #008c9e;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  
  ${props => props.downloaded && `
    background-color: #2ecc71;
    &:hover {
      background-color: #27ae60;
    }
  `}

  ${props => props.favorited && `
    background-color: #e74c3c;
    &:hover {
      background-color: #c0392b;
    }
  `}

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Summary = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin: 2rem 0;
`;

const ChapterList = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const ChapterTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Chapter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.background};
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary}22;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Star = styled.span`
  color: ${props => props.active ? '#ffd700' : props.theme.colors.text}66;
  cursor: pointer;
  font-size: 1.5rem;
`;

const Comments = styled.div`
  margin: 2rem 0;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.secondary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ProgressOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ProgressCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background-color: ${props => props.theme.colors.primary};
  transition: width 0.3s ease;
`;

const Toast = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 1rem 2rem;
  border-radius: 8px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const CommentSection = styled.div`
  margin: 2rem 0;
`;

const CommentList = styled.div`
  margin-top: 1rem;
`;

const CommentCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CommentUser = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const CommentContent = styled.div`
  color: ${props => props.theme.colors.text};
  margin: 0.5rem 0;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const CommentButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text}99;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }

  ${props => props.active && `
    color: ${props.theme.colors.primary};
  `}
`;

const ReplySection = styled.div`
  margin-left: 2rem;
  margin-top: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid ${props => props.theme.colors.secondary};
`;

const ReplyInput = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.secondary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  resize: vertical;
  min-height: 60px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
`;

const ComicDetailPage = () => {
  const { id: comicId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);

  // Fetch comic data with axios
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/get/comics/${comicId}`)
      .then(res => {
        // Adapt to new API response structure
        const data = res.data;
        setComic({
          ...data,
          cover: data.coverImage,
          chapters: Array.isArray(data.chapters)
            ? data.chapters.map((url, idx) => ({
              number: idx + 1,
              title: `Chapter ${idx + 1}`,
              url,
              date: data.uploadedAt ? new Date(data.uploadedAt).toLocaleDateString() : '',
            }))
            : [],
          readers: data.readers || 0, // fallback if not present
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [comicId]);

  // Check initial states from localStorage when component mounts
  useEffect(() => {
    const downloads = JSON.parse(localStorage.getItem('downloads') || '[]');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    setIsDownloaded(downloads.some(d => d.id === comicId));
    setIsFavorite(favorites.some(f => f.id === comicId));
  }, [comicId]);


  // Fetch comments
  const fetchComments = async (pageNum = 1) => {
    try {
      setLoadingComments(true);
      const response = await axios.get(`http://localhost:5000/api/comments/comic/${comicId}?page=${pageNum}`);
      
      if (pageNum === 1) {
        setComments(response.data);
      } else {
        setComments(prev => [...prev, ...response.data]);
      }
      
      setHasMore(response.data.length === 10);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching comments:', error);
      showToastMessage('Error loading comments');
    } finally {
      setLoadingComments(false);
    }
  };

  // Load more comments
  const loadMoreComments = () => {
    if (!loadingComments && hasMore) {
      fetchComments(page + 1);
    }
  };

  // Submit new comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user?._id) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/comments/comic/${comicId}`,
        { 
          content: newComment,
          userId: user._id
        }
      );

      setComments(prev => [response.data, ...prev]);
      setNewComment('');
      showToastMessage('Comment posted successfully');
    } catch (error) {
      console.error('Error posting comment:', error);
      showToastMessage('Error posting comment');
    }
  };

  // Submit reply
  const handleSubmitReply = async (parentCommentId) => {
    if (!replyContent.trim() || !user?._id) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/comments/comic/${comicId}`,
        { 
          content: replyContent, 
          parentCommentId,
          userId: user._id
        }
      );

      // Update the parent comment's replies
      setComments(prev => prev.map(comment => {
        if (comment._id === parentCommentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), response.data]
          };
        }
        return comment;
      }));

      setReplyContent('');
      setReplyTo(null);
      showToastMessage('Reply posted successfully');
    } catch (error) {
      console.error('Error posting reply:', error);
      showToastMessage('Error posting reply');
    }
  };

  // Toggle like
  const handleToggleLike = async (commentId) => {
    if (!user?._id) {
      showToastMessage('Please login to like comments');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/comments/${commentId}/like`,
        { userId: user._id }
      );

      // Update the comment's likes in the state
      setComments(prev => prev.map(comment => {
        if (comment._id === commentId) {
          // If this is the comment being liked/unliked
          const updatedComment = { ...comment };
          const hasLiked = hasUserLiked(comment.likes, user._id);
          
          // Update likes array
          if (hasLiked) {
            // Remove like
            updatedComment.likes = (comment.likes || []).filter(
              likeId => likeId.toString() !== user._id.toString()
            );
          } else {
            // Add like
            updatedComment.likes = [...(comment.likes || []), user._id];
          }
          
          return updatedComment;
        } else if (comment.replies) {
          // Check replies for the comment being liked/unliked
          const updatedComment = { ...comment };
          updatedComment.replies = comment.replies.map(reply => {
            if (reply._id === commentId) {
              const updatedReply = { ...reply };
              const hasLiked = hasUserLiked(reply.likes, user._id);
              
              // Update likes array for reply
              if (hasLiked) {
                updatedReply.likes = (reply.likes || []).filter(
                  likeId => likeId.toString() !== user._id.toString()
                );
              } else {
                updatedReply.likes = [...(reply.likes || []), user._id];
              }
              
              return updatedReply;
            }
            return reply;
          });
          return updatedComment;
        }
        return comment;
      }));

      showToastMessage(response.data.message);
    } catch (error) {
      console.error('Error toggling like:', error);
      showToastMessage('Error updating like');
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!user?._id) return;
    
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/comments/${commentId}`,
        { 
          data: { userId: user._id }
        }
      );

      // Refresh comments after successful deletion
      await fetchComments(1); // Reset to first page and refresh all comments
      showToastMessage('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
      showToastMessage('Error deleting comment');
    }
  };

  // Load comments when component mounts
  useEffect(() => {
    if (comicId) {
      fetchComments();
    }
  }, [comicId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <PageContainer>
          <h2>Loading...</h2>
        </PageContainer>
      </>
    );
  }

  if (!comic) {
    return (
      <>
        <Navbar />
        <PageContainer>
          <h2>Comic not found.</h2>
        </PageContainer>
      </>
    );
  }

  const handleRating = (value) => {
    setRating(value);
    // TODO: Implement rating submission
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const simulateDownload = () => {
    if (isDownloaded) return; // Prevent re-downloading

    setIsDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setIsDownloaded(true); // Set downloaded state to true

          // Add to downloads in localStorage
          const downloads = JSON.parse(localStorage.getItem('downloads') || '[]');
          const newDownload = {
            id: comicId,
            title: comic.title,
            cover: comic.cover,
            downloadDate: new Date().toISOString(),
            chapters: comic.chapters.map(ch => ({
              number: ch.number,
              url: ch.url,
            })),
          };

          if (!downloads.some(d => d.id === comicId)) {
            downloads.push(newDownload);
            localStorage.setItem('downloads', JSON.stringify(downloads));
            console.log('Download added to localStorage:', newDownload);
          }

          showToastMessage('Download completed! Added to your downloads.');

          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    // Update favorites in localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (newFavoriteStatus) {
      if (!favorites.some(f => f.id === comicId)) {
        favorites.push({
          id: comicId,
          title: comic.title,
          cover: comic.cover,
          addedDate: new Date().toISOString()
        });
        showToastMessage('Added to favorites!');
      }
    } else {
      const index = favorites.findIndex(f => f.id === comicId);
      if (index !== -1) {
        favorites.splice(index, 1);
        showToastMessage('Removed from favorites!');
      }
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Download clicked');
  };

  const startReading = () => {
    // Always starts from chapter 1
    navigate(`/comic/${comicId}/chapter/1`);
  };

  const navigateToChapter = (chapterNumber) => {
    navigate(`/comic/${comicId}/chapter/${chapterNumber}`);
  };

  // Helper function to safely check if a user has liked a comment
  const hasUserLiked = (likes, userId) => {
    if (!likes || !Array.isArray(likes) || !userId) return false;
    return likes.some(likeId => likeId.toString() === userId.toString());
  };

  // Helper function to get like count
  const getLikeCount = (likes) => {
    if (!likes || !Array.isArray(likes)) return 0;
    return likes.length;
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <ComicHeader>
          <CoverImage>
            <img src={comic.cover} alt={comic.title} />
          </CoverImage>

          <ComicInfo>
            <Title>{comic.title}</Title>

            <Stats>
              {/* Readers fallback if not present */}
              <span>📖 Read by {comic.readers} users</span>
              <span>Author: {comic.author}</span>
              <span>Status: {comic.status}</span>
              <span>Genres: {comic.genres && comic.genres.join(', ')}</span>
            </Stats>

            <Rating>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  active={star <= rating}
                  onClick={() => handleRating(star)}
                >
                  ★
                </Star>
              ))}
            </Rating>

            <ActionButtons>
              <PrimaryButton onClick={startReading}>
                Start Reading
              </PrimaryButton>
              <SecondaryButton
                onClick={simulateDownload}
                disabled={isDownloading}
                downloaded={isDownloaded}
              >
                {isDownloading ? (
                  <>
                    <span>Downloading...</span>
                  </>
                ) : isDownloaded ? (
                  <>
                    <span>✓</span>
                    <span>Downloaded</span>
                  </>
                ) : (
                  <>
                    <span>↓</span>
                    <span>Download</span>
                  </>
                )}
              </SecondaryButton>
              <SecondaryButton
                onClick={toggleFavorite}
                favorited={isFavorite}
              >
                {isFavorite ? (
                  <>
                    <span>❤️</span>
                    <span>Favorited</span>
                  </>
                ) : (
                  <>
                    <span>🤍</span>
                    <span>Favorite</span>
                  </>
                )}
              </SecondaryButton>
            </ActionButtons>

            <Summary>{comic.summary}</Summary>
          </ComicInfo>
        </ComicHeader>

        <ChapterList>
          <ChapterTitle>Chapters</ChapterTitle>
          {comic.chapters.length === 0 && <div>No chapters available.</div>}
          {comic.chapters.map((chapter) => (
            <Chapter
              key={chapter.number}
              onClick={() => navigateToChapter(chapter.number)}
            >
              <div>
                <span>Chapter {chapter.number}</span>
                <span>: {chapter.title}</span>
              </div>
              <span>{chapter.date}</span>
            </Chapter>
          ))}
        </ChapterList>

        <CommentSection>
          <ChapterTitle>Comments</ChapterTitle>
          
          {user ? (
            <CommentForm onSubmit={handleSubmitComment}>
              <CommentInput
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
              />
              <PrimaryButton type="submit">Post Comment</PrimaryButton>
            </CommentForm>
          ) : (
            <div style={{ marginBottom: '1rem', color: '#888' }}>
              Please <a href="/login" style={{ color: '#00bcd4' }}>login</a> to comment
            </div>
          )}

          <CommentList>
            {comments.map(comment => (
              <CommentCard key={comment._id}>
                <CommentHeader>
                  <CommentUser>
                    <UserAvatar
                      src={comment.user.profileImage || 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'}
                      alt={comment.user.username}
                    />
                    <span>{comment.user.username}</span>
                  </CommentUser>
                  <span style={{ color: '#888', fontSize: '0.9rem' }}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </CommentHeader>

                <CommentContent>{comment.content}</CommentContent>

                <CommentActions>
                  <CommentButton
                    onClick={() => handleToggleLike(comment._id)}
                    active={hasUserLiked(comment.likes, user?._id)}
                  >
                    {getLikeCount(comment.likes)} {hasUserLiked(comment.likes, user?._id) ? '❤️' : '🤍'}
                  </CommentButton>
                  <CommentButton onClick={() => setReplyTo(comment._id)}>
                    Reply
                  </CommentButton>
                  {user?._id === comment.user._id && (
                    <CommentButton onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                    </CommentButton>
                  )}
                </CommentActions>

                {replyTo === comment._id && (
                  <ReplySection>
                    <ReplyInput
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <PrimaryButton onClick={() => handleSubmitReply(comment._id)}>
                        Post Reply
                      </PrimaryButton>
                      <SecondaryButton onClick={() => {
                        setReplyTo(null);
                        setReplyContent('');
                      }}>
                        Cancel
                      </SecondaryButton>
                    </div>
                  </ReplySection>
                )}

                {comment.replies?.length > 0 && (
                  <ReplySection>
                    {comment.replies.map(reply => (
                      <CommentCard key={reply._id} style={{ marginBottom: '0.5rem' }}>
                        <CommentHeader>
                          <CommentUser>
                            <UserAvatar
                              src={reply.user.profileImage || 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'}
                              alt={reply.user.username}
                            />
                            <span>{reply.user.username}</span>
                          </CommentUser>
                          <span style={{ color: '#888', fontSize: '0.9rem' }}>
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </CommentHeader>
                        <CommentContent>{reply.content}</CommentContent>
                        <CommentActions>
                          <CommentButton
                            onClick={() => handleToggleLike(reply._id)}
                            active={hasUserLiked(reply.likes, user?._id)}
                          >
                            {getLikeCount(reply.likes)} {hasUserLiked(reply.likes, user?._id) ? '❤️' : '🤍'}
                          </CommentButton>
                          {user?._id === reply.user._id && (
                            <CommentButton onClick={() => handleDeleteComment(reply._id)}>
                              Delete
                            </CommentButton>
                          )}
                        </CommentActions>
                      </CommentCard>
                    ))}
                  </ReplySection>
                )}
              </CommentCard>
            ))}

            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <SecondaryButton onClick={loadMoreComments} disabled={loadingComments}>
                  {loadingComments ? 'Loading...' : 'Load More Comments'}
                </SecondaryButton>
              </div>
            )}
          </CommentList>
        </CommentSection>
      </PageContainer>

      {/* Download Progress Overlay */}
      <ProgressOverlay show={isDownloading}>
        <ProgressCard>
          <h3>Downloading {comic.title}</h3>
          <ProgressBar>
            <Progress value={downloadProgress} />
          </ProgressBar>
          <p>{downloadProgress}%</p>
        </ProgressCard>
      </ProgressOverlay>

      {/* Toast Notification */}
      {showToast && (
        <Toast>
          {toastMessage}
        </Toast>
      )}
    </>
  );
};

export default ComicDetailPage;
