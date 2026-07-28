const birthDate = document.getElementById("birthDate");
const calculateBtn = document.getElementById("calculateBtn");

const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");
const birthday = document.getElementById("birthday");

calculateBtn.addEventListener("click", () => {

    if (birthDate.value === "") {
        alert("Please select your birth date.");
        return;
    }

    const dob = new Date(birthDate.value);
    const today = new Date();

    let ageYears = today.getFullYear() - dob.getFullYear();
    let ageMonths = today.getMonth() - dob.getMonth();
    let ageDays = today.getDate() - dob.getDate();

    if (ageDays < 0) {
        ageMonths--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += lastMonth.getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    years.textContent = ageYears;
    months.textContent = ageMonths;
    days.textContent = ageDays;

    // Days until next birthday
    let nextBirthday = new Date(
        today.getFullYear(),
        dob.getMonth(),
        dob.getDate()
    );

    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diff = nextBirthday - today;
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    birthday.textContent = daysLeft;

});