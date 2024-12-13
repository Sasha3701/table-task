import styled from "styled-components";

import { TableCell, SortButton } from "./components";
import { type Columns } from "../../types";

interface TableProps<T> {
  readonly dataSource: Array<T>;
  readonly columns: Array<Columns<T>>;
  readonly onClickRow?: (value: T) => void;
  readonly isStickyHead?: boolean;
}

export const Table = <T extends Record<keyof T, string | number | object>>({
  columns,
  dataSource,
  onClickRow,
  isStickyHead = false,
}: TableProps<T>) => {
  const renderBodyCell = (value: unknown, index: number) => {
    if (typeof value === 'string') {
      return value;
    }

    if (columns[index]?.render) {
      return columns[index].render(value);
    }

    return JSON.stringify(value);
  };

  return (
    <StyledTable>
      <StyledTableHeader $isSticky={isStickyHead}>
        <StyledTableRow>
          {columns.map(({ title, sorted, width, key }) => (
            <TableCell
              key={`thead=${key}`}
              type="header"
              width={width}
            >
              <WrapperCell>
                {title as string}
                {sorted && <SortButton sortParam={key}/>}
              </WrapperCell>
            </TableCell>
          ))}
        </StyledTableRow>
      </StyledTableHeader>
      <StyledTableBody>
        {dataSource.map((row, index) => (
          <StyledTableRow key={index} onClick={() => onClickRow?.(row)}>
            {Object.values(row).map((value, index) => (
              <TableCell key={columns[index].key}>
                {renderBodyCell(value, index)}
              </TableCell>
            ))}
          </StyledTableRow>
        ))}
      </StyledTableBody>
    </StyledTable>
  )
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTableHeader = styled.thead<{ $isSticky: boolean }>`
  top: 0;
  position: ${props => props.$isSticky && 'sticky'};
`;

const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #ddd;
  }
`;

const StyledTableBody = styled.tbody`
  tr {
    cursor: pointer;
  }
`;

const WrapperCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
