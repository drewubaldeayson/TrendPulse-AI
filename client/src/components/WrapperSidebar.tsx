export default function WrapperSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-2 md:px-4 py-4 border w-32 md:w-64 bg-primary-foreground">
      {children}
    </div>
  );
}
