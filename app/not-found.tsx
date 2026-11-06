import Button from "@/components/Button";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";

export default function NotFound() {
  return (
    <>
    <Nav />
    <main id="main" style={{ minHeight: "100svh", display: "grid", placeContent: "center", gap: "2rem", padding: "var(--gutter)", textAlign: "center", justifyItems: "center" }}>
      <h1 className="giant" style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}>
        <span>File not found.</span>
      </h1>
      <p style={{ color: "var(--paper-60)" }}>That folder was moved or never existed. The work is still here.</p>
      <Button href="/#work">Open the work</Button>
    </main>
    <SmoothScroll />
    </>
  );
}
