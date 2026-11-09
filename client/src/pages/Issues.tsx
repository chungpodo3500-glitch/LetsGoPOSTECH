import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import { issues, articles } from "@/data/magazineData";

export default function Issues() {
  const [, setLocation] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const [year, setYear] = useState(params.get("year") || "전체");
  const [query, setQuery] = useState(params.get("q") || "");
  const visible = useMemo(() => issues.filter(i => (year === "전체" || String(i.year) === year) && (!query || `${i.title} ${i.editorialTheme} ${i.featuredArticle}`.toLowerCase().includes(query.toLowerCase()))), [year, query]);
  return <div className="page-wrap">
    <div className="page-kicker">THE COMPLETE COLLECTION <span>178—188</span></div>
    <div className="page-title-row"><div><h1>호별 <em>아카이브</em></h1><p>계절의 주제와 함께 읽는 POSTECHIAN의 11개 호.</p></div><span className="issue-count">{visible.length.toString().padStart(2,"0")} <small>ISSUES</small></span></div>
    <div className="filter-bar"><div className="year-tabs">{["전체","2023","2024","2025","2026"].map(y => <button key={y} className={year === y ? "selected" : ""} onClick={() => setYear(y)}>{y === "전체" ? y : `${y}년`}</button>)}</div><label className="filter-search"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="주제·기사 검색" /></label></div>
    <div className="issue-list">{visible.slice().reverse().map((issue, index) => {
      const count = articles.filter(a => a.issueNumber === issue.number).length;
      return <Link href={`/issue/${issue.number}`} className="issue-row" key={issue.number}><div className="issue-row-index">{String(index + 1).padStart(2,"0")}</div><div className="issue-row-cover"><img src={`/images/covers/cover_${issue.number}.webp`} alt={`제${issue.number}호 표지`} loading="lazy" /></div><div className="issue-row-info"><div className="issue-row-meta"><span>NO. {issue.number}</span><span>{issue.year} · {issue.season}</span></div><h2>{issue.editorialTheme.replace(/^기획특집:\s*/, "")}</h2><p>대표 기사 — {issue.featuredArticle}</p><div className="issue-row-bottom"><span>{count}개 기사 수록</span><span>{issue.publishDate}</span></div></div><ArrowRight className="issue-row-arrow" size={20} /></Link>;
    })}</div>
    {visible.length === 0 && <div className="empty-state">조건에 맞는 호가 없습니다. 검색어를 바꿔보세요.</div>}
    <div className="page-footnote">총 11개 호 · 2023–2026 · 원문 기사 헤드라인과 발행 정보를 기준으로 정리했습니다.</div>
  </div>;
}
