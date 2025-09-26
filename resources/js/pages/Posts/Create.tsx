import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import { router } from '@inertiajs/react';


export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        body: ''
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/posts', {
            onSuccess: () => {
                toast.success('Post created successfully');
                router.visit('/posts');         

            },
            onError: (errors) => {
                Object.values(errors).forEach(error => {
                    toast.error(error);
                });     
            },
        });
    }

    return (
        <AppLayout>
            <Head title="Create Post" />
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                <Dialog open={true} onOpenChange={(open) => !open && window.history.back()}>
                    <DialogContent className="sm:max-w-[600px]">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold">Create New Post</h2>
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
                                        {processing ? 'Creating...' : 'Create Post'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}