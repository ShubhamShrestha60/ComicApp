import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './GlobalStyles';
import styled from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './components/landing/LandingPage';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import UsersPage from './components/admin/UsersPage';
import Explore from './components/explore/Explore';
import Genres from './components/genres/Genres';
import GenrePage from './components/genres/GenrePage';
import UploadPage from './components/upload/UploadPage';
import ProfilePage from './components/user/ProfilePage';
import FavoritesPage from './components/user/FavoritesPage';
import DownloadsPage from './components/user/DownloadsPage';
import SettingsPage from './components/user/SettingsPage';
import ComicDetailPage from './components/comics/ComicDetailPage';
import ChapterPage from './components/chapters/ChapterPage';
import ComicsPage from './components/admin/ComicsPage';
import ReviewsPage from './components/admin/ReviewsPage';
import GenresPage from './components/admin/GenresPage';
import { ColorBlindProvider, useColorBlind } from './ColorBlindContext';

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  ${props => !props.isAdmin && `
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  `}
`;

function AppContent() {
  const { theme } = useColorBlind();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="comics" element={<ComicsPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="genres" element={<GenresPage />} />
            </Route>
            
            {/* User routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genres/:genre" element={<GenrePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/comic/:id" element={<ComicDetailPage />} />
            <Route path="/comic/:comicId/chapter/:chapterNumber" element={<ChapterPage />} />
            <Route path="/comics/:comicId/chapters/:chapterId" element={<ChapterPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ColorBlindProvider>
      <AppContent />
    </ColorBlindProvider>
  );
}

export default App;
