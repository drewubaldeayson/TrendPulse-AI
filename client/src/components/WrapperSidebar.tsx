export default function WrapperSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-4 border w-32 md:w-64 bg-primary-foreground">
      {children}
    </div>
  );
}
