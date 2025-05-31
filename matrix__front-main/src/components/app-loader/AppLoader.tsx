export default function AppLoader() {
  return (
    <div className="z-10 bg-white/50 w-full h-screen absolute flex items-center justify-center">
      <div
        className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
