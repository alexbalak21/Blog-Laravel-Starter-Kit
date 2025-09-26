import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ReactNode, useState } from 'react';

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
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!asChild ? (
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => setOpen(true)}
        >
          {children}
        </Button>
      ) : (
        <div onClick={() => setOpen(true)}>
          {children}
        </div>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the post.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm}
            data-test="confirm-delete-post-button"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}