import styled from 'styled-components';

export const NavLink = styled.a`
  color: #2d3436;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 600;
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: transparent;

  &:hover {
    color: #ff6b6b;
    background-color: rgba(255, 107, 107, 0.1);
    transform: translateY(-2px);
  }

  &.active {
    color: #ff6b6b;
    background-color: rgba(255, 107, 107, 0.15);

    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 3px;
      background-color: #ff6b6b;
      border-radius: 3px;
    }
  }
`;

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f0f2f5;
  background-image: linear-gradient(45deg, #f0f2f5 25%, #e8eaed 25%, #e8eaed 50%, #f0f2f5 50%, #f0f2f5 75%, #e8eaed 75%, #e8eaed 100%);
  background-size: 56.57px 56.57px;
  color: #2d3436;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 70px;
  font-family: 'Comic Neue', 'Segoe UI', sans-serif;
`;

export const Header = styled.header`
  background-color: #ffffff;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid #ff6b6b;
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
  font-size: 2rem;
  font-weight: 800;
  color: #ff6b6b;
  cursor: pointer;
  margin-right: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 2px 0 #ffd93d;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const SearchBar = styled.input`
  padding: 1rem 1.5rem;
  border-radius: 25px;
  border: 2px solid #e0e0e0;
  background-color: #f8f9fa;
  color: #2d3436;
  width: 100%;
  min-width: 300px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4ecdc4;
    box-shadow: 0 0 0 4px rgba(78, 205, 196, 0.2);
    background-color: #ffffff;
  }

  &::placeholder {
    color: #a0a0a0;
    font-style: italic;
  }
`;

export const UploadButton = styled.button`
  background-color: #4ecdc4;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #45b7af;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
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
  display: ${props => props.$isOpen ? 'block' : 'none'};
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
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2.5rem;
  padding: 2rem;
  width: 100%;
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

export const ComicCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #e0e0e0;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    border-color: #ff6b6b;
  }
`;

export const ComicImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  transition: transform 0.3s ease;

  ${ComicCard}:hover & {
    transform: scale(1.05);
  }
`;

export const ComicInfo = styled.div`
  padding: 1.25rem;
  background: linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1));
  border-top: 2px solid #f0f0f0;
`;

export const ComicTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: #2d3436;
  font-weight: 700;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
  background-color: #2d3436;
  padding: 3rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  position: relative;
  margin-top: 4rem;

  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    height: 10px;
    background: repeating-linear-gradient(
      -45deg,
      #ff6b6b,
      #ff6b6b 10px,
      #ffd93d 10px,
      #ffd93d 20px
    );
  }
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  color: #ffffff;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const FooterSection = styled.div`
  h3 {
    color: #4ecdc4;
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background-color: #ff6b6b;
      border-radius: 3px;

      @media (max-width: 480px) {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 1rem;

      a {
        color: #ffffff;
        text-decoration: none;
        font-size: 1rem;
        transition: all 0.3s ease;
        position: relative;
        padding-left: 1.5rem;

        &:before {
          content: '→';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          color: #ff6b6b;
          transition: transform 0.3s ease;
        }

        &:hover {
          color: #4ecdc4;
          padding-left: 1.8rem;

          &:before {
            transform: translate(5px, -50%);
          }
        }

        @media (max-width: 480px) {
          padding-left: 0;
          &:before {
            display: none;
          }
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