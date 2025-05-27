import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import NotificationModal from '../NotificationModal';
import {
  DashboardContainer,
  Header,
  LeftSection,
  CenterSection,
  RightSection,
  Logo,
  NavLink,
  SearchBar,
  UploadButton,
  UserDropdown,
  UserAvatar,
  DropdownContent,
  DropdownItem,
  MainContent,
  ComicsGrid,
  ComicCard,
  ComicImage,
  ComicInfo,
  ComicTitle,
  Footer,
  FooterContent,
  FooterSection,
  SocialLinks,
  ProfileSection,
  ProfileImage,
  ProfileInfo,
  Username,
  Email,
  StatsSection,
  StatCard,
  StatValue,
  StatLabel,
  ActionButtons,
  Button,
  UploadSection,
  RecentUploads,
  UploadCard,
  UploadImage,
  UploadInfo,
  UploadTitle,
  UploadDate
} from './DashboardStyles';
import axios from 'axios';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, updateProfileImage } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  const fetchApprovedComics = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/get/comics/approved');
      setComics(res.data);
    } catch (error) {
      console.error('Failed to fetch approved comics:', error);
      setComics([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setIsLoadingNotifications(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/notifications/unread/count', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUnreadCount(response.data.count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/notifications/${notificationId}/read`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Update local state
      setNotifications(prevNotifications =>
        prevNotifications.map(notif =>
          notif._id === notificationId ? { ...notif, read: true } : notif
        )
      );
      // Update unread count
      fetchUnreadCount();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch('http://localhost:5000/api/notifications/read-all', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Update local state
      setNotifications(prevNotifications =>
        prevNotifications.map(notif => ({ ...notif, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/notifications/${notificationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Update local state
      setNotifications(prevNotifications =>
        prevNotifications.filter(notif => notif._id !== notificationId)
      );
      // Update unread count if the deleted notification was unread
      const deletedNotif = notifications.find(n => n._id === notificationId);
      if (deletedNotif && !deletedNotif.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Delete all notifications
  const deleteAllNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error deleting all notifications:', error);
    }
  };

  useEffect(() => {
    fetchApprovedComics();
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  const handleLogout = () => {
    // In a real app, you would clear the auth token and user data
    navigate('/');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImageUpload = async () => {
    if (selectedFile) {
      try {
        await updateProfileImage(selectedFile);
        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // Dummy data for recent uploads
  const recentUploads = [
    {
      id: 1,
      title: 'Chapter 1: The Beginning',
      image: 'https://via.placeholder.com/150',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'Chapter 2: The Journey',
      image: 'https://via.placeholder.com/150',
      date: '2024-03-14'
    }
  ];

  const filteredComics = comics.filter(comic =>
    comic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comic.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNotificationsClick = () => {
    fetchNotifications(); // Refresh notifications when opening modal
    setIsNotificationModalOpen(true);
  };

  return (
    <DashboardContainer>
      <Header>
        <LeftSection>
          <Logo as={Link} to="/user/dashboard">ComicZone</Logo>
          <NavLink as={Link} to="/explore">Explore</NavLink>
          <NavLink as={Link} to="/genres">Genres</NavLink>
        </LeftSection>

        <CenterSection>
          <SearchBar
            type="text"
            placeholder="Search comics..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </CenterSection>

        <RightSection>
          <div 
            onClick={handleNotificationsClick}
            style={{ 
              cursor: 'pointer',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
              position: 'relative',
              ':hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)'
              }
            }}
          >
            Notifications {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: '#ff4444',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.8rem',
                minWidth: '20px',
                textAlign: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </div>
          <UploadButton onClick={() => navigate('/upload')}>Upload</UploadButton>
          <UserDropdown>
            <UserAvatar onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {user?.username ? user.username.charAt(0).toUpperCase() : '?'}
            </UserAvatar>
            <DropdownContent isOpen={isDropdownOpen}>
              <DropdownItem as={Link} to="/profile">Profile</DropdownItem>
              <DropdownItem as={Link} to="/favorites">Favorites</DropdownItem>
              <DropdownItem as={Link} to="/downloads">Downloads</DropdownItem>
              <DropdownItem as={Link} to="/settings">Settings</DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownContent>
          </UserDropdown>
        </RightSection>
      </Header>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        title="Notifications"
        message={
          isLoadingNotifications ? (
            <div style={{ textAlign: 'center', padding: '1rem' }}>Loading notifications...</div>
          ) : notifications.length > 0 ? (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '1rem',
                padding: '0.5rem',
                borderBottom: '1px solid #eee'
              }}>
                <button 
                  onClick={markAllAsRead}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Mark All as Read
                </button>
                <button 
                  onClick={deleteAllNotifications}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Clear All
                </button>
              </div>
              {notifications.map(notification => (
                <div 
                  key={notification._id} 
                  style={{ 
                    marginBottom: '1rem', 
                    padding: '1rem',
                    borderBottom: '1px solid #eee',
                    backgroundColor: notification.read ? 'transparent' : '#f8f9fa'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ margin: '0 0 0.5rem 0' }}>{notification.message}</p>
                      <small style={{ color: '#666' }}>
                        {new Date(notification.createdAt).toLocaleString()}
                      </small>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification._id)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem' }}>No notifications</div>
          )
        }
        primaryButtonText="Close"
        onPrimaryButtonClick={() => setIsNotificationModalOpen(false)}
      />

      <MainContent>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading comics...</div>
        ) : filteredComics.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            {searchQuery ? 'No comics found matching your search.' : 'No approved comics available yet.'}
          </div>
        ) : (
          <ComicsGrid>
            {filteredComics.map(comic => (
              <ComicCard key={comic._id} onClick={() => navigate(`/comic/${comic._id}`)}>
                <ComicImage
                  src={comic.coverImage || 'https://via.placeholder.com/200x250'}
                  alt={comic.title}
                />
                <ComicInfo>
                  <ComicTitle>{comic.title}</ComicTitle>
                  {comic.author && <div style={{ color: '#888', fontSize: '0.9rem' }}>by {comic.author}</div>}
                </ComicInfo>
              </ComicCard>
            ))}
          </ComicsGrid>
        )}
      </MainContent>

      <Footer>
        <FooterContent>
          <FooterSection>
            <h3>About ComicZone</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Help</h3>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Community</h3>
            <ul>
              <li><a href="#">Forums</a></li>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Connect With Us</h3>
            <SocialLinks>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Discord">💬</a>
            </SocialLinks>
          </FooterSection>
        </FooterContent>
      </Footer>
    </DashboardContainer>
  );
};

export default UserDashboard; 