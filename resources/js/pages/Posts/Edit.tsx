import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from "sonner";
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    content: string;
}

interface EditProps {
    post: Post;
}

export default function Edit({ post }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/posts/${post.id}`, {
            onSuccess: () => {
                toast.success('Post updated successfully');
                router.get('/posts');
            },
            onError: (errors) => {
                Object.values(errors).forEach(error => {
                    toast.error(error);
                });
            }
        });
    }

    return (
        <AppLayout>
            <Head title="Edit Post" />
                <Dialog open={true} onOpenChange={(open) => !open && window.history.back()}>
                    <DialogContent className="sm:max-w-[600px]">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold">Edit Post</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className="mt-1 block w-full min-h-[200px]"
                                    />
                                    {errors.content && (
                                        <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                        disabled={processing}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        {processing ? 'Updating...' : 'Update Post'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
        </AppLayout>
    );
}