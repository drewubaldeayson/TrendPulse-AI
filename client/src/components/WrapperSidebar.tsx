export default function WrapperSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 border w-80 bg-primary-foreground">{children}</div>
  );
}
