export default function WrapperChat({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 overflow-auto h-[calc(100vh-4rem)] min-w-64">
      {children}
    </div>
  );
}
