import { Button, getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';

export default function Pagina() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Título" },
    { key: "body", label: "Conteúdo" },
    { key: "userId", label: "Usuário" },
  ];

  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) {
          throw new Error('Falha ao carregar posts');
        }
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(posts.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return posts.slice(start, end);
  }, [page, posts]);

  return <div>
    <Table aria-label="Posts"
      isStriped
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>

  </div>;
}

export type Post = {
  userId: number,
  id: number,
  title: string,
  body: string
}
