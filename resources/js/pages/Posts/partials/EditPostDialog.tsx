import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { toast } from "sonner";

interface Post {
    id: number;
    title: string;
    body: string;
}

interface FormData {
    title: string;
    body: string;
}

interface EditPostDialogProps {
    children: React.ReactNode;
    post: Post;
}

export default function EditPostDialog({ children, post: initialPost }: EditPostDialogProps) {
    const [open, setOpen] = useState(false);
    
    const { data, setData, put, processing, errors } = useForm<FormData>({
        title: initialPost.title,
        body: initialPost.body
    });

    // Update form data when the post prop changes
    useEffect(() => {
        setData({
            title: initialPost.title,
            body: initialPost.body
        });
    }, [initialPost, setData]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/posts/${initialPost.id}`, {
            onSuccess: () => {
                toast.success('Post updated successfully');
                setOpen(false);
            },
            onError: (errors) => {
                Object.values(errors).forEach(error => {
                    toast.error(error);
                });
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
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
                            <Label htmlFor="body">Content</Label>
                            <Textarea
                                id="body"
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                className="mt-1 block w-full min-h-[200px]"
                            />
                            {errors.body && (
                                <p className="mt-1 text-sm text-red-600">{errors.body}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}