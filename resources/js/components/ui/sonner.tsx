import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps, toast as sonnerToast } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group [&>div>div]:!border-0 [&>div>div]:!border-none" // Force remove borders
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:shadow-lg !border-0 !border-none',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          // Custom success style
          success: '!bg-green-50 !text-green-900 [&>div]:text-green-600 !border-0 !border-none',
          // Custom error style
          error: '!bg-red-50 !text-red-900 [&>div]:text-red-600 !border-0 !border-none',
        },
      }}
      style={{
        '--success-bg': 'var(--green-50)',
        '--success-text': 'var(--green-900)',
        '--success-icon': 'var(--green-600)',
        '--error-bg': 'var(--red-50)',
        '--error-text': 'var(--red-900)',
        '--error-icon': 'var(--red-600)',
        '--normal-border': 'none !important',
        '--success-border': 'none !important',
        '--error-border': 'none !important',
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster, sonnerToast as toast }