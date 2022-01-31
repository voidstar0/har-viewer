import styled from 'styled-components';

const Key = styled.b`
  color: ${(props) => props.theme.key};
`;

const Value = styled.p`
  padding-top: 0.1rem;
`;

interface KeyValueProps {
  name: string;
  value: string;
}

export default function KeyValue({ name, value }: KeyValueProps) {
  return (
    <Value>
      <Key>{name} </Key>
      {value}
    </Value>
  );
}
