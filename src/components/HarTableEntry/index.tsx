import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { selectEntry } from '../../features/ui/uiSlice';
import { cleanSize } from '../../helpers/file';
import { Entry } from '../../types/har';
import HttpStatusBadge from '../HttpStatusBadge';

interface HarTableRowProps {
  selected: boolean;
}

const HarTableRow = styled.tr<HarTableRowProps>`
  background-color: ${(props) =>
    props.selected ? props.theme.rowSelected : props.theme.rowOdd};
  color: ${(props) => props.theme.fg};
  cursor: pointer;

  ${(props) =>
    !props.selected &&
    css`
      :nth-child(even) {
        background-color: ${props.theme.rowEven};
      }

      :hover {
        background-color: ${props.theme.rowOdd};
      }
    `}
`;

const HarTableData = styled.td`
  line-height: 1.375;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  word-break: break-all;
  max-width: 32rem;
  text-align: left;
`;

interface HarTableEntryProps {
  entry: Entry;
  minimized: boolean;
  selected: boolean;
}

export default function HarTableEntry({
  entry,
  minimized,
  selected,
}: HarTableEntryProps) {
  const dispatch = useDispatch();
  return (
    <HarTableRow
      onClick={() => dispatch(selectEntry(entry))}
      selected={selected}
    >
      <HarTableData>
        <HttpStatusBadge status={entry.response.status} />
      </HarTableData>
      <HarTableData>{entry.request.method}</HarTableData>
      <HarTableData>{entry.request.url}</HarTableData>
      {!minimized && (
        <>
          <HarTableData>{entry.request.httpVersion}</HarTableData>
          <HarTableData>{entry.response.content.mimeType}</HarTableData>
          <HarTableData>
            {cleanSize(
              entry.response._transferSize ||
                entry.response.headersSize + entry.response.bodySize,
            )}
          </HarTableData>
          <HarTableData>{entry.time.toFixed(2)} ms</HarTableData>
        </>
      )}
    </HarTableRow>
  );
}
