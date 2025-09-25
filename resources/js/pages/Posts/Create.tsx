import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormEventHandler, useRef } from 'react';







export default function Index({ posts }: { posts: any }) {
    const postTitle = useRef<HTMLInputElement>(null);
    const postBody = useRef<HTMLTextAreaElement>(null);
    const { data, setData, post } = useForm({
        title: '',
        body: '',
    });
    return (
        <AppLayout>
          <Head title="Create Post" />
          <div className='flex justify-center items-center h-screen'>
            <h1>Create Post</h1>
            <form onSubmit={createTask} className='space-y-6'>
                <div className="grid gap-2">
                <Label htmlFor='title'>Title</Label>
                <Input 
                type="text" 
                name="title" 
                id="title" 
                ref={postTitle} 
                value={data.title} 
                onChange={(e) => setData('title', e.target.value)} 
                className='mt-1 block w-full'
                />
                <Textarea
                name="body"
                id="body"
                ref={postBody}
                value={data.body}
                onChange={(e) => setData('body', e.target.value)}
                className='mt-1 block w-full'
                />

                </div>
            </form>
          </div>
        </AppLayout>
    );
}   
    