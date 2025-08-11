export default function Navigation() {
  return (
    <>
      {/* About (left) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="tracking-[0.25em] text-text/80">ABOUT</span>
      </div>

      {/* Contact (right) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="tracking-[0.25em] text-text/80">CONTACT</span>
      </div>
    </>
  );
}
