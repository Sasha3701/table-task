import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { Table, Item, SearchFilter } from "./components";
import { useData } from "./hooks";
import type { Columns, IAddress, IData } from "./types";
import { filterData, getOrderQuery, getSearchQuery, getSortQuery, sortData } from "./utils";

const columns: Array<Columns<IData>> = [
  {
    title: 'id',
    key: 'id',
    sorted: true,
    width: '14%',
  },
  {
    title: 'firstName',
    key: 'firstName',
    sorted: true,
    width: '14%',
  },
  {
    title: 'lastName',
    key: 'lastName',
    sorted: true,
    width: '14%',
  },
  {
    title: 'email',
    key: 'email',
    width: '14%',
  },
  {
    title: 'phone',
    key: 'phone',
    width: '14%',
  },
  {
    title: 'address',
    key: 'address',
    width: '14%',
    render: value => {
      const address = value as IAddress;

      return Object.values(address).join(', ');
    },
  },
  {
    title: 'description',
    key: 'description',
    width: '14%',
  },
];

export const App = () => {
  const { search } = useLocation();

  const { data, isLoading } = useData<Array<IData>>();

  const [dataItem, setDataItem] = useState<IData | null>(null);

  const dataFiltred = useMemo(() => {
    const searchText = getSearchQuery(search);
    const orderBy = getOrderQuery(search);
    const sort = getSortQuery(search);

    if (data && searchText) {
      const newData = filterData(data, searchText);

      return sort && orderBy ? sortData(newData, sort, orderBy) : newData;
    }

    if (data && sort && orderBy) {
      return sortData(data, sort, orderBy);
    }

    return data;
  }, [search, data]);

  const handleClickRow = (value: IData) => setDataItem(value);

  return (
    <Container>
      <SearchFilter disabled={isLoading}/>
      <WrapperTable>
        {!isLoading && !!dataFiltred ? (
          <Table<IData>
            columns={columns}
            dataSource={dataFiltred}
            onClickRow={handleClickRow}
            isStickyHead
          />
        ) : 'Loading...'}
      </WrapperTable>
      {!!dataItem && <Item item={dataItem}/>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WrapperTable = styled.div`
  height: 60vh;
  overflow: auto;
  position: relative;
`;
