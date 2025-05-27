import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import {
  ExploreContainer,
  ExploreContent,
  ToggleContainer,
  ToggleButton,
  ComicsGrid,
  ComicCard,
  ComicImage,
  ComicInfo,
  ComicTitle,
  ComicGenre,
  ComicStatus,
  ReadMoreButton
} from './ExploreStyles';

const Explore = () => {
  const [comics, setComics] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/get/comics/approved')
      .then(response => {
        setComics(response.data);
      })
      .catch(error => {
        console.error('Error fetching comics:', error);
      });
  }, []);

  const filterComics = () => {
    switch (activeTab) {
      case 'popular':
        // You can define your own logic for "popular" if available in data
        return comics.filter(comic => comic.popularity === 'high');
      case 'trending':
        // You can define your own logic for "trending" if available in data
        return comics.filter(comic => comic.trending);
      default:
        return comics;
    }
  };

  return (
    <ExploreContainer>
      <Navbar />
      <ExploreContent>
        <ToggleContainer>
          <ToggleButton
            active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          >
            All Comics
          </ToggleButton>
          <ToggleButton
            active={activeTab === 'popular'}
            onClick={() => setActiveTab('popular')}
          >
            Popular Comics
          </ToggleButton>
          <ToggleButton
            active={activeTab === 'trending'}
            onClick={() => setActiveTab('trending')}
          >
            Trending Comics
          </ToggleButton>
        </ToggleContainer>

        <ComicsGrid>
          {filterComics().map(comic => (
            <ComicCard key={comic._id}>
              <ComicImage src={comic.coverImage} alt={comic.title} />
              <ComicInfo>
                <ComicTitle>{comic.title}</ComicTitle>
                <ComicGenre>
                  {Array.isArray(comic.genres) ? comic.genres.join(', ') : comic.genres}
                </ComicGenre>
                <ComicStatus status={comic.status}>{comic.status}</ComicStatus>
                <ReadMoreButton onClick={() => navigate(`/comic/${comic._id}`)}>
                  Read More
                </ReadMoreButton>
              </ComicInfo>
            </ComicCard>
          ))}
        </ComicsGrid>
      </ExploreContent>
    </ExploreContainer>
  );
};

export default Explore;
