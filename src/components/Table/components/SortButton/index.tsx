import { useEffect, useState } from "react";
import queryString from "query-string";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import { createNewQuery, getOrderQuery } from "../../../../utils";

interface SortButtonProps {
  readonly sortParam: string;
}

export const SortButton = ({ sortParam }: SortButtonProps) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [orderBy, setOrderBy] = useState<'asc' | 'desc' | null>(() => getOrderQuery(search));

  useEffect(() => {
    const query = queryString.parse(search);

    if (query?.sort && query.sort !== sortParam) {
      setOrderBy(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleChangeOrder = () => setOrderBy(prevState => {
    let newValue: 'asc' | 'desc' | null;

    switch(prevState) {
      case 'asc': {
        newValue = 'desc';
        break;
      }

      case 'desc': {
        newValue = null;
        break;
      }

      default: {
        newValue = 'asc';
        break;
      }
    }

    navigate(`/?${createNewQuery(search, {
      sort: newValue ? sortParam : undefined,
      order: newValue || undefined,
    })}`);

    return newValue;
  });

  return (
    <Button onClick={handleChangeOrder}>
      <ArrowUp $active={orderBy === 'asc'} />
      <ArrowDown $active={orderBy === 'desc'} />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

const ArrowUp = styled.div<{ $active: boolean }>`
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #f2f2f2;
  border-bottom-color: ${props => props.$active ? `black` : '#f2f2f2'};
`;

const ArrowDown = styled.div<{ $active: boolean }>`
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #f2f2f2;
  border-top-color: ${props => props.$active ? `black` : '#f2f2f2'};
`;
