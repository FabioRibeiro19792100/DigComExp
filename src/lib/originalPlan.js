import originalHtml from "../../digital-communication-plan-expedicao-roblox (1).html?raw";

function extractBetween(startMarker, endMarker) {
  const start = originalHtml.indexOf(startMarker);
  const end = originalHtml.indexOf(endMarker, start);

  if (start === -1 || end === -1) {
    throw new Error(`Could not extract content between "${startMarker}" and "${endMarker}"`);
  }

  return originalHtml.slice(start + startMarker.length, end).trim();
}

function evalLiteral(source) {
  return new Function(`return (${source});`)();
}

function extractConst(name, nextMarker) {
  const source = extractBetween(`const ${name}=`, nextMarker);
  return evalLiteral(source.replace(/;$/, ""));
}

function buildInitialWeekData(prepop) {
  const weekData = {};

  for (let week = 1; week <= 13; week += 1) {
    weekData[week] = { sel: {}, status: {}, note: "" };

    if (!prepop[week]) {
      continue;
    }

    Object.entries(prepop[week]).forEach(([dayIndex, optionIndex]) => {
      weekData[week].sel[dayIndex] = optionIndex;
      weekData[week].status[dayIndex] = "planned";
    });
  }

  return weekData;
}

export const originalStyles = extractBetween("<style>", "</style>");
export const ICONS = extractConst("ICONS", "\n\nconst SKILL_CONTEXT=");
export const SKILL_CONTEXT = extractConst("SKILL_CONTEXT", "\n\nconst PREPOP=");
export const PREPOP = extractConst("PREPOP", "\n\nfunction prepopulate");
export const PHASES = extractConst("PHASES", "\n\n// pf:[ativação,engajamento,consolidação] 2=rec 1=ok 0=fora");
export const DAYS = extractConst("DAYS", "\n\nconst SL=");
export const INITIAL_WEEK_DATA = buildInitialWeekData(PREPOP);
