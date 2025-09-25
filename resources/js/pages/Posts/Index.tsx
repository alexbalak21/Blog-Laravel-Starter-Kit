import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Post } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { toast } from "sonner"




export default function Index({ posts }: { posts: Post[] }) {
    const deletePost = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(`/posts/${id}`, {
                onSuccess: () => toast.success('Post deleted successfully'),
                onError: () => toast.error('Failed to delete post'),
            });
        }
    };
    return (
        <AppLayout>
            <Head title="Posts" />
           <div>
            <Button className='my-5' asChild variant={'outline'}>
                <Link href="posts/create">Create Post</Link>
            </Button>
            <h1>Posts</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post: Post) => (
                        <TableRow key={post.id}>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>
                                <Button variant={'destructive'} onClick={() => deletePost(post.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
           </div>
        </AppLayout>
    );
}   
