import styled from 'styled-components';

export const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &.active {
    color: ${props => props.theme.colors.primary};

    &:after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${props => props.theme.colors.primary};
      border-radius: 2px;
    }
  }
`;

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 60px;
`;

export const Header = styled.header`
  background-color: ${props => props.theme.colors.secondary};
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 500px;
  margin: 0 2rem;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  margin-right: 2rem;
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const SearchBar = styled.input`
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  width: 100%;
  min-width: 300px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text}99;
  }
`;

export const UploadButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
`;

export const UserDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
`;

export const DropdownContent = styled.div`
  position: absolute;
  right: 0;
  top: 120%;
  background-color: ${props => props.theme.colors.secondary};
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  border-radius: 8px;
  padding: 0.5rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

export const DropdownItem = styled.a`
  color: ${props => props.theme.colors.text};
  padding: 0.75rem 1rem;
  text-decoration: none;
  display: block;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  font-size: 0.95rem;

  &:hover {
    background-color: ${props => props.theme.colors.primary}22;
    color: ${props => props.theme.colors.primary};
  }

  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`;

export const MainContent = styled.main`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 60px - 80px); // viewport height minus header and footer
`;

export const WelcomeSection = styled.section`
  margin-bottom: 2rem;
`;

export const WelcomeMessage = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

export const ComicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 1rem;
  width: 100%;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

export const ComicCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  height: 100%;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const ComicImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
`;

export const ComicInfo = styled.div`
  padding: 1rem;
`;

export const ComicTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

export const ComicStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-size: 0.875rem;
  margin-top: 0.5rem;

  &::before {
    content: '♥';
    color: ${props => props.theme.colors.primary};
  }
`;

export const GenresSection = styled.section`
  margin-bottom: 2rem;
`;

export const Footer = styled.footer`
  background-color: ${props => props.theme.colors.secondary};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.primary};
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        color: ${props => props.theme.colors.text};
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.2s ease;

        &:hover {
          color: ${props => props.theme.colors.primary};
        }
      }
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: ${props => props.theme.colors.text};
    font-size: 1.5rem;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

export const ProfileSection = styled.section`
  background-color: #2a2f35;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #00bcd4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #ffffff;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const Username = styled.h2`
  font-size: 1.75rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

export const Email = styled.p`
  color: ${props => props.theme.colors.text}99;
  margin-bottom: 1rem;
`;

export const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.9rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  background-color: ${props => props.primary ? props.theme.colors.primary : props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.primary 
      ? `${props.theme.colors.primary}dd`
      : `${props.theme.colors.secondary}dd`};
  }
`;

export const UploadSection = styled.section`
  margin-bottom: 2rem;
`;

export const RecentUploads = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

export const UploadCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export const UploadImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const UploadInfo = styled.div`
  padding: 1rem;
`;

export const UploadTitle = styled.h3`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const UploadDate = styled.p`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.8rem;
`;