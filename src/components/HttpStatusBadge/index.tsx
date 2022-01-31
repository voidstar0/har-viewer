import styled from 'styled-components';

const StatusBadge = styled.span`
  line-height: 1.25rem;
  font-weight: 600;
  font-size: 0.75rem;
  padding: 0 0.5rem;
  border-radius: 0.375rem;
`;

const ErrorStatusBadge = styled(StatusBadge)`
  background-color: ${(props) => props.theme.statusBadge.errorBg};
  color: ${(props) => props.theme.statusBadge.errorFg};
`;

const InfoStatusBadge = styled(StatusBadge)`
  background-color: ${(props) => props.theme.statusBadge.infoBg};
  color: ${(props) => props.theme.statusBadge.infoFg};
`;

const SuccessStatusBadge = styled(StatusBadge)`
  background-color: ${(props) => props.theme.statusBadge.successBg};
  color: ${(props) => props.theme.statusBadge.successFg};
`;

interface HttpStatusBadgeProps {
  status: number;
}

export default function HttpStatusBadge({ status }: HttpStatusBadgeProps) {
  if (status >= 100 && status <= 299) {
    return <SuccessStatusBadge>{status}</SuccessStatusBadge>;
  }
  if (status >= 300 && status <= 399) {
    return <InfoStatusBadge>{status}</InfoStatusBadge>;
  }
  if (status >= 400 && status <= 599) {
    return <ErrorStatusBadge>{status}</ErrorStatusBadge>;
  }

  return <ErrorStatusBadge>Blocked</ErrorStatusBadge>;
}
