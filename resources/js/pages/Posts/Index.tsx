import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Post } from '@/types';
import { toast } from "sonner";
import ConfirmDelete from './partials/ConfirmDelete';

export default function Index({ posts }: { posts: Post[] }) {
    const handleDelete = (id: number) => {
        router.delete(`/posts/${id}`, {
            onSuccess: () => toast.success('Post deleted successfully'),
            onError: () => toast.error('Failed to delete post'),
        });
    };
    
    return (
        <AppLayout>
            <Head title="Posts" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Posts</h1>
                    <Link href="/posts/create">
                        <Button variant="outline">
                            Create Post
                        </Button>
                    </Link>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="w-48 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post: Post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/posts/${post.id}/edit`}>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </Link>
                                            <ConfirmDelete onConfirm={() => handleDelete(post.id)}>
                                                <Button variant="destructive" size="sm">Delete</Button>
                                            </ConfirmDelete>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
