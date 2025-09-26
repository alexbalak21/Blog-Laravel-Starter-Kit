import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Post } from '@/types';
import axios from 'axios';

interface PostDialogProps {
    children: React.ReactNode;
    postToEdit?: number;
}

export default function PostDialog({ children, postToEdit }: PostDialogProps) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        body: '',
        _loading: false
    });

    // Load post data when dialog opens in edit mode
    useEffect(() => {
        if (open) {
            if (postToEdit) {
                // Show loading state
                setData(prev => ({ ...prev, _loading: true }));
                
                axios.get(`/posts/${postToEdit}/edit`)
                    .then(({ data }) => {
                        setData({
                            title: data.post.title,
                            body: data.post.body,
                            _loading: false
                        });
                    })
                    .catch(error => {
                        console.error('Error loading post:', error);
                        toast.error('Failed to load post');
                        setOpen(false);
                    });
            } else {
                // Reset form when creating a new post
                setData({ 
                    title: '', 
                    body: '',
                    _loading: false 
                });
            }
        }
    }, [postToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (postToEdit) {
            put(`/posts/${postToEdit}`, {
                onSuccess: () => {
                    toast.success('Post updated successfully');
                    setOpen(false);
                    reset();
                },
                onError: (errors) => {
                    Object.values(errors).forEach(error => {
                        toast.error(error);
                    });
                },
            });
        } else {
            post('/posts', {
                onSuccess: () => {
                    toast.success('Post created successfully');
                    setOpen(false);
                    reset();
                },
                onError: (errors) => {
                    Object.values(errors).forEach(error => {
                        toast.error(error);
                    });
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogTitle className="text-2xl font-semibold">
                    {postToEdit ? 'Edit Post' : 'Create New Post'}
                </DialogTitle>
                <div className="space-y-6">
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
                                disabled={processing || data._loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {data._loading ? 'Loading...' : 
                                 processing ? (postToEdit ? 'Updating...' : 'Creating...') : 
                                 (postToEdit ? 'Update Post' : 'Create Post')}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}