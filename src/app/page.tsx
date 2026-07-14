import Preloader from "@/components/Preloader";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <Preloader>
      <main className="mx-auto w-full max-w-[840px] px-4 py-16">
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-semibold">
            Mihirsinh Chavda
          </span>
          <ThemeToggle />
        </div>
        <p className="mt-8 text-muted">v2 under construction — bento shell lands in Task 5.</p>
      </main>
    </Preloader>
  );
}
