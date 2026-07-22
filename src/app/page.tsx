"use client";

import { useRef } from "react";
import PetalField from "@/components/PetalField";
import ConfettiCanvas, { ConfettiHandle } from "@/components/ConfettiCanvas";
import Loader from "@/components/Loader";
import SiteControls from "@/components/SiteControls";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import SectionDivider from "@/components/SectionDivider";
import Message from "@/components/Message";
import EventDetails from "@/components/EventDetails";
import Countdown from "@/components/Countdown";
import WorksDone from "@/components/WorksDone";
import ChinaEvents from "@/components/ChinaEvents";
import HighlightVideo from "@/components/HighlightVideo";
import Gallery from "@/components/Gallery";
import WishesWall from "@/components/WishesWall";
import HostedBy from "@/components/HostedBy";
import Quote from "@/components/Quote";
import Closing from "@/components/Closing";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  const confettiRef = useRef<ConfettiHandle>(null);

  return (
    <>
      <ScrollProgress />
      <SiteControls />
      <PetalField />
      <ConfettiCanvas ref={confettiRef} />
      <Loader onDone={() => confettiRef.current?.burst()} />

      <Hero />

      <SectionDivider icon="✿" />
      <Message />

      <SectionDivider icon="⏳" />
      <Countdown />

      <SectionDivider icon="學" />
      <EventDetails />

      <SectionDivider icon="職" />
      <WorksDone />

      <SectionDivider icon="囍" />
      <ChinaEvents />

      <SectionDivider icon="✿" />
      <HighlightVideo />

      <SectionDivider icon="✿" />
      <Gallery />

      <SectionDivider icon="✿" />
      <WishesWall />

      <SectionDivider icon="囍" />
      <HostedBy />

      <Quote />

      <Closing />

      <SiteFooter />
    </>
  );
}
