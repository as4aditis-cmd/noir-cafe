import { HeroSection } from '@/components/sections/HeroSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { SignatureDrinksSection } from '@/components/sections/SignatureDrinksSection';
import { OriginsSection } from '@/components/sections/OriginsSection';
import { MenuSection } from '@/components/sections/MenuSection';
import { AtmosphereSection } from '@/components/sections/AtmosphereSection';
import { ReservationSection } from '@/components/sections/ReservationSection';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

export default function Home() {
  return (
    <main className="relative bg-obsidian overflow-hidden">
      <Navbar />
      <HeroSection />
      <PhilosophySection />
      <SignatureDrinksSection />
      <OriginsSection />
      <MenuSection />
      <AtmosphereSection />
      <ReservationSection />
      <Footer />
    </main>
  );
}
