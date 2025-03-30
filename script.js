// Event listeners for clickable images
document.querySelectorAll('.clickable-image').forEach(image => {
    image.addEventListener('click', function() {
        let imageId = this.getAttribute('data-id');
        sessionStorage.setItem('selectedImage', imageId); // Store clicked image ID
        document.getElementById('loginBlock').style.display = 'block';
        document.getElementById('loginBlock').classList.add('visible'); // Add animation class
    });
});

// Authentication function
function authenticate(role) {
    let imageId = sessionStorage.getItem('selectedImage');
    let passKeys = {
        "1": { student: "stu123", teacher: "teach123" },
        "2": { student: "stu234", teacher: "teach234" },
        "3": { student: "stu345", teacher: "teach345" },
        "4": { student: "stu456", teacher: "teach456" },
        "5": { student: "stu567", teacher: "teach567" }
    };
    
    let pageRedirects = {
        "1": { student: "oldexam1.html", teacher: "oldexam1.html" },
        "2": { student: "oldexam2.html", teacher: "oldexam2.html" },
        "3": { student: "oldexam3.html", teacher: "oldexam3.html" },
        "4": { student: "oldexam4.html", teacher: "oldexam4.html" },
        "5": { student: "oldexam5.html", teacher: "oldexam5.html" }
    };
    
    let enteredKey = document.getElementById('passKey').value;
    let correctKey = passKeys[imageId]?.[role];
    let nextPage = pageRedirects[imageId]?.[role];
    
    if (enteredKey === correctKey) {
        document.getElementById('errorMsg').textContent = ""; // Clear error message
        sessionStorage.setItem('userRole', role); // Store role for access control
        if (nextPage) {
            window.location.href = nextPage; // Redirect based on selected image
        } else {
            document.getElementById('errorMsg').textContent = "No page linked to this key!";
        }
    } else {
        document.getElementById('errorMsg').textContent = "Incorrect pass key!";
        // Add shake animation to indicate error
        document.getElementById('passKey').classList.add('shake');
        setTimeout(() => {
            document.getElementById('passKey').classList.remove('shake');
        }, 500);
    }
}

// Close login block function
function closeLogin() {
    document.getElementById('loginBlock').classList.remove('visible'); // Remove animation class
    // Wait for animation to complete before hiding
    setTimeout(() => {
        document.getElementById('loginBlock').style.display = 'none';
        // Clear password field and error message when closing
        document.getElementById('passKey').value = "";
        document.getElementById('errorMsg').textContent = "";
    }, 300);
}

// Function to validate pass key when submit button is clicked
function validatePass() {
    // Get the selected role
    const studentBtn = document.querySelector('.role-btn:nth-child(1)');
    const teacherBtn = document.querySelector('.role-btn:nth-child(2)');
    
    let selectedRole = null;
    
    // Check which role button has the active class
    if (studentBtn.classList.contains('active')) {
        selectedRole = 'student';
    } else if (teacherBtn.classList.contains('active')) {
        selectedRole = 'teacher';
    } else {
        document.getElementById('errorMsg').textContent = "Please select a role first!";
        return;
    }
    
    // Call authenticate with the selected role
    authenticate(selectedRole);
}

// Add real-time password validation
document.addEventListener('DOMContentLoaded', function() {
    // Password input event listener
    const passKeyInput = document.getElementById('passKey');
    passKeyInput.addEventListener('input', function() {
        const selectedRole = document.querySelector('.role-btn.active');
        
        if (selectedRole) {
            const imageId = sessionStorage.getItem('selectedImage');
            const role = selectedRole.getAttribute('onclick').match(/'([^']+)'/)[1];
            
            const passKeys = {
                "1": { student: "stu123", teacher: "teach123" },
                "2": { student: "stu234", teacher: "teach234" },
                "3": { student: "stu345", teacher: "teach345" },
                "4": { student: "stu456", teacher: "teach456" },
                "5": { student: "stu567", teacher: "teach567" }
            };
            
            const correctKey = passKeys[imageId]?.[role];
            const enteredKey = this.value;
            
            // Check if password is incorrect and not empty
            if (enteredKey && enteredKey !== correctKey) {
                document.getElementById('errorMsg').textContent = "Incorrect pass key!";
                this.style.borderColor = "#ff3333";
            } else {
                document.getElementById('errorMsg').textContent = "";
                this.style.borderColor = "";
            }
        }
    });
    
    // Role button functionality
    const roleBtns = document.querySelectorAll('.role-btn');
    
    roleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            roleBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Clear any error messages
            document.getElementById('errorMsg').textContent = "";
            
            // Reset password field styles
            document.getElementById('passKey').style.borderColor = "";
            
            // Get the role from the button's onclick attribute
            const onclickAttr = this.getAttribute('onclick');
            const role = onclickAttr.match(/'([^']+)'/)[1]; // Extract the role name
            
            // Check if current password is valid for the new role
            const currentPass = document.getElementById('passKey').value;
            if (currentPass) {
                const imageId = sessionStorage.getItem('selectedImage');
                const passKeys = {
                    "1": { student: "stu123", teacher: "teach123" },
                    "2": { student: "stu234", teacher: "teach234" },
                    "3": { student: "stu345", teacher: "teach345" },
                    "4": { student: "stu456", teacher: "teach456" },
                    "5": { student: "stu567", teacher: "teach567" }
                };
                
                const correctKey = passKeys[imageId]?.[role];
                
                if (currentPass !== correctKey) {
                    document.getElementById('errorMsg').textContent = "Incorrect pass key!";
                    document.getElementById('passKey').style.borderColor = "#ff3333";
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init();
    
    // Get DOM elements
    const searchInput = document.getElementById('collegeSearch');
    const goBackButton = document.getElementById('goBackButton');
    const collegeBoxes = document.querySelectorAll('.image-box');
    const searchResult = document.getElementById('searchResult');
    
    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        // Don't perform empty searches
        if (searchTerm === '') {
            clearSearch();
            return;
        }
        
        let matchCount = 0;
        
        // Process each college box
        collegeBoxes.forEach(box => {
            const collegeName = box.getAttribute('data-college').toLowerCase();
            
            if (collegeName.includes(searchTerm)) {
                // Show matching colleges
                box.classList.remove('hide');
                box.classList.add('show');
                matchCount++;
                
                // Add highlight to matching text
                const caption = box.querySelector('figcaption');
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                caption.innerHTML = caption.textContent.replace(
                    regex, 
                    '<span class="highlight-match">$1</span>'
                );
            } else {
                // Hide non-matching colleges
                box.classList.add('hide');
                box.classList.remove('show');
            }
        });
        
        // Update search result message
        if (matchCount > 0) {
            searchResult.textContent = `Found ${matchCount} matching college${matchCount > 1 ? 's' : ''}`;
            searchResult.style.color = 'white'; 
                } else {
            searchResult.textContent = 'No colleges found matching your search';
            searchResult.style.color = 'red'; // Keep red for no results
        }
        
        // Show Go Back button
        goBackButton.style.display = 'block';
    }
    
    // Function to clear search and reset to initial state
    function clearSearch() {
        // Clear input
        searchInput.value = '';
        
        // Show all college boxes
        collegeBoxes.forEach(box => {
            box.classList.remove('hide');
            box.classList.add('show');
            
            // Reset caption to original text (remove highlights)
            const caption = box.querySelector('figcaption');
            caption.textContent = box.getAttribute('data-college');
        });
        
        // Clear search result message
        searchResult.textContent = '';
        
        // Hide Go Back button
        goBackButton.style.display = 'none';
    }
    
    // Event Listeners
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    goBackButton.addEventListener('click', clearSearch);
    
    // Add click event to college boxes
    collegeBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // College selection logic
            const collegeId = this.querySelector('.clickable-image').getAttribute('data-id');
            const collegeName = this.getAttribute('data-college');
            
            // Example of selection feedback
            searchResult.textContent = `Selected: ${collegeName}`;
            searchResult.style.color = '#ffcc00';
            
            // Add your college selection logic here
            console.log(`Selected college: ${collegeName} with ID: ${collegeId}`);
        });
    });
    
    // Real-time search for better user experience
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        if (searchTerm.length >= 2) {
            // Perform search after the user has typed at least 2 characters
            performSearch();
        } else if (searchTerm.length === 0) {
            // Clear search when input is empty
            clearSearch();
        }
    });
});