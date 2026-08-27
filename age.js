const birthDate = document.getElementById("birthDate");
const calculateBtn = document.getElementById("calculateBtn");

const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");
const birthday = document.getElementById("birthday");

calculateBtn.addEventListener("click", calculateAge);

function calculateAge() {
    if (!birthDate.value) {
        alert("Please select your birth date.");
        return;
    }

    const [year, month, day] = birthDate.value
        .split("-")
        .map(Number);

    const dob = new Date(year, month - 1, day);

    const today = new Date();

    // Prevent future birthdays
    if (dob > today) {
        alert("Your birth date cannot be in the future.");
        return;
    }

    let ageYears = today.getFullYear() - dob.getFullYear();
    let ageMonths = today.getMonth() - dob.getMonth();
    let ageDays = today.getDate() - dob.getDate();

    // Adjust days
    if (ageDays < 0) {
        ageMonths--;

        const previousMonthDays = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();

        ageDays += previousMonthDays;
    }

    // Adjust months
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    years.textContent = ageYears;
    months.textContent = ageMonths;
    days.textContent = ageDays;

    calculateNextBirthday(year, month - 1, day);
}

function calculateNextBirthday(birthYear, birthMonth, birthDay) {
    const today = new Date();

    let nextBirthday = new Date(
        today.getFullYear(),
        birthMonth,
        birthDay
    );

    // If birthday has already happened this year,
    // calculate the next one.
    if (nextBirthday < today) {
        nextBirthday = new Date(
            today.getFullYear() + 1,
            birthMonth,
            birthDay
        );
    }

    // Midnight calculation avoids daylight-saving/time differences
    const todayMidnight = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const birthdayMidnight = new Date(
        nextBirthday.getFullYear(),
        nextBirthday.getMonth(),
        nextBirthday.getDate()
    );

    const difference =
        birthdayMidnight - todayMidnight;

    const daysLeft = Math.round(
        difference / (1000 * 60 * 60 * 24)
    );

    birthday.textContent = daysLeft;
}
