import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../shared/Navbar';
import {
  GenresContainer,
  GenresContent,
  GenreNavigation,
  GenreButton,
  GenreSection,
  GenreHeader,
  GenreTitle,
  ViewAllButton,
  ComicsGrid,
  ComicCard,
  ComicImage,
  ComicInfo,
  ComicTitle,
  ComicStatus,
  ReadMoreButton
} from './GenresStyles';

const GENRES = [
  'Action',
  'Thriller',
  'Romance',
  'Fantasy',
  'Mystery',
  'Horror',
  'Sci-Fi',
  'Slice of Life',
  'Comedy',
  'Drama',
  'Adventure'
];

const Genres = () => {
  const navigate = useNavigate();
  const [activeGenre, setActiveGenre] = useState(GENRES[0]);
  const [comics, setComics] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/get/comics/approved')
      .then(response => {
        setComics(response.data);
      })
      .catch(error => {
        console.error('Error fetching comics:', error);
      });
  }, []);

  // Group comics by genre
  const comicsByGenre = GENRES.reduce((acc, genre) => {
    acc[genre] = comics.filter(comic => comic.genres && comic.genres.includes(genre));
    return acc;
  }, {});

  const handleViewAll = () => {
    setViewAll(true);
  };

  const handleTabClick = (genre) => {
    setActiveGenre(genre);
    setViewAll(false);
  };

  return (
    <GenresContainer>
      <Navbar />
      <GenresContent>
        <GenreNavigation>
          {GENRES.map(genre => (
            <GenreButton
              key={genre}
              active={activeGenre === genre && !viewAll}
              onClick={() => handleTabClick(genre)}
            >
              {genre}
            </GenreButton>
          ))}
        </GenreNavigation>

        {viewAll ? (
          <GenreSection key="all-comics">
            <GenreHeader>
              <GenreTitle>All Comics</GenreTitle>
              <ViewAllButton onClick={() => setViewAll(false)}>
                Back
              </ViewAllButton>
            </GenreHeader>
            <ComicsGrid>
              {comics.map(comic => (
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
          </GenreSection>
        ) : (
          <GenreSection key={activeGenre}>
            <GenreHeader>
              <GenreTitle>{activeGenre}</GenreTitle>
              <ViewAllButton onClick={handleViewAll}>
                View All
              </ViewAllButton>
            </GenreHeader>
            <ComicsGrid>
              {(comicsByGenre[activeGenre] || []).slice(0, 6).map(comic => (
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
          </GenreSection>
        )}
      </GenresContent>
    </GenresContainer>
  );
};

export default Genres;
