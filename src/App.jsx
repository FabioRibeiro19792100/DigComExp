import { useEffect, useMemo, useRef, useState } from "react";
import {
  ICONS,
  INITIAL_WEEK_DATA,
  originalStyles,
} from "./lib/originalPlan.js";
import { getLocaleBundle } from "./lib/i18n.js";
import { PLAN_SLUG, hasSupabase, loadRemotePlanState, saveRemotePlanState } from "./lib/supabase.js";
import { loadLocalPlanState, saveLocalPlanState } from "./lib/storage.js";

const APP_OVERRIDES = `
@media(min-width:961px){
  .topbar,.prog-hd,.prog-wrap{
    padding-left:88px;
    padding-right:88px;
  }
}

@media(min-width:1280px){
  .topbar,.prog-hd,.prog-wrap{
    padding-left:104px;
    padding-right:104px;
  }
}

.topbar{
  gap:14px;
  justify-content:space-between;
}

.topbar-inner{
  display:flex;
  align-items:center;
  gap:14px;
  min-width:0;
  width:100%;
}

.topbar-actions{
  display:flex;
  align-items:center;
  gap:10px;
  margin-left:auto;
  flex-shrink:0;
}

.locale-switcher{
  display:flex;
  gap:6px;
  flex-wrap:wrap;
  justify-content:flex-end;
}

.brand{
  min-width:0;
}

.brand-logo{
  height:26px;
  width:auto;
  opacity:.82;
  filter:saturate(.92);
  flex-shrink:0;
}

.prog-hd{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:20px;
}

.prog-head-main{
  min-width:0;
}

.prog-head-side{
  display:flex;
  align-items:center;
  justify-content:flex-end;
  flex-shrink:0;
}

.prog-logo{
  width:136px;
  max-width:24vw;
  height:auto;
  opacity:.24;
  filter:grayscale(.08);
}

.prog-wrap{
  -webkit-overflow-scrolling:touch;
}

.prog-mobile{
  display:none;
}

.prog-grid{
  min-width:880px;
}

.gcell{
  min-height:112px;
}

.gcell.phase-start{
  border-top-color:transparent!important;
}

@media(min-width:721px){
  .prog-grid{
    column-gap:6px;
    background:#fff;
  }

  .week-lbl{
    justify-content:flex-start;
    padding-top:26px;
  }
}

.cell-title{
  align-items:flex-start;
}

.cell-title .cell-icon{
  margin-top:0;
}

@media(max-width:960px){
  .topbar{
    height:auto;
    min-height:54px;
    padding-top:10px;
    padding-bottom:10px;
  }

  .topbar-inner{
    flex-wrap:wrap;
    align-items:flex-start;
  }

  .topbar-actions{
    width:100%;
    justify-content:space-between;
    margin-left:0;
  }

  .prog-hd{
    align-items:flex-start;
  }

  .prog-logo{
    width:110px;
    max-width:30vw;
  }
}

@media(max-width:720px){
  .topbar,.prog-hd,.prog-wrap{
    padding-left:16px;
    padding-right:16px;
  }

  .topbar{
    position:static;
  }

  .brand{
    font-size:12px;
    line-height:1.3;
    max-width:calc(100% - 44px);
  }

  .brand-logo{
    height:22px;
  }

  .topbar-actions{
    gap:8px;
    align-items:center;
  }

  .phase-chip{
    padding:5px 10px;
  }

  .locale-switcher{
    gap:5px;
  }

  .exec-btn,.change-btn,.remove-btn{
    padding:6px 10px;
  }

  .prog-hd{
    padding-top:22px;
    flex-direction:column;
    align-items:flex-start;
  }

  .prog-head-side{
    width:100%;
    justify-content:flex-start;
  }

  .prog-logo{
    width:96px;
    max-width:none;
    opacity:.18;
  }

  .prog-wrap{
    overflow-x:visible;
  }

  .prog-grid{
    display:none;
  }

  .prog-mobile{
    display:block;
  }

  .mobile-phase + .mobile-phase{
    margin-top:26px;
  }

  .mobile-phase-head{
    border:1px solid color-mix(in srgb,var(--phc) 16%,rgba(0,0,0,.06));
    background:linear-gradient(180deg,color-mix(in srgb,var(--phc) 6%,#fff),#fff 72%);
    border-radius:12px;
    padding:16px 14px;
    margin-bottom:14px;
    box-shadow:0 10px 24px -26px color-mix(in srgb,var(--phc) 38%,#000);
  }

  .mobile-phase-name{
    display:block;
    font-family:var(--display);
    font-weight:700;
    font-size:16px;
    letter-spacing:-.02em;
    color:var(--phc);
  }

  .mobile-phase-weeks{
    display:block;
    margin-top:4px;
    font-family:var(--mono);
    font-size:10px;
    letter-spacing:.08em;
    text-transform:uppercase;
    color:var(--phc);
    opacity:.75;
  }

  .mobile-phase-desc{
    margin-top:8px;
    font-size:13px;
    line-height:1.5;
    color:var(--muted);
  }

  .mobile-week + .mobile-week{
    margin-top:14px;
  }

  .mobile-week-head{
    width:100%;
    border:0;
    background:#f5f5f5;
    border-radius:12px;
    padding:14px 14px 12px;
    text-align:left;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
  }

  .mobile-week-main{
    min-width:0;
  }

  .mobile-week-title{
    display:flex;
    align-items:center;
    gap:8px;
    font-family:var(--display);
    font-weight:600;
    font-size:14px;
    letter-spacing:-.01em;
    color:var(--ink);
  }

  .mobile-week-dot{
    width:8px;
    height:8px;
    border-radius:999px;
    background:var(--pc);
    flex-shrink:0;
  }

  .mobile-week-note{
    margin-top:5px;
    font-size:12px;
    color:var(--muted);
  }

  .mobile-week-grid{
    display:grid;
    gap:10px;
    margin-top:10px;
  }

  .mobile-day-card{
    width:100%;
    border:1px solid rgba(0,0,0,.07);
    border-left:4px solid var(--dc);
    border-radius:14px;
    background:#fff;
    padding:14px 14px 13px;
    text-align:left;
    display:grid;
    gap:8px;
    box-shadow:0 10px 30px -24px rgba(0,0,0,.28);
  }

  .mobile-day-card.empty{
    background:var(--sf2);
    border-style:dashed;
    box-shadow:none;
  }

  .mobile-day-top{
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:10px;
  }

  .mobile-day-meta{
    min-width:0;
  }

  .mobile-day-name{
    display:block;
    font-family:var(--mono);
    font-size:9px;
    letter-spacing:.1em;
    text-transform:uppercase;
    color:var(--faint);
    opacity:.8;
  }

  .mobile-day-theme{
    display:none;
  }

  .mobile-day-action{
    font-family:var(--display);
    font-size:16px;
    font-weight:700;
    letter-spacing:-.02em;
    line-height:1.18;
    color:var(--ink);
  }

  .mobile-day-empty{
    font-size:12px;
    line-height:1.45;
    color:var(--muted);
  }

  .mobile-day-plus{
    width:28px;
    height:28px;
    border-radius:999px;
    border:1.5px solid var(--dc);
    color:var(--dc);
    display:grid;
    place-items:center;
    font-size:18px;
    line-height:1;
    flex-shrink:0;
  }

  .drawer{
    width:100%;
  }

  .dr-hd,.exec-bar,.dr-body{
    padding-left:18px;
    padding-right:18px;
  }

  .exec-bar{
    flex-wrap:wrap;
    row-gap:8px;
  }

  .exec-actions{
    width:100%;
    margin-left:0;
    justify-content:flex-end;
  }
}

@media(max-width:480px){
  .brand-logo{
    height:20px;
  }

  .brand{
    font-size:11px;
  }

  .phase-chip{
    font-size:9px;
  }

  .prog-title{
    line-height:1.06;
  }

  .mobile-day-card{
    padding:13px 13px 12px;
  }

  .mobile-day-action{
    font-size:15px;
  }

  .prog-grid{
    min-width:640px;
  }
}
`;

function cloneWeekData(source) {
  return JSON.parse(JSON.stringify(source));
}

function getPhase(week, phases) {
  return phases.find((phase) => week >= phase.r[0] && week <= phase.r[1]) || phases[0];
}

function getPhaseIndex(week, phases) {
  return phases.findIndex((phase) => week >= phase.r[0] && week <= phase.r[1]);
}

function getRecentTag(weekData, week, dayIndex, optionIndex, ui) {
  for (let previousWeek = week - 1; previousWeek >= Math.max(1, week - 4); previousWeek -= 1) {
    if (weekData[previousWeek]?.sel?.[dayIndex] === optionIndex) {
      const ago = week - previousWeek;

      if (ago === 1) {
        return { label: ui.lastWeek, className: "recent-0" };
      }

      if (ago <= 3) {
        return { label: ui.weeksAgo(ago), className: "recent-1" };
      }

      return { label: ui.weeksAgo(ago), className: "recent-2" };
    }
  }

  return null;
}

function iconMarkup(iconKey, color) {
  return {
    __html: (ICONS[iconKey] || "").replace('stroke="currentColor"', `stroke="${color}"`),
  };
}

function App() {
  const [weekData, setWeekData] = useState(() => cloneWeekData(INITIAL_WEEK_DATA));
  const [currentWeek, setCurrentWeek] = useState(1);
  const [locale, setLocale] = useState(() => window.localStorage.getItem("digicom-roblox-locale") || "pt");
  const [drawer, setDrawer] = useState(null);
  const [copyState, setCopyState] = useState({});
  const [isReady, setIsReady] = useState(false);
  const closeButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const localeBundle = useMemo(() => getLocaleBundle(locale), [locale]);
  const { ui, phases, days, skillContext } = localeBundle;

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const localState = loadLocalPlanState();

      try {
        const remoteState = await loadRemotePlanState(PLAN_SLUG);

        if (cancelled) {
          return;
        }

        if (remoteState?.weekData) {
          setWeekData(remoteState.weekData);
          setCurrentWeek(remoteState.currentWeek || 1);
        } else if (localState?.weekData) {
          setWeekData(localState.weekData);
          setCurrentWeek(localState.currentWeek || 1);
        }
      } catch {
        if (!cancelled && localState?.weekData) {
          setWeekData(localState.weekData);
          setCurrentWeek(localState.currentWeek || 1);
        }
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!drawer) {
      return undefined;
    }

    setCopyState({});
    lastFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setDrawer(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      lastFocusedRef.current?.focus?.();
    };
  }, [drawer]);

  useEffect(() => {
    window.localStorage.setItem("digicom-roblox-locale", locale);
  }, [locale]);

  useEffect(() => {
    if (!isReady) {
      return undefined;
    }

    const timeoutId = window.setTimeout(async () => {
      saveLocalPlanState(weekData, currentWeek);

      if (!hasSupabase()) {
        return;
      }

      try {
        await saveRemotePlanState(PLAN_SLUG, weekData, currentWeek);
      } catch {}
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [currentWeek, isReady, weekData]);

  const currentPhase = useMemo(() => getPhase(currentWeek, phases), [currentWeek, phases]);

  function updateWeek(updater) {
    setWeekData((previous) => {
      const next = cloneWeekData(previous);
      updater(next);
      return next;
    });
  }

  function openPicker(week, dayIndex) {
    setDrawer({ mode: "picker", week, dayIndex });
  }

  function openDetail(week, dayIndex) {
    setDrawer({ mode: "detail", week, dayIndex });
  }

  function openNote(week) {
    setDrawer({ mode: "note", week });
  }

  function setStatus(status) {
    if (!drawer || drawer.dayIndex == null) {
      return;
    }

    updateWeek((draft) => {
      draft[drawer.week].status[drawer.dayIndex] = status;
    });
  }

  function removeCell() {
    if (!drawer || drawer.dayIndex == null) {
      return;
    }

    updateWeek((draft) => {
      delete draft[drawer.week].sel[drawer.dayIndex];
      delete draft[drawer.week].status[drawer.dayIndex];
    });

    setDrawer(null);
  }

  function chooseOption(week, dayIndex, optionIndex) {
    updateWeek((draft) => {
      draft[week].sel[dayIndex] = optionIndex;
      draft[week].status[dayIndex] = draft[week].status[dayIndex] || "planned";
    });

    setDrawer({ mode: "detail", week, dayIndex });
  }

  async function copyText(key, text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState((previous) => ({ ...previous, [key]: true }));
      window.setTimeout(() => {
        setCopyState((previous) => ({ ...previous, [key]: false }));
      }, 1800);
    } catch {
      // Ignore clipboard failures.
    }
  }

  function renderDrawerBody() {
    if (!drawer) {
      return null;
    }

    if (drawer.mode === "picker") {
      const day = days[drawer.dayIndex];
      const phase = getPhase(drawer.week, phases);
      const phaseIndex = getPhaseIndex(drawer.week, phases);

      return (
        <>
          <div className="picker-ctx">
            <span className="ctx-tag">{phase.name}</span>
            <span className="ctx-tag">{ui.weekLabel(drawer.week)}</span>
          </div>
          <div className="picker-options">
            {day.options.map((option, optionIndex) => {
              const fit = option.pf[phaseIndex];
              const recent = getRecentTag(weekData, drawer.week, drawer.dayIndex, optionIndex, ui);

              return (
                <button
                  key={`${day.day}-${option.title}`}
                  className="popt"
                  style={{ "--c": day.color }}
                  onClick={() => chooseOption(drawer.week, drawer.dayIndex, optionIndex)}
                >
                  <div className="popt-title">
                    <span
                      className="popt-icon"
                      dangerouslySetInnerHTML={iconMarkup(option.iconKey, day.color)}
                    />
                    {option.title}
                  </div>
                  <div className="popt-meta">
                    {fit === 2 ? <span className="ptag rec">{ui.recommended}</span> : null}
                    {fit === 0 ? <span className="ptag off">{ui.outOfPhase}</span> : null}
                    {recent ? <span className={`ptag ${recent.className}`}>{recent.label}</span> : null}
                  </div>
                  <div className="popt-desc">{option.obj}</div>
                </button>
              );
            })}
          </div>
        </>
      );
    }

    if (drawer.mode === "note") {
      const note = weekData[drawer.week]?.note || "";

      return (
        <div className="note-mode">
          <textarea
            defaultValue={note}
            id="week-note"
            placeholder={ui.notePlaceholder}
          />
          <button
            className="note-save"
            onClick={(event) => {
              const nextValue = document.getElementById("week-note")?.value || "";
              updateWeek((draft) => {
                draft[drawer.week].note = nextValue;
              });
              event.currentTarget.textContent = "Saved";
              event.currentTarget.textContent = ui.saved;
              event.currentTarget.classList.add("saved");
              window.setTimeout(() => {
                event.currentTarget.textContent = ui.saveNote;
                event.currentTarget.classList.remove("saved");
              }, 1800);
            }}
          >
            {ui.saveNote}
          </button>
        </div>
      );
    }

    const day = days[drawer.dayIndex];
    const selectedIndex = weekData[drawer.week]?.sel?.[drawer.dayIndex];
    const option = day.options[selectedIndex];

    if (!option) {
      return null;
    }

    return (
      <>
        <div className="goal-strip">
          <b>{ui.objective}</b>
          {option.obj}
        </div>

        {option.skills?.length ? (
          <div className="detail-skills">
            <span className="dsk-lbl">{ui.competencies}</span>
            <div className="dsk-pills">
              {option.skills.map((skill) => (
                <span key={skill} className="dsk-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <section className="channel">
          <header className="ch-hd">
            <span className="ch-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <div className="ch-id">
              <div className="ch-name">{ui.reach}</div>
              <div className="ch-meta">{option.fmt}</div>
            </div>
            <span className="ch-tag">{ui.socialFeed}</span>
          </header>
          <div className="ch-body">
            <div className="lane">
              <span className="lane-lbl">{ui.production}</span>
              <div className="field">
                <b>{ui.primaryAudience}</b>
                {option.aud}
              </div>
              <p className="dr-sec">{ui.script}</p>
              <div className="script">
                {option.script.map(([label, text]) => (
                  <div key={`${option.title}-${label}`} className="beat">
                    <div className="beat-lbl">{label}</div>
                    <div className="beat-txt">{text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lane lane--pub">
              <div className="lane-hd">
                <span className="lane-lbl">{ui.publicationCaption}</span>
                <span className="ready-tag">{ui.readyToPublish}</span>
              </div>
              <div className="caption-box">
                <p>{option.caption}</p>
                <button
                  className={`copy-btn ${copyState.caption ? "done" : ""}`}
                  onClick={() => copyText("caption", option.caption)}
                >
                  {copyState.caption ? ui.copied : ui.copyCaption}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="channel channel--discord">
          <header className="ch-hd">
            <span className="ch-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </span>
            <div className="ch-id">
              <div className="ch-name">{ui.discord}</div>
              <div className="ch-meta">{option.discordAction}</div>
            </div>
            <span className="ch-tag">{ui.server}</span>
          </header>
          <div className="ch-body">
            <div className="lane">
              <div className="lane-hd">
                <span className="lane-lbl">{ui.messageForServer}</span>
                <span className="ready-tag">{ui.readyToPost}</span>
              </div>
              <div className="caption-box">
                <p>{option.discordMsg || option.discordAction}</p>
                <button
                  className={`copy-btn ${copyState.discord ? "done" : ""}`}
                  onClick={() => copyText("discord", option.discordMsg || option.discordAction)}
                >
                  {copyState.discord ? ui.copied : ui.copyMessage}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="care-section">
          <p className="dr-sec">{ui.caution}</p>
          <div className="care-alert">
            <span className="care-alert-icon">⚠</span>
            <div>
              <span className="care-alert-lbl">{ui.attention}</span>
              <span className="care-alert-txt">{option.care}</span>
            </div>
          </div>
        </div>

        {option.skills?.length ? (
          <div className="anexo-skills">
            <p className="dr-sec">{ui.skills}</p>
            {option.skills.map((skill) => (
              <div key={`${option.title}-${skill}`} className="anexo-item">
                <span className="anexo-name">{skill}</span>
                {skillContext[skill] ? <span className="anexo-ctx">{skillContext[skill]}</span> : null}
              </div>
            ))}
          </div>
        ) : null}
      </>
    );
  }

  const drawerDay = drawer?.dayIndex != null ? days[drawer.dayIndex] : null;
  const drawerPhase = drawer ? getPhase(drawer.week, phases) : null;
  const selectedIndex = drawerDay && drawer?.dayIndex != null ? weekData[drawer.week]?.sel?.[drawer.dayIndex] : null;
  const selectedOption = drawerDay && selectedIndex != null ? drawerDay.options[selectedIndex] : null;
  const drawerStatus =
    drawer?.mode === "detail" && drawer?.dayIndex != null
      ? weekData[drawer.week]?.status?.[drawer.dayIndex] || "planned"
      : "planned";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: originalStyles }} />
      <style dangerouslySetInnerHTML={{ __html: APP_OVERRIDES }} />
      <div style={{ "--pc": currentPhase.color }}>
        <div className="topbar">
          <div className="topbar-inner">
            <div className="brand">
              <span className="brand-dot" style={{ background: currentPhase.color }} />
              {ui.brand}
            </div>
            <div className="topbar-actions">
              <img
                src="/expedicao-roblox-logo.png"
                alt="Expedição Roblox"
                className="brand-logo"
              />
              <span className="phase-chip" style={{ color: currentPhase.color }}>
                {currentPhase.name}
              </span>
              <div className="locale-switcher">
                {["pt", "en"].map((nextLocale) => (
                  <button
                    key={nextLocale}
                    type="button"
                    className="exec-btn"
                    style={{
                      color: locale === nextLocale ? currentPhase.color : "var(--muted)",
                      borderColor: locale === nextLocale ? currentPhase.color : "rgba(255,255,255,.15)",
                      background: locale === nextLocale ? "rgba(255,255,255,.08)" : "transparent",
                    }}
                    onClick={() => setLocale(nextLocale)}
                  >
                    {getLocaleBundle(nextLocale).ui.localeLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="prog-hd">
          <div className="prog-head-main">
            <p className="prog-eyebrow">{ui.eyebrow}</p>
            <h1 className="prog-title">{ui.title}</h1>
          </div>
          <div className="prog-head-side" aria-hidden="true">
            <img
              src="/expedicao-roblox-logo.png"
              alt=""
              className="prog-logo"
            />
          </div>
        </div>

        <div className="prog-wrap">
          <div className="prog-grid">
            <div className="col-hd-corner" />
            {days.map((day) => (
              <div key={day.day} className="col-hd" style={{ "--dc": day.color }}>
                <span className="ch-day">{day.day}</span>
                <span className="ch-theme">
                  {day.theme} · {day.fn}
                </span>
                <span className="ch-syn">{day.syn}</span>
              </div>
            ))}

            {Array.from({ length: 13 }, (_, index) => index + 1).map((week) => {
              const phase = getPhase(week, phases);
              const showPhase = phases.some((candidate) => candidate.r[0] === week);
              const note = weekData[week]?.note?.trim();
              const isCurrent = week === currentWeek;

              return (
                <FragmentRows
                  key={week}
                  currentWeek={currentWeek}
                  dayAction={(dayIndex, hasOption) =>
                    hasOption ? openDetail(week, dayIndex) : openPicker(week, dayIndex)
                  }
                  days={days}
                  firstWeekOfPhase={phase.r[0] === week}
                  isCurrent={isCurrent}
                  note={note}
                  onOpenNote={() => openNote(week)}
                  phase={phase}
                  showPhase={showPhase}
                  ui={ui}
                  week={week}
                  weekData={weekData[week]}
                />
              );
            })}
          </div>

          <div className="prog-mobile">
            {phases.map((phase) => (
              <section
                key={phase.name}
                className="mobile-phase"
                style={{ "--phc": phase.color }}
              >
                <div className="mobile-phase-head">
                  <span className="mobile-phase-name">{phase.name}</span>
                  <span className="mobile-phase-weeks">
                    {ui.weeks} {phase.r[0]}–{phase.r[1]}
                  </span>
                  <div className="mobile-phase-desc">{phase.desc}</div>
                </div>

                {Array.from({ length: phase.r[1] - phase.r[0] + 1 }, (_, index) => phase.r[0] + index).map((week) => {
                  const note = weekData[week]?.note?.trim();
                  const isCurrent = week === currentWeek;

                  return (
                    <div key={week} className="mobile-week">
                      <button className="mobile-week-head" onClick={() => openNote(week)}>
                        <div className="mobile-week-main">
                          <div className="mobile-week-title">
                            {ui.weekLabel(week)}
                            {isCurrent ? <span className="mobile-week-dot" /> : null}
                          </div>
                          <div className="mobile-week-note">
                            {note ? ui.noteIndicator : ui.tapToAddNote}
                          </div>
                        </div>
                      </button>

                      <div className="mobile-week-grid">
                        {days.map((day, dayIndex) => {
                          const selectedIndex = weekData[week]?.sel?.[dayIndex];
                          const status = weekData[week]?.status?.[dayIndex] || "planned";
                          const option = selectedIndex != null ? day.options[selectedIndex] : null;

                          return (
                            <button
                              key={`${week}-${day.day}-mobile`}
                              className={`mobile-day-card ${option ? "" : "empty"}`}
                              style={{ "--dc": day.color }}
                              onClick={() => (option ? openDetail(week, dayIndex) : openPicker(week, dayIndex))}
                            >
                              <div className="mobile-day-top">
                                <div className="mobile-day-meta">
                                  <span className="mobile-day-name">{day.day}</span>
                                  <span className="mobile-day-theme">
                                    {day.theme} · {day.fn}
                                  </span>
                                </div>
                                {option ? (
                                  <span className={`cell-status ${status}`} />
                                ) : (
                                  <span className="mobile-day-plus">+</span>
                                )}
                              </div>

                              {option ? (
                                <div className="mobile-day-action">{option.title}</div>
                              ) : (
                                <div className="mobile-day-empty">{day.syn}</div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </section>
            ))}
          </div>
        </div>

        <div className={`backdrop ${drawer ? "open" : ""}`} onClick={() => setDrawer(null)} />
        <aside className={`drawer ${drawer ? "open" : ""}`} role="dialog" aria-modal="true">
          <header className="dr-hd" style={{ "--c": drawerDay?.color || drawerPhase?.color || "#E8472B" }}>
            <button
              ref={closeButtonRef}
              className="close-btn"
              aria-label="Close"
              onClick={() => setDrawer(null)}
            >
              ✕
            </button>
            <p className="dr-kick">
              {drawer
                ? `${ui.weekKick(drawer.week)} · ${
                    drawerDay ? `${drawerDay.theme} · ` : ""
                  }${drawerPhase?.name || ""}`
                : ""}
            </p>
            <h2>
              {drawer?.mode === "picker" ? ui.chooseAction : drawer?.mode === "note" ? ui.communityPulse : selectedOption?.title || ""}
            </h2>
            <p className="sub">
              {drawer?.mode === "picker" ? drawerDay?.objective : drawer?.mode === "note" ? ui.noteSubtitle : selectedOption?.obj || ""}
            </p>
          </header>

          <div className={`exec-bar ${drawer?.mode === "detail" ? "" : "hidden"}`}>
            <span className="exec-lbl">{ui.status}</span>
            <div className="exec-btns">
              {["planned", "published", "skipped"].map((status) => (
                <button
                  key={status}
                  className={`exec-btn ${drawerStatus === status ? "active" : ""}`}
                  data-s={status}
                  onClick={() => setStatus(status)}
                >
                  {ui[status]}
                </button>
              ))}
            </div>
            <div className="exec-actions">
              <button className="change-btn" onClick={() => openPicker(drawer.week, drawer.dayIndex)}>
                {ui.change}
              </button>
              <button className="remove-btn" onClick={removeCell}>
                {ui.remove}
              </button>
            </div>
          </div>

          <div className="dr-body">{renderDrawerBody()}</div>
        </aside>
      </div>
    </>
  );
}

function FragmentRows({
  currentWeek,
  dayAction,
  days,
  firstWeekOfPhase,
  isCurrent,
  note,
  onOpenNote,
  phase,
  showPhase,
  ui,
  week,
  weekData,
}) {
  return (
    <>
      {showPhase ? (
        <div
          className="phase-row"
          style={{
            "--phc": phase.color,
            background: `linear-gradient(180deg, color-mix(in srgb, ${phase.color} 6%, #fff), #fff 78%)`,
          }}
        >
          <span className="phase-row-name">{phase.name}</span>
          <span className="phase-row-weeks">
            {ui.weeks} {phase.r[0]}–{phase.r[1]}
          </span>
          <span className="phase-row-desc">{phase.desc}</span>
        </div>
      ) : null}

      <button className={`week-lbl ${isCurrent ? "curr" : ""}`} onClick={onOpenNote}>
        <div className="wl-num">
          {ui.weekLabel(week)}
          {isCurrent ? (
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--pc)",
                marginLeft: 7,
                verticalAlign: "middle",
              }}
            />
          ) : null}
        </div>
        <div className={`wl-note-icon ${note ? "has-note" : ""}`}>{note ? ui.noteIndicator : "✎"}</div>
      </button>

      {days.map((day, dayIndex) => {
        const selectedIndex = weekData?.sel?.[dayIndex];
        const status = weekData?.status?.[dayIndex] || "planned";
        const option = selectedIndex != null ? day.options[selectedIndex] : null;

        return (
          <button
            key={`${week}-${day.day}`}
            className={`gcell ${option ? "gcell--filled" : "gcell--empty"} ${week === currentWeek ? "curr-row" : ""} ${firstWeekOfPhase ? "phase-start" : ""}`}
            style={{ "--dc": day.color }}
            onClick={() => dayAction(dayIndex, Boolean(option))}
          >
            {option ? (
              <>
                <div className="cell-title">
                  <span className="cell-icon" dangerouslySetInnerHTML={iconMarkup(option.iconKey, day.color)} />
                  {option.title}
                </div>
                <div className="cell-meta">
                  <span className={`cell-status ${status}`} />
                </div>
              </>
            ) : (
              <div className="cell-plus">+</div>
            )}
          </button>
        );
      })}
    </>
  );
}

export default App;
