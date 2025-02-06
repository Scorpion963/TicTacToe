export default function HomeHeader({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <h1 className="text-background text-6xl font-bold">{children}</h1>
      </div>
    );
  }
  