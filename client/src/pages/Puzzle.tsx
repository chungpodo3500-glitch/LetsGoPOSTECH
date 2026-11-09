import { useMemo, useState } from "react";
import { ChevronDown, Eye, EyeOff, Lightbulb, Search, Sparkles } from "lucide-react";
import { puzzles } from "@/data/puzzlesData";
import type { PuzzleClue } from "@/types/magazine";

export default function PuzzlePage() {
  const [issueNum, setIssueNum] = useState(188);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const puzzle = puzzles.find(p => p.issueNumber === issueNum) || puzzles[puzzles.length - 1];
  const clues = useMemo(() => {
    const q = search.trim().replace(/\s/g, "").toLowerCase();
    const filter = (list: PuzzleClue[]) => q ? list.filter(c => `${c.clue}${c.answer}${c.number}`.replace(/\s/g, "").toLowerCase().includes(q)) : list;
    return { across: filter(puzzle.horizontalClues), down: filter(puzzle.verticalClues) };
  }, [puzzle, search]);
  const isOpen = (key: string) => showAll || Boolean(revealed[key]);
  const toggleAnswer = (key: string) => setRevealed(prev => ({ ...prev, [key]: !prev[key] }));
  return <div className="page-wrap puzzle-page">
    <div className="page-kicker">SCIENCE × WORDPLAY <span>178—188</span></div>
    <div className="page-title-row"><div><h1>알리미가 쏜다!<br /><em>퍼즐 답안</em></h1><p>먼저 풀어보고, 막히면 한 문제씩 정답을 열어보세요.</p></div><div className="puzzle-mark"><Sparkles size={19} /><span>11 ISSUES</span></div></div>
    <div className="puzzle-controls"><div className="puzzle-issue-select" role="tablist" aria-label="호 선택">{puzzles.map(p => <button key={p.issueNumber} className={issueNum === p.issueNumber ? "selected" : ""} onClick={() => {setIssueNum(p.issueNumber);setShowAll(false);setRevealed({});}}>{p.issueNumber}</button>)}</div><div className="puzzle-control-right"><label className="filter-search"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="문제·정답 검색" /></label><button className="reveal-all" onClick={() => setShowAll(!showAll)}>{showAll ? <EyeOff size={16} /> : <Eye size={16} />}{showAll ? "정답 가리기" : "정답 모두 보기"}</button></div></div>
    <section className="puzzle-issue-heading"><div><span className="section-label">NO. {puzzle.issueNumber} · {puzzle.year} {puzzle.season}</span><h2>가로와 세로, <em>교차하는 지식</em></h2><p>정답은 원문에 제시된 용어 표기를 기준으로 정리했습니다.</p></div><span className="deadline-chip">{puzzle.deadline ? `응모 마감 ${puzzle.deadline}` : "원문 퍼즐 아카이브"}</span></section>
    <div className="puzzle-layout"><figure className="puzzle-original"><div className="puzzle-image-frame"><img src={puzzle.puzzleImage} alt={`POSTECHIAN 제${puzzle.issueNumber}호 십자말풀이 원본 페이지`} /></div><figcaption><span>ORIGINAL PAGE</span> 제{puzzle.issueNumber}호 퍼즐 원본</figcaption></figure><div className="clue-columns"><ClueList title="가로" label="ACROSS" clues={clues.across} open={isOpen} toggle={toggleAnswer} direction="A" /><ClueList title="세로" label="DOWN" clues={clues.down} open={isOpen} toggle={toggleAnswer} direction="D" /></div></div>
    {puzzle.tips?.length ? <div className="puzzle-tip"><Lightbulb size={19} /><div><strong>풀이 메모</strong><p>{puzzle.tips.join(" ")}</p></div></div> : null}
    <div className="puzzle-note">정답이 원문 기사 내용과 대조되어 정리되었습니다. 스캔된 십자말풀이의 일부 기호·글자 수는 인쇄 해상도에 따라 다르게 읽힐 수 있습니다.</div>
  </div>;
}

function ClueList({ title, label, clues, open, toggle, direction }: {title:string;label:string;clues:PuzzleClue[];open:(key:string)=>boolean;toggle:(key:string)=>void;direction:string}) {
  return <section className="clue-list"><div className="clue-list-heading"><div><span>{label}</span><h3>{title}</h3></div><small>{clues.length} CLUES</small></div>{clues.length ? clues.map(clue => { const key = `${direction}-${clue.number}`; const visible = open(key); return <div className={`clue-item ${visible ? "answer-open" : ""}`} key={key}><span className="clue-number">{clue.number}</span><div className="clue-content"><p>{clue.clue}</p><div className="answer-line"><span className={visible ? "answer-text revealed" : "answer-text"}>{visible ? clue.answer : "정답을 가렸습니다"}</span><button onClick={() => toggle(key)} aria-label={visible ? `${clue.number}번 답 숨기기` : `${clue.number}번 답 보기`}>{visible ? <EyeOff size={15} /> : <Eye size={15} />}{visible ? "숨기기" : "답 보기"}</button></div></div></div>; }) : <p className="no-clues">일치하는 문제가 없습니다.</p>}</section>;
}
