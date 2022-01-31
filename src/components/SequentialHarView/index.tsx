import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Entry, Har } from '../../types/har';
import ExpandedHarView from '../ExpandedHarView';
import HarTableEntry from '../HarTableEntry';
import { RootState } from '../../store';
import { selectEntry } from '../../features/ui/uiSlice';

const HarViewContainer = styled.div`
  display: flex;
`;

const HarTable = styled.table`
  table-layout: fixed;
  max-width: 100%;
  text-indent: 0;
  flex-grow: 1;
  min-height: 20px;
  border-collapse: collapse;
`;

const HarTableHead = styled.thead`
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.searchText};
  position: sticky;
  top: 0;
  z-index: 9999;
`;

const TableHeaderCell = styled.th`
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: left;
  padding: 0.75rem 1.5rem 0.75rem 1.5rem;
  display: table-cell;
  vertical-align: inherit;
`;

const TableContainer = styled.div`
  display: flex;
  max-height: 100vh;
  flex-grow: 1;
  overflow-y: scroll;
  align-self: flex-start;
`;

interface SequentialHarViewProps {
  har: Har;
}

function getFilteredEntries(entries: Entry[], filter: string) {
  return entries.filter((e) => e.request.url.includes(filter));
}

function SequentialHarView({ har }: SequentialHarViewProps) {
  const filter = useSelector((state: RootState) => state.ui.filter);
  const selected = useSelector((state: RootState) => state.ui.selectedEntry);

  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: `(max-width: 1000px)` });
  const filteredEntries = useMemo<Entry[]>(
    () => getFilteredEntries(har.log.entries, filter),
    [har, filter],
  );

  useEffect(() => {
    dispatch(selectEntry(undefined));
  }, [filter]);

  return (
    <HarViewContainer tabIndex={-1}>
      <TableContainer>
        <HarTable>
          <HarTableHead>
            <tr>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Method</TableHeaderCell>
              <TableHeaderCell>Url</TableHeaderCell>
              {selected === undefined && !isTabletOrMobile && (
                <>
                  <TableHeaderCell>Protocol</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>Size</TableHeaderCell>
                  <TableHeaderCell>Time</TableHeaderCell>
                </>
              )}
            </tr>
          </HarTableHead>
          <tbody>
            {filteredEntries.map((e) => (
              <React.Fragment key={e.uuid}>
                <HarTableEntry
                  selected={selected !== undefined && selected?.uuid === e.uuid}
                  entry={e}
                  minimized={selected !== undefined || isTabletOrMobile}
                />

                {selected !== undefined &&
                  isTabletOrMobile &&
                  selected.uuid === e.uuid && (
                    <tr>
                      <td colSpan={3}>
                        <ExpandedHarView
                          entry={selected}
                          split={!isTabletOrMobile}
                        />
                      </td>
                    </tr>
                  )}
              </React.Fragment>
            ))}
          </tbody>
        </HarTable>
      </TableContainer>
      {selected !== undefined && !isTabletOrMobile && (
        <ExpandedHarView entry={selected} split={!isTabletOrMobile} />
      )}
    </HarViewContainer>
  );
}

export default SequentialHarView;
