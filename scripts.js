// إعداد Plyr لجميع الفيديوهات
const players = Array.from(document.querySelectorAll('video')).map(video => new Plyr(video, {
    captions: { active: true }
}));

// عناصر التحكم في السحب
let currentVideoIndex = 0;
const videoWrappers = document.querySelectorAll('.video-wrapper');
const totalVideos = videoWrappers.length;

let startY = 0; // لتحديد بداية السحب
let endY = 0;   // لتحديد نهاية السحب

// حفظ نقطة بداية السحب
document.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
});

// تنفيذ الحركة عند انتهاء السحب
document.addEventListener('touchend', (event) => {
    endY = event.changedTouches[0].clientY;
    handleSwipe();
});

// دالة لمعالجة السحب
function handleSwipe() {
    const distance = startY - endY;

    // إذا كانت الحركة للأعلى (السحب لفوق)
    if (distance > 50 && currentVideoIndex < totalVideos - 1) {
        showVideo(currentVideoIndex + 1);
    }

    // إذا كانت الحركة للأسفل (السحب لأسفل)
    else if (distance < -50 && currentVideoIndex > 0) {
        showVideo(currentVideoIndex - 1);
    }
}

// دالة لإظهار الفيديو المطلوب
function showVideo(index) {
    videoWrappers.forEach((wrapper, i) => {
        if (i === index) {
            wrapper.style.transform = 'translateY(0)';
        } else if (i < index) {
            wrapper.style.transform = 'translateY(-100%)';
        } else {
            wrapper.style.transform = `translateY(${(i - index) * 100}%)`;
        }
    });

    currentVideoIndex = index;
}
