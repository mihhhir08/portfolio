import Preloader from "@/components/Preloader";
import Frame from "@/components/Frame";
import BentoCard from "@/components/BentoCard";
import DecryptReveal from "@/components/DecryptReveal";
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
import TrackClicks from "@/components/TrackClicks";
import TerminalEgg from "@/components/TerminalEgg";

export default function Home() {
  return (
    <Preloader>
      <Frame>
        <div id="top" className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <BentoCard delay={0} id="about" track="hero" className="md:col-span-3">
            <HeroCard />
          </BentoCard>
          <BentoCard delay={0.08} track="location">
            <MapCard />
          </BentoCard>
          <BentoCard delay={0.14} track="stack" className="md:col-span-2">
            <StackCard />
          </BentoCard>
          <BentoCard delay={0.2} id="work" track="work" className="md:col-span-3 cv-auto">
            <WorkSection />
          </BentoCard>
          {/* Wraps the whole section so the cipher covers the card as an
              object — border and rounded edge included. It cannot live inside
              BentoCard: overflow-hidden clips at the padding box, so a child
              canvas can never paint over the border. The hover lift is off
              here because the section would slide out from under the overlay
              exactly while the effect is running. */}
          <DecryptReveal
            className="md:col-span-2"
            radius={165}
            cell={8}
            // a wide feather on a card this short leaves most of it only
            // half-decrypted, which smears glyphs over the real text; keep a
            // solid readable core and let edgeWidth carry the flicker
            softness={0.3}
            colored={0.15}
            scramble={0.12}
            scrambleSpeed={5}
            edgeGlow={2}
            edgeTint={0.85}
            passthrough={0}
            smoothing={0.14}
          >
            <BentoCard
              delay={0.26}
              id="contact"
              track="contact"
              lift={false}
              className="h-full cv-auto"
            >
              <ContactCard />
            </BentoCard>
          </DecryptReveal>
          <BentoCard delay={0.3} track="spotify" className="cv-auto">
            <SpotifyCard />
          </BentoCard>
        </div>
      </Frame>
      <Footer />
      <Taskbar />
      <OnekoLazy />
      <CommandPalette />
      <TrackClicks />
      <TerminalEgg />
    </Preloader>
  );
}
