import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import {
  GenresContainer,
  GenresContent,
  ComicsGrid,
  ComicCard,
  ComicImage,
  ComicInfo,
  ComicTitle,
  ComicStatus,
  ReadMoreButton,
} from './GenresStyles';
import styled from 'styled-components';

const GenrePageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const GenreTitle = styled.h1`
  font-size: 2.5rem;
  color: #00bcd4;
  font-weight: 600;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #00bcd4;
  background-color: transparent;
  color: #00bcd4;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: #00bcd4;
    color: #ffffff;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid ${props => props.active ? '#00bcd4' : '#4a4a4a'};
  background-color: ${props => props.active ? '#00bcd4' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#b0b0b0'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00bcd4;
    color: ${props => props.active ? '#ffffff' : '#00bcd4'};
  }
`;

const GenrePage = () => {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [comics, setComics] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:5000/api/get/comics/approved')
      .then(response => {
        setComics(response.data);
      })
      .catch(error => {
        console.error('Error fetching comics:', error);
      });
  }, []);

  const formattedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);

  // Filter comics by genre and then by status
  const filteredComics = useMemo(() => {
    const genreFiltered = comics.filter(comic =>
      comic.genres.map(g => g.toLowerCase()).includes(genre.toLowerCase())
    );
    if (filter === 'all') return genreFiltered;
    return genreFiltered.filter(comic =>
      filter === 'ongoing' ? comic.status === 'Ongoing' : comic.status === 'Completed'
    );
  }, [comics, genre, filter]);

  return (
    <GenresContainer>
      <Navbar />
      <GenresContent>
        <GenrePageHeader>
          <GenreTitle>{formattedGenre} Comics</GenreTitle>
          <BackButton onClick={() => navigate('/genres')}>
            Back to Genres
          </BackButton>
        </GenrePageHeader>

        <FilterSection>
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton
            active={filter === 'ongoing'}
            onClick={() => setFilter('ongoing')}
          >
            Ongoing
          </FilterButton>
          <FilterButton
            active={filter === 'completed'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </FilterButton>
        </FilterSection>

        <ComicsGrid>
          {filteredComics.map(comic => (
            <ComicCard key={comic._id}>
              <ComicImage src={comic.coverImage} alt={comic.title} />
              <ComicInfo>
                <ComicTitle>{comic.title}</ComicTitle>
                <ComicStatus status={comic.status}>{comic.status}</ComicStatus>
                <ReadMoreButton onClick={() => navigate(`/comic/${comic._id}`)}>
                  Read More
                </ReadMoreButton>
              </ComicInfo>
            </ComicCard>
          ))}
        </ComicsGrid>
      </GenresContent>
    </GenresContainer>
  );
};

export default GenrePage;
