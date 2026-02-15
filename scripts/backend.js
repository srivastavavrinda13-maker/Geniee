/* ---------- SESSION STORAGE ---------- */

// Save study session
function saveSession(minutes) {
    let sessions =
        JSON.parse(localStorage.getItem("sessions")) || [];

    sessions.push({
        date: new Date().toISOString(),
        duration: minutes
    });

    localStorage.setItem("sessions", JSON.stringify(sessions));
}

// Total study time
function getTotalStudyTime() {
    let sessions =
        JSON.parse(localStorage.getItem("sessions")) || [];

    return sessions.reduce(
        (sum, s) => sum + s.duration,
        0
    );
}

// Weekly study data
function getWeeklyData() {
    let sessions =
        JSON.parse(localStorage.getItem("sessions")) || [];

    let week = [0,0,0,0,0,0,0];

    sessions.forEach(s => {
        let day = new Date(s.date).getDay();
        week[day] += s.duration;
    });

    return week;
}
