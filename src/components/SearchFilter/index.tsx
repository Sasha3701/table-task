import { type ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { createNewQuery, getSearchQuery } from "../../utils";

interface SearchFilterProps {
  readonly disabled: boolean;
}

export const SearchFilter = ({ disabled }: SearchFilterProps) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState(() => getSearchQuery(search));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/?${createNewQuery(search, {
      search: value || undefined,
    })}`);
  };

  return (
    <Container>
      <Input
        onChange={handleChange}
        value={value}
        disabled={disabled}
        placeholder="Введите поисковую строку..."
      />
      <Button
        onClick={handleSearch}
        disabled={disabled}
      >
        Найти
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 40px;
  margin: 10px 10px 0 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #04AA6D;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
`;
