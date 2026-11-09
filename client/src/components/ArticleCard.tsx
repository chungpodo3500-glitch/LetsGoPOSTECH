import { Link } from "wouter";
import { ArrowUpRight, BookOpen } from "lucide-react";
import type { MagazineArticle } from "@/types/magazine";

export function ArticleCard({ article, compact = false }: { article: MagazineArticle; compact?: boolean }) {
  const image = article.images?.[0];
  return <Link href={`/article/${encodeURIComponent(article.id)}`} className={`article-card ${compact ? "compact" : ""}`}>
    {image && <div className="article-image"><img src={image.src} alt={image.alt || article.headline} loading="lazy" /><span>{image.caption}</span></div>}
    <div className="article-card-body">
      <div className="article-meta"><span className="section-label">{article.section}</span><span>NO.{article.issueNumber}</span></div>
      <h3>{article.headline}</h3>
      <p className="article-excerpt">{article.summary?.[0] || "이 기사에 관한 요약 정보를 확인하세요."}</p>
      {(article.professors?.length || article.labs?.length) ? <div className="entity-tags">{article.professors?.map(p => <span key={p} className="entity-tag">{p}</span>)}{article.labs?.map(l => <span key={l} className="entity-tag lab-tag"><BookOpen size={12} />{l}</span>)}</div> : null}
      <div className="article-card-bottom"><span className="keyword-row">{article.keyConcepts.slice(0, 3).map(k => <i key={k}>{k}</i>)}</span><span className="read-arrow"><ArrowUpRight size={18} /></span></div>
    </div>
  </Link>;
}
