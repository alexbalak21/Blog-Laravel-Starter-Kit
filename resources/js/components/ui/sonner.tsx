import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
 <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group" // Force remove borders
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          // Custom success style
          success: '!bg-green-50 !text-green-900 [&>div]:text-green-600',
          // Custom error style
          error: '!bg-red-50 !text-red-900 [&>div]:text-red-600',
        },
      }}
      style={{
        '--success-bg': 'var(--green-50)',
        '--success-text': 'var(--green-900)',
        '--success-icon': 'var(--green-600)',
        '--error-bg': 'var(--red-50)',
        '--error-text': 'var(--red-900)',
        '--error-icon': 'var(--red-600)'
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster }
