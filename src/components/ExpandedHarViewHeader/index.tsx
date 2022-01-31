import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { selectEntry } from '../../features/ui/uiSlice';

const ExpandedHarViewHeaderContainer = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.rowEven};
`;

const CloseButton = styled.div``;

const CloseButtonText = styled.span`
  cursor: pointer;
`;

interface HarHeaderButtonProps {
  selected: boolean;
}

const HarHeaderButton = styled.div<HarHeaderButtonProps>`
  background-color: ${(props) =>
    props.selected ? props.theme.rowEven : props.theme.bg};
  padding: 5px;
  margin-right: 10px;
  cursor: pointer;

  ${(props) =>
    !props.selected &&
    css`
      :hover {
        background-color: ${props.theme.rowOdd};
      }
    `}
`;

const TabContainer = styled.div`
  display: flex;
  padding-left: 20px;
`;

interface ExpandedHarViewHeaderProps {
  tabs: string[];
  onTabChange: (tab: string) => void;
}

export default function ExpandedHarViewHeader({
  tabs,
  onTabChange,
}: ExpandedHarViewHeaderProps) {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  function changeTab(tab: string) {
    setSelectedTab(tab);
    onTabChange(tab);
  }
  return (
    <ExpandedHarViewHeaderContainer>
      <CloseButton onClick={() => dispatch(selectEntry(undefined))}>
        <CloseButtonText>x</CloseButtonText>
      </CloseButton>
      <TabContainer>
        {tabs.map((t) => (
          <HarHeaderButton
            selected={selectedTab === t}
            key={t}
            onClick={() => changeTab(t)}
          >
            {t}
          </HarHeaderButton>
        ))}
      </TabContainer>
    </ExpandedHarViewHeaderContainer>
  );
}
