import { Link } from "wouter";
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, GraduationCap, Layers3, Search } from "lucide-react";
import { articles, getFeaturedArticles, issues } from "@/data/magazineData";
import { ArticleCard } from "@/components/ArticleCard";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const latest = issues.find(i => i.number === 188)!;
  const picks = getFeaturedArticles().filter(a => [188, 187, 186].includes(a.issueNumber)).slice(-6).reverse();
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (query.trim()) window.location.href = `/search?q=${encodeURIComponent(query.trim())}`; };
  return <>
    <section className="hero-section">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> 포항공과대학교 이공계 진로 설계 안내서</div>
        <h1>공학의 다음 장을<br /><em>읽다.</em></h1>
        <p className="hero-lead">POSTECHIAN 178호부터 188호까지.<br />연구와 사람, 아이디어가 담긴 4년의 기록을 한곳에서 탐색하세요.</p>
        <form className="hero-search" onSubmit={submit}><Search size={19} /><input aria-label="아카이브 검색" value={query} onChange={e => setQuery(e.target.value)} placeholder="기사 제목, 교수님 이름, 연구실 검색" /><button type="submit">검색 <ArrowRight size={16} /></button></form>
        <div className="hero-stats"><div><strong>11</strong><span>ISSUES</span></div><div><strong>{articles.length}</strong><span>STORIES</span></div><div><strong>4</strong><span>YEARS</span></div><Link href="/issues">아카이브 둘러보기 <ArrowDown size={15} /></Link></div>
      </div>
      <div className="hero-art">
        <div className="hero-index">ARCHIVE<br /><b>2023 — 2026</b></div>
        <div className="cover-stack"><img src="/images/covers/cover_188.webp" alt="POSTECHIAN 제188호 표지" /><span className="cover-stamp">NO.188<br />2026</span></div>
        <div className="hero-caption"><span>NEWEST ISSUE</span><strong>{latest.editorialTheme.replace(/^기획특집:\s*/, "")}</strong><small>제{latest.number}호 · {latest.year} {latest.season}</small></div>
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      </div>
      <div className="hero-side-note">SCIENCE · ENGINEERING · PEOPLE</div>
    </section>

    <section className="section-wrap latest-strip">
      <div className="section-heading"><div><span className="eyebrow">THE COLLECTION</span><h2>한눈에 보는 <em>아카이브</em></h2></div><Link href="/issues" className="text-link">전체 호 보기 <ArrowUpRight size={17} /></Link></div>
      <div className="collection-stats"><div className="collection-intro"><span className="big-number">04</span><div><strong>네 해의 기록</strong><p>2023년 봄부터 2026년 가을까지<br />11개 호의 기사를 한 번에 검색하고 읽어보세요.</p></div></div><div className="year-ruler">{[2023,2024,2025,2026].map((year, i) => <Link href={`/issues?year=${year}`} key={year}><span className="ruler-dot" /> <strong>{year}</strong><small>{[3,4,2,2][i]}권</small></Link>)}</div></div>
    </section>

    <section className="section-wrap issue-shelf-section"><div className="section-heading"><div><span className="eyebrow">ISSUE SHELF</span><h2>표지로 넘기는 <em>계절</em></h2></div><Link href="/issues" className="text-link">모든 호 살펴보기 <ArrowRight size={16} /></Link></div><div className="issue-shelf">{issues.slice().reverse().slice(0,6).map((issue, idx) => <Link href={`/issue/${issue.number}`} className={`shelf-item shelf-${idx}`} key={issue.number}><div className="shelf-cover"><img src={`/images/covers/cover_${issue.number}.webp`} alt={`POSTECHIAN ${issue.number}호 표지`} loading="lazy" /><span className="shelf-number">{issue.number}</span></div><div className="shelf-meta"><strong>{issue.year} <span>{issue.season}</span></strong><small>NO. {issue.number}</small></div></Link>)}</div></section>

    <section className="feature-band"><div className="feature-band-inner"><div><span className="eyebrow light">EDITOR’S SELECTION</span><h2>기술을 만든 사람,<br />질문에서 시작된 연구.</h2><p>교수님과 연구실, 동문과 학생의 이야기를<br />원문 헤드라인 그대로 찾아보세요.</p><Link href="/directory" className="button-light">사람과 연구실 찾기 <ArrowRight size={16} /></Link></div><div className="feature-ornament"><div className="orbit-circle"><GraduationCap size={38} /><span>PEOPLE</span></div><div className="orbit-label">RESEARCH<br />×<br />CURIOSITY</div></div></div></section>

    <section className="section-wrap featured-section"><div className="section-heading"><div><span className="eyebrow">READ THE STORY</span><h2>놓치지 말아야 할 <em>기사</em></h2></div><Link href="/issues" className="text-link">기사 전체 보기 <ArrowRight size={16} /></Link></div><div className="article-grid">{picks.map(a => <ArticleCard key={a.id} article={a} />)}</div></section>

    <section className="puzzle-promo"><div className="puzzle-promo-grid"><div className="puzzle-mini"><img src="/images/puzzles/puzzle_188.webp" alt="제188호 십자말풀이 원본" loading="lazy" /></div><div className="puzzle-promo-copy"><span className="eyebrow">A LITTLE CHALLENGE</span><h2>읽고, 풀고,<br /><em>다시 발견하다.</em></h2><p>각 호의 기사에서 출제된 과학·공학 십자말풀이를 모았습니다. 문제를 먼저 풀어본 뒤 정답을 확인해 보세요.</p><Link href="/puzzle" className="text-link">퍼즐 답안 열기 <ArrowUpRight size={17} /></Link></div><div className="puzzle-number"><span>PUZZLE</span><strong>11</strong><small>ISSUES</small></div></div></section>
    <div className="home-bottom-note"><Layers3 size={16} /> 원문 헤드라인을 유지하고, 기사 내용을 요약해 제공합니다.</div>
  </>;
}
