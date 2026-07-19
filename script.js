function startVoiceAssistant() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("للأسف متصفحك لا يدعم التعرف على الصوت، جربي تشغيله على متصفح Chrome");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const statusText = document.getElementById('status');
    const resultText = document.getElementById('result');

    recognition.onstart = function() {
        statusText.innerText = "الحالة: جاري الاستماع... تحدثي الآن";
    };

    recognition.onerror = function(event) {
        statusText.innerText = "حدث خطأ في التعرف على الصوت.";
    };

    recognition.onend = function() {
        statusText.innerText = "الحالة: تم التوقف.";
    };

    recognition.onresult = function(event) {
        const speechToText = event.results[0][0].transcript.toLowerCase();
        resultText.innerText = "سمعتك بتقولي: " + speechToText;
        
        // 1. موقع جوجل
        if (speechToText.includes('google')) {
            statusText.innerText = "جاري فتح Google...";
            window.open('https://www.google.com', '_blank');
        } 
        // 2. موقع يوتيوب
        else if (speechToText.includes('youtube')) {
            statusText.innerText = "جاري فتح YouTube...";
            window.open('https://www.youtube.com', '_blank');
        } 
        // 3. موقع فيسبوك
        else if (speechToText.includes('facebook')) {
            statusText.innerText = "جاري فتح Facebook...";
            window.open('https://www.facebook.com', '_blank');
        }
        // 4. موقع جيتهاب
        else if (speechToText.includes('github')) {
            statusText.innerText = "جاري فتح GitHub...";
            window.open('https://www.github.com', '_blank');
        }
        // 5. لعبة كابتن نالا
        else if (speechToText.includes('nala') || speechToText.includes('captain')) {
            statusText.innerText = "جاري فتح لعبة كابتن نالا...";
            window.open('https://habibaahmedelsayedgoda.github.io/Captain-Nala-Game/', '_blank');
        }
        // 6. لعبة الزومبي
        else if (speechToText.includes('zombie')) {
            statusText.innerText = "لعبة الزومبي تطبيق على موبايلك، افتحيها بنفسك يا بطلة!";
        }
        // لو قلتي كلمة تانية
        else {
            statusText.innerText = "الكلمة غير مبرمجة لفتح موقع.";
        }
    };

    recognition.start();
}
