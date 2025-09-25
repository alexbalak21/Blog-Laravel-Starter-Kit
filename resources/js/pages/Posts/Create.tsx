import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';


export default function Index({ posts }: { posts: any }) {
    return (
        <AppLayout>
          <Head title="Create Post" />
          <div className='flex justify-center items-center h-screen'>
            <h1>Create Post</h1>
            <form action="">
                <input type="text" name="title" />
                <textarea name="body" id=""></textarea>
                <button type="submit">Create</button>
            </form>
          </div>
        </AppLayout>
    );
}   
    