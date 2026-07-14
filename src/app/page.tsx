import Preloader from "@/components/Preloader";
import Frame from "@/components/Frame";
import BentoCard from "@/components/BentoCard";
import ThemeToggle from "@/components/ThemeToggle";
import HeroCard from "@/components/cards/HeroCard";
import PhotoCard from "@/components/cards/PhotoCard";

export default function Home() {
  return (
    <Preloader>
      <header className="mx-auto flex w-[calc(100%-32px)] max-w-[840px] items-center justify-between pt-6">
        <a href="#top" className="font-display text-base font-semibold">
          Mihirsinh Chavda
        </a>
        <ThemeToggle />
      </header>
      <Frame>
        <div id="top" className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <BentoCard delay={0} className="md:col-span-2">
            <HeroCard />
          </BentoCard>
          <BentoCard delay={0.06}>
            <PhotoCard />
          </BentoCard>
          <BentoCard delay={0.12}>
            <p className="text-muted">map — Task 8</p>
          </BentoCard>
          <BentoCard delay={0.18} className="md:col-span-2">
            <p className="text-muted">stack — Task 9</p>
          </BentoCard>
          <BentoCard delay={0.24} id="work" className="md:col-span-3 cv-auto">
            <p className="text-muted">work — Task 10</p>
          </BentoCard>
          <BentoCard delay={0.3} id="about" className="md:col-span-2 cv-auto">
            <p className="text-muted">about — Task 11</p>
          </BentoCard>
          <BentoCard delay={0.36} id="contact" className="cv-auto">
            <p className="text-muted">contact — Task 11</p>
          </BentoCard>
        </div>
      </Frame>
    </Preloader>
  );
}
