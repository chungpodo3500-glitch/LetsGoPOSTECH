import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const nav = [
  ["/issues", "호별 아카이브"],
  ["/puzzle", "십자말풀이"],
  ["/directory", "교수·연구실"],
  ["/about", "소개"],
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [path, setPath] = useLocation();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = search.trim();
    if (q) {
      setPath(`/search?q=${encodeURIComponent(q)}`);
      setMobileSearchOpen(false);
    }
  };
  return <div className="site-shell">
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="POSTECHIAN 아카이브 홈">
          <span className="brand-mark"><img src="/brand-mark.svg" alt="" /></span>
          <span><strong>POSTECHIAN</strong><small>ENGINEERING ARCHIVE</small></span>
        </Link>
        <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="주 메뉴">
          {nav.map(([href, label]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={path.startsWith(href) ? "active" : ""}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <form className={`nav-search ${mobileSearchOpen ? "is-open" : ""}`} onSubmit={submit}>
            <button className="nav-search-icon" type="button" aria-label={mobileSearchOpen ? "검색창 닫기" : "검색창 열기"} onClick={() => setMobileSearchOpen(!mobileSearchOpen)}><Search size={16} aria-hidden="true" /></button>
            <input aria-label="기사, 교수, 연구실 검색" value={search} onChange={e => setSearch(e.target.value)} placeholder="기사·교수·연구실 검색" />
            <button className="nav-search-submit" type="submit" aria-label="검색"><ArrowRight size={15} /></button>
          </form>
          <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={theme === "dark" ? "라이트 모드" : "다크 모드"}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
    <main>{children}</main>
    <footer className="site-footer">
      <div className="footer-inner"><div className="footer-brand"><span className="brand-mark"><img src="/brand-mark.svg" alt="" /></span><strong>POSTECHIAN ARCHIVE</strong></div><p>포항공과대학교 이공계 진로 설계 안내서, 178호–188호를 읽고 탐색하는 아카이브</p><div className="footer-links"><Link href="/issues">전체 호 보기</Link><Link href="/puzzle">퍼즐 답안</Link><Link href="/about">아카이브 안내</Link></div><small>기사 요약과 이미지의 출처는 각 호의 POSTECHIAN 원문입니다.</small></div>
    </footer>
  </div>;
}
