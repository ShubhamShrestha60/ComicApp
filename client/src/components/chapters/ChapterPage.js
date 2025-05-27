import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/shared/Navbar';

const PageContainer = styled.div`
  margin-top: 80px;
  min-height: calc(100vh - 80px);
  background-color: ${props => props.theme.colors.background};
`;

const ReaderHeader = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 1rem 2rem;
  position: sticky;
  top: 80px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChapterInfo = styled.div`
  text-align: center;
  flex-grow: 1;
`;

const ComicTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
`;

const ChapterTitle = styled.h2`
  color: ${props => props.theme.colors.text}99;
  font-size: 1rem;
`;

const ReaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const NavigationBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.secondary};
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  z-index: 10;
`;

const NavButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #008c9e;
  }
`;

const PDFFrame = styled.iframe`
  width: 100%;
  max-width: 800px;
  height: 80vh;
  margin: 1rem auto;
  display: block;
  border-radius: 8px;
  border: none;
  background: #fff;
`;

const ChapterPage = () => {
  const { comicId, chapterNumber } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [comic, setComic] = useState(null);

  // Use index as chapter number (assume chapterNumber is 1-based in URL)
  const chapterIdx = parseInt(chapterNumber, 10) - 1;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/get/comics/${comicId}`);
        const data = await res.json();
        setComic(data);
      } catch (err) {
        setComic(null);
      }
      setLoading(false);
    };

    fetchData();
  }, [comicId, chapterNumber]);

  if (loading || !comic || !comic.chapters || !comic.chapters[chapterIdx]) {
    return <div>Loading...</div>;
  }

  const hasNextChapter = chapterIdx < comic.chapters.length - 1;
  const hasPrevChapter = chapterIdx > 0;

  const navigateToChapter = (direction) => {
    const newIndex = chapterIdx + (direction === 'next' ? 1 : -1);
    navigate(`/comic/${comicId}/chapter/${newIndex + 1}`);
  };

  const returnToComicDetail = () => {
    navigate(`/comic/${comicId}`);
  };

  const pdfUrl = comic.chapters[chapterIdx];

  return (
    <>
      <Navbar />
      <PageContainer>
        <ReaderHeader>
          <NavButton onClick={returnToComicDetail}>
            ← Back to Comic
          </NavButton>
          <ChapterInfo>
            <ComicTitle>{comic.title}</ComicTitle>
            <ChapterTitle>
              Chapter {chapterIdx + 1}
            </ChapterTitle>
          </ChapterInfo>
          <div style={{ width: '100px' }}></div>
        </ReaderHeader>

        <ReaderContent>
          {pdfUrl ? (
            <PDFFrame src={pdfUrl} title={`Chapter ${chapterIdx + 1} PDF`} />
          ) : (
            <div>No PDF available for this chapter.</div>
          )}
        </ReaderContent>

        <NavigationBar>
          <NavButton
            onClick={() => navigateToChapter('prev')}
            disabled={!hasPrevChapter}
          >
            ← Previous Chapter
          </NavButton>

          <NavButton onClick={returnToComicDetail}>
            Chapter List
          </NavButton>

          <NavButton
            onClick={() => navigateToChapter('next')}
            disabled={!hasNextChapter}
          >
            Next Chapter →
          </NavButton>
        </NavigationBar>
      </PageContainer>
    </>
  );
};

export default ChapterPage;
