import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: ${props => props.theme.colors.secondary};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 10;
`;

export const Logo = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
`;

export const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: none;
  border: none;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 173, 181, 0.1);
    color: ${props => props.theme.colors.primary};
  }

  &.logout {
    margin-top: auto;
    color: #ff6b6b;
    
    &:hover {
      background-color: rgba(255, 107, 107, 0.1);
      color: #ff6b6b;
    }
  }

  .icon {
    font-size: 1.2rem;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
`;

export const PageContainer = styled.div`
  padding: 2rem;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: ${props => props.theme.colors.text}99;
`;

export const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 8px;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  width: 300px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.text}99;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  .icon {
    font-size: 1.5rem;
    padding: 0.75rem;
    border-radius: 8px;
    background-color: rgba(0, 173, 181, 0.1);
    color: ${props => props.theme.colors.primary};
  }

  .subtitle {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text}99;
    margin-top: 0.25rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text}99;
  margin-bottom: 0.25rem;
`;

export const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

export const RecentComicsSection = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 1.5rem;
  border-radius: 12px;

  h2 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 1.5rem;
  }
`;

export const ComicsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.tr`
  text-align: left;
  color: ${props => props.theme.colors.text}99;
  border-bottom: 1px solid ${props => props.theme.colors.background};

  th {
    padding: 1rem;
    font-weight: 500;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.background};

  td {
    padding: 1rem;
    color: ${props => props.theme.colors.text};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'success':
        return `
          background-color: #00c85320;
          color: #00c853;
        `;
      case 'danger':
        return `
          background-color: #ff6b6b20;
          color: #ff6b6b;
        `;
      case 'warning':
        return `
          background-color: #ffd60a20;
          color: #ffd60a;
        `;
      default:
        return `
          background-color: ${props.theme.colors.background};
          color: ${props.theme.colors.text};
        `;
    }
  }}
`;

export const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
`;

export const UsersTableHeader = styled.tr`
  background-color: ${props => props.theme.colors.background};
  
  th {
    padding: 1rem;
    text-align: left;
    color: ${props => props.theme.colors.text}99;
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

export const UsersTableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.background};

  td {
    padding: 1rem;
    color: ${props => props.theme.colors.text};

    .email {
      font-size: 0.85rem;
      color: ${props => props.theme.colors.text}99;
      margin-top: 0.25rem;
    }

    .comment {
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      
      &:hover {
        white-space: normal;
        overflow: visible;
      }
    }

    .edit-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const RoleBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s;

  ${props => props.success && `
    background-color: #00c85320;
    color: #00c853;
  `}

  ${props => props.warning && `
    background-color: #ffd60a20;
    color: #ffd60a;
  `}

  ${props => props.danger && `
    background-color: #ff6b6b20;
    color: #ff6b6b;
  `}

  &:hover {
    opacity: 0.8;
  }
`;

export const GenresList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const GenreTag = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
`;

export const RatingStars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  &::before {
    content: '${props => '★'.repeat(props.rating)}${props => '☆'.repeat(5 - props.rating)}';
    color: #ffd700;
    letter-spacing: 2px;
  }
`;

export const EditInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  margin-right: 0.5rem;
  width: 200px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}40;
  }
`;

export const CountBadge = styled.span`
  background-color: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

export const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;

  h3 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }

  p {
    color: ${props => props.theme.colors.text}99;
    margin-bottom: 1rem;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const UploadButton = styled(ActionButton)`
  margin-left: auto;
  margin-right: 1rem;
`;

export const UploadOverlay = styled(ConfirmationModal)`
  background-color: rgba(0, 0, 0, 0.8);
`;

export const UploadForm = styled(ModalContent)`
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }

  input[type="text"],
  input[type="file"],
  textarea,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 4px;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  select {
    cursor: pointer;
  }
`;

export const GenreSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
  }

  input[type="checkbox"] {
    cursor: pointer;
  }
`;

export const FileUpload = styled.div`
  border: 2px dashed ${props => props.theme.colors.border};
  padding: 2rem;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  input[type="file"] {
    display: none;
  }

  .upload-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.primary};
  }

  .upload-text {
    color: ${props => props.theme.colors.text}99;
  }
`;

export const FormActions = styled(ModalActions)`
  margin-top: 2rem;
  justify-content: flex-end;
`;

export const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.danger};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-top: 1rem;
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

export const Toast = styled.div`
  background-color: ${props => props.type === 'success' ? '#00c853' : props.type === 'error' ? '#ff6b6b' : '#ffd60a'};
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const UploaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .username {
    font-weight: 500;
    color: ${props => props.theme.colors.text};
  }

  .role {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
  color: ${props => props.theme.colors.text};

  span {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text}99;
  }
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 6px;
  background-color: ${props => props.disabled ? props.theme.colors.background : 'transparent'};
  color: ${props => props.disabled ? props.theme.colors.text + '99' : props.theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primary}20;
  }

  &:disabled {
    border-color: ${props => props.theme.colors.text}40;
  }
`; 