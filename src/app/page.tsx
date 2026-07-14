import Preloader from "@/components/Preloader";
import Frame from "@/components/Frame";
import BentoCard from "@/components/BentoCard";
import ThemeToggle from "@/components/ThemeToggle";
import HeroCard from "@/components/cards/HeroCard";
import PhotoCard from "@/components/cards/PhotoCard";
import MapCard from "@/components/cards/MapCard";
import StackCard from "@/components/cards/StackCard";
import WorkSection from "@/components/cards/WorkSection";
import AboutCard from "@/components/cards/AboutCard";
import ContactCard from "@/components/cards/ContactCard";
import Taskbar from "@/components/Taskbar";
import Footer from "@/components/Footer";
import OnekoLazy from "@/components/OnekoLazy";

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
            <MapCard />
          </BentoCard>
          <BentoCard delay={0.18} className="md:col-span-2">
            <StackCard />
          </BentoCard>
          <BentoCard delay={0.24} id="work" className="md:col-span-3 cv-auto">
            <WorkSection />
          </BentoCard>
          <BentoCard delay={0.3} id="about" className="md:col-span-2 cv-auto">
            <AboutCard />
          </BentoCard>
          <BentoCard delay={0.36} id="contact" className="cv-auto">
            <ContactCard />
          </BentoCard>
        </div>
      </Frame>
      <Footer />
      <Taskbar />
      <OnekoLazy />
    </Preloader>
  );
}
