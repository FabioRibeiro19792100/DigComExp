const LOCAL_KEY = "digicom-roblox-plan-state";

export function loadLocalPlanState() {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveLocalPlanState(weekData, currentWeek) {
  try {
    window.localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify({
        weekData,
        currentWeek,
      }),
    );
  } catch {
    // Ignore local persistence issues so the interface keeps working.
  }
}
