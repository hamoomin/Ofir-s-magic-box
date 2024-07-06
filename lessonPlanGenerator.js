function generateLessonPlan() {
    const teacherName = document.getElementById('teacherName').value;
    const subject = document.getElementById('subject').value;
    const classNumber = document.getElementById('classNumber').value;
    const lessonTopic = document.getElementById('lessonTopic').value;
    const lessonLevel = document.getElementById('lessonLevel').value;
    const activityType = document.getElementById('activityType').value;
    const lessonDetails = document.getElementById('lessonDetails').value;

    if (!teacherName || !subject || !classNumber || !lessonTopic || !lessonLevel || !activityType || !lessonDetails) {
        document.getElementById('lesson-plan-output').innerHTML = `<p style="color: red;">יש למלא את כל השדות.</p>`;
        return;
    }

    let lessonPlanHTML = `<div class="lesson-plan-content">`;
    lessonPlanHTML += `<h2 class="lesson-plan-title">מערך שיעור</h2>`;
    lessonPlanHTML += `<p>אני מורה למקצוע ${subject} בכיתה ${classNumber} ברמת לימוד ${lessonLevel} וזקוק למערך שיעור עבור נושא ${lessonTopic} עם פעילות מסוג ${activityType}.</p>`;
    lessonPlanHTML += `<p><strong>פרטי השיעור:</strong></p>`;
    lessonPlanHTML += `<p>${lessonDetails}</p>`;
    lessonPlanHTML += `</div>`;

    document.getElementById('lesson-plan-output').innerHTML = lessonPlanHTML;
}

function copyLessonPlan() {
    const lessonPlanOutput = document.getElementById('lesson-plan-output');
    const range = document.createRange();
    range.selectNode(lessonPlanOutput);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('מערך השיעור הועתק ללוח.');
}