import About from "@/components/About";
import Folders from "@/components/Folders";
import Hero from "@/components/Hero";
import Layers from "@/components/Layers";
import Process from "@/components/Process";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <Nav home />
      <main id="main">
        <Hero />
        <About />
        <Layers />
        <Process />
        <Folders />
      </main>
      <SmoothScroll scene="home" />
    </>
  );
}
