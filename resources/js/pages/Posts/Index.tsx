import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';



export default function Index() {
    return (
        <AppLayout>
            <Head title="Posts" />
           <div>
            <h1>Posts</h1>
           </div>
        </AppLayout>
    );
}
