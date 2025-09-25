import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';


export default function Index({ posts }: { posts: any }) {
    return (
        <AppLayout>
            <Head title="Empty Page" />
         <div>Empty Page</div>
        </AppLayout>
    );
}   
