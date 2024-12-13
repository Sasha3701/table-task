import { Table } from "../Table";
import type { Columns, IData } from "../../types";

const columns: Array<Columns<IData>> = [
  {
    title: 'id',
    key: 'id',
    width: '14%',
  },
  {
    title: 'firstName',
    key: 'firstName',
    width: '14%',
  },
  {
    title: 'lastName',
    key: 'lastName',
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
  },
  {
    title: 'description',
    key: 'description',
    width: '14%',
  },
];

interface ItemProps {
  readonly item: IData;
}

export const Item = ({ item }: ItemProps) => (
  <Table<IData>
    columns={columns}
    dataSource={[item]}
  />
);
