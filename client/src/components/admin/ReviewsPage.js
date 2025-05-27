import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import {
  PageHeader,
  PageTitle,
  Subtitle,
  SearchInput,
  UsersTable as ReviewsTable,
  UsersTableHeader as ReviewsTableHeader,
  UsersTableRow as ReviewsTableRow,
  ActionButton,
  PaginationContainer,
  PaginationButton
} from './AdminStyles';
import styled from 'styled-components';

const CommentContent = styled.div`
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .email {
    font-size: 0.8em;
    color: #666;
  }
`;

const ReviewsPage = () => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0);

  const API_URL = 'http://localhost:5000';

  const fetchComments = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/comments/all?page=${page}&search=${search}`);
      const { comments, totalPages, currentPage, totalComments } = response.data;
      
      setComments(comments);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
      setTotalComments(totalComments);
    } catch (error) {
      toast.error('Error fetching comments: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`${API_URL}/api/comments/admin/${commentId}`);
        toast.success('Comment deleted successfully');
        fetchComments(currentPage, searchQuery);
      } catch (error) {
        toast.error('Error deleting comment: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Comments</PageTitle>
          <Subtitle>Manage user comments ({totalComments} total)</Subtitle>
        </div>
        <SearchInput
          type="text"
          placeholder="Search comments..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </PageHeader>

      <ReviewsTable>
        <thead>
          <ReviewsTableHeader>
            <th>USER</th>
            <th>COMIC</th>
            <th>COMMENT</th>
            <th>DATE</th>
            <th>TYPE</th>
            <th>ACTIONS</th>
          </ReviewsTableHeader>
        </thead>
        <tbody>
          {comments.map(comment => (
            <ReviewsTableRow key={comment._id}>
              <td>
                <UserInfo>
                  <img 
                    src={comment.user?.profileImage || 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='} 
                    alt={comment.user?.username} 
                    className="avatar"
                  />
                  <div>
                    <div>{comment.user?.username || 'Unknown User'}</div>
                  </div>
                </UserInfo>
              </td>
              <td>{comment.comic?.title || 'Unknown Comic'}</td>
              <td>
                <CommentContent title={comment.content}>
                  {comment.content}
                </CommentContent>
              </td>
              <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
              <td>{comment.parentComment ? 'Reply' : 'Comment'}</td>
              <td>
                <ActionButton danger onClick={() => handleDeleteComment(comment._id)}>
                  Delete
                </ActionButton>
              </td>
            </ReviewsTableRow>
          ))}
        </tbody>
      </ReviewsTable>

      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PaginationButton>
          <span>Page {currentPage} of {totalPages}</span>
          <PaginationButton 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PaginationButton>
        </PaginationContainer>
      )}
    </>
  );
};

export default ReviewsPage; 