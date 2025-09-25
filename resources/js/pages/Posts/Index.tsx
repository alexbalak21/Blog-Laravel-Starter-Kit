import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



export default function Index({ posts }: { posts: any }) {
    return (
        <AppLayout>
            <Head title="Posts" />
           <div>
            <h1>Posts</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Body</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post: any) => (
                        <TableRow key={post.id}>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>{post.body}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
           </div>
        </AppLayout>
    );
}   
