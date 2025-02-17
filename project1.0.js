document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    // Validate username using regex
    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regx = /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,24}$/;
        const isMatching = regx.test(username);
        if (!isMatching) {
            alert("Invalid username");
        }
        return isMatching;
    }

    // Mock API to fetch user details
    async function fetchUserDetails(username) {
        // Simulate an API call with random data
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = {
                    username: username,
                    easy: {
                        solved: Math.floor(Math.random() * 100), // Random number for easy problems solved
                        total: 100, // Total easy problems
                    },
                    medium: {
                        solved: Math.floor(Math.random() * 100), // Random number for medium problems solved
                        total: 100, // Total medium problems
                    },
                    hard: {
                        solved: Math.floor(Math.random() * 100), // Random number for hard problems solved
                        total: 100, // Total hard problems
                    },
                };
                resolve(data);
            }, 1000); // Simulate network delay
        });
    }

    // Calculate progress degree
    function updateProgress(solvedQuestions, totalQuestions) {
        const percentage = (solvedQuestions / totalQuestions) * 100; // Calculate percentage
        return percentage; // Return the percentage directly
    }

    // Display user data on the UI
    function displayUserData(data) {
        // Update progress circles
        const easyProgress = updateProgress(data.easy.solved, data.easy.total);
        const mediumProgress = updateProgress(data.medium.solved, data.medium.total);
        const hardProgress = updateProgress(data.hard.solved, data.hard.total);

        easyProgressCircle.style.setProperty("--progress-degree", `${easyProgress}%`);
        mediumProgressCircle.style.setProperty("--progress-degree", `${mediumProgress}%`);
        hardProgressCircle.style.setProperty("--progress-degree", `${hardProgress}%`);

        // Update labels
        easyLabel.textContent = `Easy: ${data.easy.solved}/${data.easy.total}`;
        mediumLabel.textContent = `Medium: ${data.medium.solved}/${data.medium.total}`;
        hardLabel.textContent = `Hard: ${data.hard.solved}/${data.hard.total}`;

        // Show stats container
        statsContainer.style.display = "block";
    }

    // Fetch and update UI with user details
    async function updateUI(username) {
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const userDetails = await fetchUserDetails(username);
            console.log("User details:", userDetails);

            // Display the fetched data on the UI
            displayUserData(userDetails);
        } catch (error) {
            console.error("Error fetching user details:", error);
            statsContainer.innerHTML = `<p>Error fetching data. Please try again.</p>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    // Add click event listener to search button
    searchButton.addEventListener("click", function () {
        const username = usernameInput.value.trim();
        console.log("Logging username:", username);
        if (validateUsername(username)) {
            updateUI(username);
        }
    });
});