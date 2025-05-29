document.addEventListener('DOMContentLoaded', function() {
    // Set the date we're counting down to (September 7, 2025)
    const countDownDate = new Date("Sep 7, 2025 00:00:00").getTime();
    
    // Update the countdown every 1 second
    const countdownFunction = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = Math.floor(hours).toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = Math.floor(minutes).toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = Math.floor(seconds).toString().padStart(2, '0');
        
        // If the countdown is finished, clear interval
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "The wedding has begun!";
        }
    }, 1000);
    
    // Add to Calendar functionality
    const calendarButtons = document.querySelectorAll('.calendar-btn');
    
    calendarButtons.forEach(button => {
        button.addEventListener('click', function() {
            const event = this.getAttribute('data-event');
            const date = this.getAttribute('data-date');
            const location = this.getAttribute('data-location');
            
            // Create ICS file
            const icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'BEGIN:VEVENT',
                'SUMMARY:' + event,
                'DTSTART:' + formatDateForICS(new Date(date)),
                'DTEND:' + formatDateForICS(new Date(new Date(date).getTime() + 2 * 60 * 60 * 1000)), // 2 hours duration
                'LOCATION:' + location,
                'DESCRIPTION:Anu & Yadhu Wedding Event',
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\n');
            
            // Create download link
            const blob = new Blob([icsContent], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Anu-Yadhu-' + event.replace(/\s+/g, '-') + '.ics';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });
    
    // Helper function to format date for ICS
    function formatDateForICS(date) {
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    }
    
    // Load Instagram embed
    function loadInstagramEmbed() {
        if (typeof instgrm !== 'undefined') {
            instgrm.Embeds.process();
        } else {
            setTimeout(loadInstagramEmbed, 500);
        }
    }
    
    // Initialize Instagram embed
    loadInstagramEmbed();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});



// Update header countdown
function updateHeaderCountdown() {
    const countDownDate = new Date("Sep 7, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("header-days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("header-hours").innerHTML = Math.floor(hours).toString().padStart(2, '0');
    document.getElementById("header-minutes").innerHTML = Math.floor(minutes).toString().padStart(2, '0');
    document.getElementById("header-seconds").innerHTML = seconds.toString().padStart(2, '0');
}

// Initial call
updateHeaderCountdown();

// Update every second
setInterval(updateHeaderCountdown, 1000);