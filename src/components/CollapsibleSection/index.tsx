import { useState } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${(props) => props.theme.rowEven};
`;

const TextHeading = styled.h1`
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
`;

interface CollapsibleSectionProps {
  name: string;
  children?: JSX.Element | JSX.Element[];
}

export default function CollapsibleSection({
  name,
  children,
}: CollapsibleSectionProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Section>
      <TextHeading onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? `⯈` : `⯆`} {name}
      </TextHeading>
      {!collapsed && children}
    </Section>
  );
}
