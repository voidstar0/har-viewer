import styled from 'styled-components';
import { useState } from 'react';
import { Entry } from '../../types/har';
import ExpandedHarViewHeader from '../ExpandedHarViewHeader';
import ExpandedHarRequestView from '../ExpendedHarRequestView';
import ExpandedHarResponseView from '../ExpandedHarResponseView';

interface ExpandedHarViewProps {
  entry: Entry;
  split: boolean;
}

interface ExpandedHarViewContainerProps {
  split: boolean;
}

const ExpandedHarViewContainer = styled.div<ExpandedHarViewContainerProps>`
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
  color: ${(props) => props.theme.fg};
  background-color: ${(props) => props.theme.bg};
  max-width: ${(props) => (props.split ? `50%` : `100vw`)};
  overflow-y: scroll;
  overflow-x: hidden;
  flex-grow: 1;
  top: 0;
  position: sticky;
  max-height: 100vh;
`;

export default function ExpandedHarView({
  entry,
  split,
}: ExpandedHarViewProps) {
  const tabs = [`Headers`, `Response`];
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  return (
    <ExpandedHarViewContainer split={split}>
      <ExpandedHarViewHeader
        tabs={tabs}
        onTabChange={(t) => setCurrentTab(t)}
      />
      {currentTab === `Headers` && <ExpandedHarRequestView entry={entry} />}
      {currentTab === `Response` && <ExpandedHarResponseView entry={entry} />}
    </ExpandedHarViewContainer>
  );
}
