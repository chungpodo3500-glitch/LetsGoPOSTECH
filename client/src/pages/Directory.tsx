import { useMemo, useState } from "react";
import { Link } from "wouter";
import { BookOpen, Search, UserRound } from "lucide-react";
import { articles, DEPARTMENTS, LABS, PROFESSORS } from "@/data/magazineData";

export default function DirectoryPage() {
  const [tab, setTab] = useState<"people"|"labs"|"departments">("people");
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("전체 학과");
  const filteredProfessors = useMemo(() => PROFESSORS.filter(n => n.toLowerCase().includes(query.toLowerCase()) && articles.some(a => (a.professors || []).includes(n) && (department === "전체 학과" || a.department === department))), [query, department]);
  const filteredLabs = LABS.filter(n => n.toLowerCase().includes(query.toLowerCase()) && articles.some(a => (a.labs || []).includes(n) && (department === "전체 학과" || a.department === department)));
  const filteredDepts = DEPARTMENTS.filter(n => n.toLowerCase().includes(query.toLowerCase()));
  const items = tab === "people" ? filteredProfessors : tab === "labs" ? filteredLabs : filteredDepts;
  return <div className="page-wrap directory-page"><div className="page-kicker">PEOPLE & PLACES <span>INDEX</span></div><div className="page-title-row"><div><h1>연구를 이끄는 <em>이름들</em></h1><p>기사에 등장하는 교수님, 연구실, 학과 정보를 원문 표기 그대로 찾아봅니다.</p></div><span className="issue-count">{items.length.toString().padStart(2,"0")}<small>ENTRIES</small></span></div>
    <div className="directory-toolbar"><div className="directory-tabs"><button className={tab === "people" ? "selected" : ""} onClick={() => setTab("people")}><UserRound size={15} /> 교수·인물</button><button className={tab === "labs" ? "selected" : ""} onClick={() => setTab("labs")}><BookOpen size={15} /> 연구실</button><button className={tab === "departments" ? "selected" : ""} onClick={() => setTab("departments")}>학과</button></div><div className="directory-filters"><label className="filter-search"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="이름·연구실 검색" /></label>{tab !== "departments" && <select value={department} onChange={e => setDepartment(e.target.value)} aria-label="학과 필터"><option>전체 학과</option>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</select>}</div></div>
    <div className="directory-list">{items.map((name, i) => { const related = articles.filter(a => tab === "people" ? (a.professors || []).includes(name) : tab === "labs" ? (a.labs || []).includes(name) : a.department === name); return <section className="directory-entry" key={name}><div className="directory-entry-index">{String(i+1).padStart(2,"0")}</div><div className="directory-entry-main"><span className="directory-kind">{tab === "people" ? "PROFESSOR / INTERVIEW" : tab === "labs" ? "RESEARCH LAB" : "DEPARTMENT"}</span><h2>{name}</h2><div className="directory-related">{related.map(a => <Link key={a.id} href={`/article/${encodeURIComponent(a.id)}`}>제{a.issueNumber}호 · {a.headline}</Link>)}</div></div><span className="directory-count">{related.length} ARTICLES</span></section>; })}</div>{!items.length && <div className="empty-state">검색 결과가 없습니다.</div>}<p className="directory-note">원문 기사에서 확인 가능한 이름만 색인했습니다. 각 항목을 선택하면 관련 기사로 이동합니다.</p>
  </div>;
}
