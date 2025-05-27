import React, { useEffect, useState } from 'react';
import {
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  RecentComicsSection,
  ComicsTable,
  TableHeader,
  TableRow,
  StatusBadge,
  PageTitle,
  Subtitle
} from './AdminStyles';
import api from '../../services/api';

const AdminDashboard = () => {
  const [comics, setComics] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        // Set empty array if API call fails
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);
  const stats = {
    users: {
      total: users.length,
      newThisMonth: users.length
    },
    comics: {
      total: comics.length,
      newThisMonth: comics.length
    },
    pendingReviews: {
      total: 57,
      message: 'Needs your attention'
    },
    popularGenre: {
      name: comics.length > 0 ? comics[0].genres[0] : 'N/A',
      message: 'Based on user engagement'
    }
  };

  const fetchComics = async () => {
    try {

      const res = await api.get('/admin/comics');
      setComics(res.data);
    } catch (error) {
      console.error('Failed to fetch comics:', error);
      setComics([]);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);



  const recentComics = comics.map(comic => ({
    title: comic.title,
    author: comic.author,
    status: comic.status
  }));

  return (
    <>
      <PageTitle>Admin Dashboard</PageTitle>
      <Subtitle>Welcome to your Comic Control Panel</Subtitle>

      <StatsGrid>
        <StatCard>
          <div className="icon user">👥</div>
          <div>
            <StatLabel>Total Users</StatLabel>
            <StatNumber>{stats.users.total}</StatNumber>
            <div className="subtitle">+{stats.users.newThisMonth} new users this month</div>
          </div>
        </StatCard>

        <StatCard>
          <div className="icon comic">📚</div>
          <div>
            <StatLabel>Total Comics</StatLabel>
            <StatNumber>{stats.comics.total}</StatNumber>
            <div className="subtitle">+{stats.comics.newThisMonth} new comics this month</div>
          </div>
        </StatCard>

        <StatCard>
          <div className="icon review">⭐</div>
          <div>
            <StatLabel>Pending Reviews</StatLabel>
            <StatNumber>{stats.pendingReviews.total}</StatNumber>
            <div className="subtitle">{stats.pendingReviews.message}</div>
          </div>
        </StatCard>

        <StatCard>
          <div className="icon genre">📊</div>
          <div>
            <StatLabel>Popular Genre</StatLabel>
            <StatNumber>{stats.popularGenre.name}</StatNumber>
            <div className="subtitle">{stats.popularGenre.message}</div>
          </div>
        </StatCard>
      </StatsGrid>

      <RecentComicsSection>
        <h2>Recent Comics</h2>
        <ComicsTable>
          <thead>
            <TableHeader>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
            </TableHeader>
          </thead>
          <tbody>
            {recentComics.map((comic, index) => (
              <TableRow key={index}>
                <td>{comic.title}</td>
                <td>{comic.author}</td>
                <td>
                  <StatusBadge status={comic.status}>
                    {comic.status}
                  </StatusBadge>
                </td>
              </TableRow>
            ))}
          </tbody>
        </ComicsTable>
      </RecentComicsSection>
    </>
  );
};

export default AdminDashboard; 