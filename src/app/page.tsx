import Preloader from "@/components/Preloader";
import Frame from "@/components/Frame";
import BentoCard from "@/components/BentoCard";
import HeroCard from "@/components/cards/HeroCard";
import MapCard from "@/components/cards/MapCard";
import StackCard from "@/components/cards/StackCard";
import WorkSection from "@/components/cards/WorkSection";
import ContactCard from "@/components/cards/ContactCard";
import SpotifyCard from "@/components/SpotifyCard";
import Taskbar from "@/components/Taskbar";
import Footer from "@/components/Footer";
import OnekoLazy from "@/components/OnekoLazy";
import CommandPalette from "@/components/CommandPalette";
import TerminalEgg from "@/components/TerminalEgg";

export default function Home() {
  return (
    <Preloader>
      <Frame>
        <div id="top" className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <BentoCard delay={0} className="md:col-span-3">
            <HeroCard />
          </BentoCard>
          <BentoCard delay={0.08}>
            <MapCard />
          </BentoCard>
          <BentoCard delay={0.14} className="md:col-span-2">
            <StackCard />
          </BentoCard>
          <BentoCard delay={0.2} id="work" className="md:col-span-3 cv-auto">
            <WorkSection />
          </BentoCard>
          <BentoCard delay={0.26} id="contact" className="md:col-span-2 cv-auto">
            <ContactCard />
          </BentoCard>
          <BentoCard delay={0.3} className="cv-auto">
            <SpotifyCard />
          </BentoCard>
        </div>
      </Frame>
      <Footer />
      <Taskbar />
      <OnekoLazy />
      <CommandPalette />
      <TerminalEgg />
    </Preloader>
  );
}
