import { Link } from "wouter";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { articles, searchArticles } from "@/data/magazineData";
import { ArticleCard } from "@/components/ArticleCard";

export default function SearchPage() {
  const query = new URLSearchParams(window.location.search).get("q") || "";
  const results = searchArticles(query);
  return <div className="page-wrap"><Link href="/" className="back-link"><ArrowLeft size={16} /> 홈으로</Link><div className="page-kicker">SEARCH THE ARCHIVE</div><div className="page-title-row"><div><h1>검색 <em>결과</em></h1><p>헤드라인, 요약, 교수님·연구실 이름, 키워드에서 검색했습니다.</p></div><span className="issue-count">{query ? results.length : articles.length}<small>RESULTS</small></span></div><div className="search-result-query"><SearchIcon size={17} /><span>“{query || "전체 기사"}”</span></div>{results.length ? <div className="article-grid">{results.map(a => <ArticleCard key={a.id} article={a} />)}</div> : <div className="empty-state">검색 결과가 없습니다. 다른 키워드로 다시 검색해 보세요.</div>}</div>;
}
