import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
    };
}

interface ShowProps {
    post: Post;
    user: {
        name: string;
    };
}

export default function Show({ post, user }: ShowProps) {
    return (
        <AppLayout>
            <Head title={post.title} />
            <div className="container mx-auto py-8 px-4">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <Button asChild variant="ghost">
                            <Link href="/posts">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Posts
                            </Link>
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={() => router.visit(`/posts/${post.id}/edit`)}
                        >
                            Edit
                        </Button>
                    </div>

                    <div className="mb-6">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">{post.title}</h1>
                        <div className="flex justify-between items-center text-muted-foreground">
                            <span>Posted by {user?.name || 'Unknown'}</span>
                            <span>{format(new Date(post.created_at), 'MMMM d, yyyy')}</span>
                        </div>
                    </div>

                    <Card>
                        <CardContent>
                            <div className="prose max-w-none">
                                <p className="whitespace-pre-line">{post.content}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end mt-4">
                            <span className="text-sm text-muted-foreground">
                                Last updated: {format(new Date(post.updated_at), 'MMMM d, yyyy')}
                            </span>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}