document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calendar");
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    // Define reserved dates in Finnish format YYYY-DD-MM
    const reservedDates = [
        "2025-21-02",
        "2025-15-02",
        "2025-16-02"
    ];

    function generateCalendar(month, year) {
        calendarContainer.innerHTML = "";

        const monthNames = [
            "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu",
            "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu",
            "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
        ];

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let calendarHTML = `
            <div class="calendar-header">
                <button id="prevMonth">&#9665;</button>
                <h3>${monthNames[month]} ${year}</h3>
                <button id="nextMonth">&#9655;</button>
            </div>
            <div class="calendar-grid">
                <div class="day-label">Ma</div>
                <div class="day-label">Ti</div>
                <div class="day-label">Ke</div>
                <div class="day-label">To</div>
                <div class="day-label">Pe</div>
                <div class="day-label">La</div>
                <div class="day-label">Su</div>
        `;

        let dayHTML = "";
        let date = 1;

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < (firstDay === 0 ? 6 : firstDay - 1)) {
                    dayHTML += `<div class="empty-cell"></div>`;
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const dateString = `${year}-${String(date).padStart(2, "0")}-${String(month + 1).padStart(2, "0")}`;
                    const isReserved = reservedDates.includes(dateString);
                    dayHTML += `<div class="calendar-day ${isReserved ? "reserved" : "available"}">${date}</div>`;
                    date++;
                }
            }
        }

        calendarContainer.innerHTML = calendarHTML + dayHTML + "</div>";
        
        document.getElementById("prevMonth").addEventListener("click", function () {
            changeMonth(-1);
        });

        document.getElementById("nextMonth").addEventListener("click", function () {
            changeMonth(1);
        });
    }

    function changeMonth(step) {
        currentMonth += step;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    }

    generateCalendar(currentMonth, currentYear);
});
