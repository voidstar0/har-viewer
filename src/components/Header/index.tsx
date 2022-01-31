import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateFilter } from '../../features/ui/uiSlice';

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.bg};
  width: 100vw;
  padding: 5px;
`;

const SearchBar = styled.input`
  background-color: ${(props) => props.theme.search};
  padding: 5px;
  color: ${(props) => props.theme.searchText};

  ::placeholder {
    color: rgb(119, 119, 119);
    opacity: 1;
  }

  border-style: none;
  :hover {
    border: 1px solid ${(props) => props.theme.rowEven};
  }
  :focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.rowSelected};
  }
`;

export default function Header() {
  const dispatch = useDispatch();

  return (
    <HeaderContainer>
      <SearchBar
        type="text"
        placeholder="Filter"
        onChange={(e) => dispatch(updateFilter(e.target.value))}
      />
    </HeaderContainer>
  );
}
