import styled from 'styled-components';

export const ExploreContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 60px;
`;

export const ExploreContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const ToggleContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  width: fit-content;
`;

export const ToggleButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.text : props.theme.colors.text + '99'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 1rem;

  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.primary + '22'};
    color: ${props => props.theme.colors.text};
  }
`;

export const ComicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
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
  height: 300px;
  object-fit: cover;
`;

export const ComicInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

export const ComicTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
  font-weight: 600;
`;

export const ComicGenre = styled.span`
  color: ${props => props.theme.colors.primary};
  font-size: 0.9rem;
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