export default function Footer() {
  return (
    <footer className="flex items-center justify-between h-16 px-4 border-t bg-primary-foreground">
      <p className="w-full text-center opacity-50">
        &copy; {new Date().getFullYear()} TrendPulse AI. All rights reserved.
      </p>
    </footer>
  );
}
