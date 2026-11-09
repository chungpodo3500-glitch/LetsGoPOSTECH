import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { articles, issues } from "@/data/magazineData";
import { ArticleCard } from "@/components/ArticleCard";
import NotFound from "@/pages/NotFound";

export default function IssueDetail() {
  const { id } = useParams<{ id: string }>();
  const issue = issues.find(i => i.number === Number(id));
  if (!issue) return <NotFound />;
  const storyList = articles.filter(a => a.issueNumber === issue.number);
  return <div className="page-wrap issue-detail-page">
    <Link href="/issues" className="back-link"><ArrowLeft size={16} /> 전체 호 아카이브</Link>
    <section className="issue-hero">
      <div className="issue-cover-large"><img src={`/images/covers/cover_${issue.number}.webp`} alt={`POSTECHIAN 제${issue.number}호 표지`} /><span>NO.{issue.number}</span></div>
      <div className="issue-intro">
        <div className="page-kicker">POSTECHIAN ARCHIVE · {issue.year}</div>
        <h1>{issue.editorialTheme.replace(/^기획특집:\s*/, "")}<em>.</em></h1>
        <div className="issue-intro-meta"><span>{issue.season}</span><span><CalendarDays size={15} /> {issue.publishDate}</span><span>{storyList.length} ARTICLES</span></div>
        <p className="issue-featured-title"><small>이 호의 중심 기사</small>{issue.featuredArticle}</p>
        <div className="issue-actions"><Link href="/puzzle" className="button-primary">이 호 퍼즐 풀기 <ArrowRight size={16} /></Link><Link href="/about" className="button-outline">자료·요약 안내</Link></div>
      </div>
    </section>
    <div className="section-heading issue-stories-heading"><div><span className="eyebrow">IN THIS ISSUE · NO.{issue.number}</span><h2>이 호의 <em>이야기들</em></h2></div><span className="issue-count">{storyList.length.toString().padStart(2,"0")} <small>STORIES</small></span></div>
    <div className="article-grid">{storyList.map(a => <ArticleCard key={a.id} article={a} />)}</div>
    <div className="issue-next-prev">{issue.number > 178 && <Link href={`/issue/${issue.number - 1}`}><ArrowLeft size={16} /> {issue.number - 1}호</Link>}<Link href="/issues">전체 호 목록</Link>{issue.number < 188 && <Link href={`/issue/${issue.number + 1}`}>{issue.number + 1}호 <ArrowRight size={16} /></Link>}</div>
  </div>;
}
