export default function WrapperSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-32 py-4 border md:w-64 bg-primary-foreground">
      {children}
    </div>
  );
}
