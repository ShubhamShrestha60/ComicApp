import styled from 'styled-components';

export const GenresContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 60px;
`;

export const GenresContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const GenreSection = styled.section`
  margin-bottom: 3rem;
`;

export const GenreHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const GenreTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

export const ViewAllButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
  }
`;

export const ComicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ComicCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const ComicImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export const ComicInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ComicTitle = styled.h3`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
  font-weight: 500;
`;

export const ComicStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  width: fit-content;
  background-color: ${props => props.status === 'Ongoing' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)'};
  color: ${props => props.status === 'Ongoing' ? '#4ade80' : '#f87171'};
`;

export const ReadMoreButton = styled.button`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
  }
`;

export const GenreNavigation = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
`;

export const GenreButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.text : props.theme.colors.text + '99'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.primary + '22'};
    color: ${props => props.theme.colors.text};
  }
`; 