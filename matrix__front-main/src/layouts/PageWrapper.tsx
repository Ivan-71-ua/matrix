type PageWrapperProps = {
  children: React.ReactNode;
  pageTitle?: string;
};
export default function PageWrapper({ children, pageTitle }: PageWrapperProps) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl h-screen px-10 py-20">
      {pageTitle && <h1 className="text-2xl font-bold mb-4">{pageTitle}</h1>}
      {children}
    </div>
  );
}
