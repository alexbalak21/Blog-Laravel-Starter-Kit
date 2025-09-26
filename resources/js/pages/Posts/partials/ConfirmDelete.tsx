import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ReactNode } from 'react';

interface ConfirmDeleteProps {
  children: ReactNode;
  onConfirm: () => void;
  asChild?: boolean;
}

export default function ConfirmDelete({ 
  children, 
  onConfirm,
  asChild = false
}: ConfirmDeleteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={asChild}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild className="bg-destructive hover:bg-destructive/70">
            <Button 
              variant="destructive" 
              onClick={onConfirm}
              data-test="confirm-delete-post-button"
            >
              Delete
            </Button>
          </AlertDialogAction>  
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}