import { type PropsWithChildren } from "react";
import styled from "styled-components";


interface TableCellProps extends PropsWithChildren {
  readonly width?: string;
  readonly type?: 'header' | 'body';
}

export const TableCell = ({ children, type = 'body', width }: TableCellProps) =>
  type === 'header' ? (
    <StyledTh $width={width}>{children}</StyledTh>
  ) : (
    <StyledTd>{children}</StyledTd>
  );

const StyledTh = styled.th<{ $width?: string }>`
  border: 1px solid #ddd;
  padding: 8px;
  width: ${props => props.$width};
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #04AA6D;
  color: white;
`;

const StyledTd = styled.td`
  text-align: center;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid #ddd;
  padding: 8px;
`;
