import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import { articles, issues } from "@/data/magazineData";
import { ArticleCard } from "@/components/ArticleCard";
import NotFound from "@/pages/NotFound";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find(a => a.id === decodeURIComponent(id || ""));
  if (!article) return <NotFound />;
  const issue = issues.find(i => i.number === article.issueNumber)!;
  const related = articles.filter(a => a.issueNumber === article.issueNumber && a.id !== article.id).slice(0, 3);
  return <article className="article-detail page-wrap">
    <Link href={`/issue/${article.issueNumber}`} className="back-link"><ArrowLeft size={16} /> 제{article.issueNumber}호로 돌아가기</Link>
    <header className="article-detail-header"><div className="article-meta"><span className="section-label">{article.section}</span><span>NO.{article.issueNumber} · {issue.year} {issue.season}</span></div><h1>{article.headline}</h1><p className="article-lede">{article.summary?.[0]}</p><div className="article-people">{article.professors?.map(p => <span className="person-chip" key={p}><span>교수·인물</span>{p}</span>)}{article.labs?.map(l => <span className="person-chip" key={l}><BookOpen size={14} /><span>연구실</span>{l}</span>)}{article.department && <span className="department-chip">{article.department}</span>}{article.author && <span className="department-chip">{article.author}</span>}</div></header>
    <div className="article-detail-layout"><div className="article-body">{article.images?.length ? <figure className="article-main-image"><img src={article.images[0].src} alt={article.images[0].alt || article.headline} /><figcaption>{article.images[0].caption}</figcaption></figure> : <div className="article-visual-placeholder"><span>POSTECHIAN · {article.issueNumber}</span><strong>{article.section}</strong></div>}
      <div className="summary-label"><span>01</span><strong>기사 요약</strong><small>원문 내용을 바탕으로 핵심을 정리했습니다</small></div>{article.summary.map((p, i) => <p className="article-paragraph" key={i}>{p}</p>)}
      {article.images && article.images.length > 1 && <div className="article-image-gallery">{article.images.slice(1).map(img => <figure key={img.src}><img src={img.src} alt={img.alt || article.headline} loading="lazy" /><figcaption>{img.caption}</figcaption></figure>)}</div>}
      <div className="concept-panel"><strong>핵심 키워드</strong><div>{article.keyConcepts.map(k => <span key={k}>{k}</span>)}</div></div>
    </div><aside className="article-aside"><div className="aside-card"><small>ISSUE</small><strong>NO.{issue.number}</strong><span>{issue.year} · {issue.season}</span><Link href={`/issue/${issue.number}`}>이 호의 기사 <ArrowRight size={15} /></Link></div><div className="aside-note"><CalendarDays size={17} /><p>원문 헤드라인은 목차 표기를 따릅니다. 요약은 원문 기사를 바탕으로 읽기 쉽게 정리했습니다.</p></div></aside></div>
    <section className="related-section"><div className="section-heading"><div><span className="eyebrow">MORE FROM NO.{issue.number}</span><h2>같은 호의 <em>기사</em></h2></div><Link href={`/issue/${issue.number}`} className="text-link">모두 보기 <ArrowRight size={16} /></Link></div><div className="article-grid">{related.map(a => <ArticleCard key={a.id} article={a} compact />)}</div></section>
  </article>;
}
