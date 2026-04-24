"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { navGroups } from "@/lib/docPages";
import Footer from "./DocFooter";

export default function DocShell({ children }) {
  const pathname = usePathname();
  const currentSlug =
    pathname === "/docs" || pathname === "/docs/"
      ? "introduction"
      : pathname.replace(/^\/docs\//, "");

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [rnavItems, setRnavItems] = useState([]);
  const [activeHash, setActiveHash] = useState(null);
  const mainRef = useRef(null);

  // Build right-side TOC from the active page's h2/h3 elements
  useEffect(() => {
    if (!mainRef.current) return;
    const headings = Array.from(
      mainRef.current.querySelectorAll("h2[id], h3[id]")
    ).map((h) => ({ id: h.id, text: h.textContent, tag: h.tagName }));
    setRnavItems(headings);
    window.scrollTo({ top: 0 });
  }, [currentSlug]);

  // Wrap each <img> in a skeleton loader until it's ready
  useEffect(() => {
    if (!mainRef.current) return;
    const imgs = Array.from(mainRef.current.querySelectorAll("img"));
    imgs.forEach((img) => {
      if (img.dataset.loadingWired === "1") return;
      img.dataset.loadingWired = "1";
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add("img-loaded");
        return;
      }
      img.classList.add("img-loading");
      const onLoad = () => {
        img.classList.remove("img-loading");
        img.classList.add("img-loaded");
      };
      const onError = () => {
        img.classList.remove("img-loading");
        img.classList.add("img-error");
      };
      img.addEventListener("load", onLoad, { once: true });
      img.addEventListener("error", onError, { once: true });
    });
  }, [currentSlug]);

  // Track which right-nav heading is active on scroll
  useEffect(() => {
    function onScroll() {
      if (!mainRef.current) return;
      const headings = Array.from(
        mainRef.current.querySelectorAll("h2[id], h3[id]")
      );
      if (!headings.length) return;
      const threshold = 100;
      let current = headings[0];
      for (const h of headings) {
        if (h.getBoundingClientRect().top - threshold <= 0) current = h;
      }
      setActiveHash(current.id);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [rnavItems]);

  // Lock body scroll when menu or search is open on mobile
  useEffect(() => {
    const lock = menuOpen || searchOpen;
    document.documentElement.classList.toggle("no-scroll", lock);
    document.body.classList.toggle("no-scroll", lock);
  }, [menuOpen, searchOpen]);


  const allItems = navGroups.flatMap((g) =>
    g.items.map((i) => ({ ...i, grp: g.label }))
  );
  const q = query.trim().toLowerCase();
  const searchHits = !q
    ? allItems
    : allItems.filter(
        (i) =>
          i.title.toLowerCase().includes(q) || i.grp.toLowerCase().includes(q)
      );

  return (
    <>
      <div className="topbar">
        <a href="/" className="topbar-logo">
          <img src="/icon-transparent.png" alt="Arcana Mace" />
          Arcana Mace
        </a>
        <div className="topbar-sep"></div>
        <div className="topbar-product">Capabilities</div>
        <div className="topbar-right">
          <input
            className="topbar-search"
            type="text"
            placeholder="Search capabilities…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="layout">
        <nav className={`lnav${menuOpen ? " open" : ""}`}>
          <div className="lnav-search-wrap">
            <input
              className="lnav-search"
              type="text"
              placeholder="Search capabilities…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {navGroups.map((group) => (
            <div key={group.label} className="lnav-group">
              <div className="lnav-group-label">{group.label}</div>
              {group.items
                .filter(
                  (item) =>
                    !q ||
                    item.title.toLowerCase().includes(q) ||
                    group.label.toLowerCase().includes(q)
                )
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/docs/${item.slug}`}
                    className={`lnav-item${
                      currentSlug === item.slug ? " active" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          ))}
        </nav>

        <main className="main" ref={mainRef}>
          {children}
        </main>

        <aside className="rnav">
          <div className="rnav-title">On this page</div>
          <div>
            {rnavItems.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                className={`rnav-item${h.tag === "H3" ? " sub" : ""}${
                  activeHash === h.id ? " active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(h.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {h.text}
              </a>
            ))}
          </div>
        </aside>
      </div>

      <Footer />

      <div
        className={`nav-backdrop${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>
      <div className="mobile-fab">
        <button
          className="fab-btn"
          id="fab-menu"
          aria-label="Menu"
          onClick={() => {
            setSearchOpen(false);
            setMenuOpen((v) => !v);
          }}
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
        <button
          className="fab-btn"
          id="fab-search"
          aria-label="Search"
          onClick={() => {
            setMenuOpen(false);
            setSearchOpen((v) => !v);
          }}
        >
          {searchOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          )}
        </button>
      </div>

      <div className={`search-overlay${searchOpen ? " open" : ""}`}>
        <div className="search-overlay-wrap">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            className="search-overlay-input"
            type="text"
            placeholder="Search documentation"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus={searchOpen}
          />
        </div>
        <div className="search-overlay-results">
          {searchHits.length === 0 ? (
            <div className="search-overlay-empty">No matches</div>
          ) : (
            searchHits.map((h) => (
              <Link
                key={h.slug}
                href={`/docs/${h.slug}`}
                className="search-overlay-result"
                onClick={() => {
                  setSearchOpen(false);
                  setQuery("");
                }}
              >
                <span className="grp">{h.grp}</span>
                {h.title}
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
