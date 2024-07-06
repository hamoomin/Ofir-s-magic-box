function generateQuestions(level, functionType, numQuestions) {
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
        let question;
        switch (functionType) {
            case 'polynomial':
                question = generatePolynomialQuestion(level, i + 1);
                break;
            case 'product':
                question = generateProductQuestion(level, i + 1);
                break;
            case 'quotient':
                question = generateQuotientQuestion(level, i + 1);
                break;
            case 'root':
                question = generateRootQuestion(level, i + 1);
                break;
            case 'combined':
                question = generateCombinedQuestion(level, i + 1);
                break;
            case 'trigonometric':
                question = generateTrigonometricQuestion(level, i + 1);
                break;
            case 'logarithmic':
                question = generateLogarithmicQuestion(level, i + 1);
                break;
            case 'exponential':
                question = generateExponentialQuestion(level, i + 1);
                break;
        }
        questions.push(question);
    }
    return questions;
}

function generatePolynomialQuestion(level, difficulty) {
    const coefficients = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    const exponents = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    return `f(x) = ${coefficients.map((coef, i) => `${coef}x^{${exponents[i]}}`).join(' + ')}`;
}

function generateProductQuestion(level, difficulty) {
    const coefficients1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    const exponents1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    const coefficients2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    const exponents2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    return `f(x) = (${coefficients1.map((coef, i) => `${coef}x^{${exponents1[i]}}`).join(' + ')}) \\cdot (${coefficients2.map((coef, i) => `${coef}x^{${exponents2[i]}}`).join(' + ')})`;
}

function generateQuotientQuestion(level, difficulty) {
    const coefficients1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    const exponents1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    const coefficients2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    const exponents2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    return `f(x) = \\frac{${coefficients1.map((coef, i) => `${coef}x^{${exponents1[i]}}`).join(' + ')}}{${coefficients2.map((coef, i) => `${coef}x^{${exponents2[i]}}`).join(' + ')}}`;
}

function generateRootQuestion(level, difficulty) {
    const coefficient = Math.floor(Math.random() * difficulty) + 1;
    return `f(x) = \\sqrt{${coefficient}x}`;
}

function generateCombinedQuestion(level, difficulty) {
    const coefficients1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    const exponents1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    const coefficients2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    const exponents2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * difficulty) + 1);
    return `f(x) = \\frac{(${coefficients1.map((coef, i) => `${coef}x^{${exponents1[i]}}`).join(' + ')}) \\cdot (${coefficients2.map((coef, i) => `${coef}x^{${exponents2[i]}}`).join(' + ')})}{\\sqrt{${coefficients2[0]}x}}`;
}

function generateTrigonometricQuestion(level, difficulty) {
    const coefficient = Math.floor(Math.random() * difficulty) + 1;
    return `f(x) = ${coefficient} \\sin(x)`;
}

function generateLogarithmicQuestion(level, difficulty) {
    const coefficient = Math.floor(Math.random() * difficulty) + 1;
    return `f(x) = ${coefficient} \\log(x)`;
}

function generateExponentialQuestion(level, difficulty) {
    const coefficient = Math.floor(Math.random() * difficulty) + 1;
    return `f(x) = ${coefficient} e^x`;
}

function differentiatePolynomial(question) {
    const regex = /(\d+)x\^{(\d+)}/g;
    let match;
    let derivative = 'f\'(x) = ';
    while ((match = regex.exec(question)) !== null) {
        const coefficient = parseInt(match[1]);
        const exponent = parseInt(match[2]);
        const newCoefficient = coefficient * exponent;
        const newExponent = exponent - 1;
        derivative += `${newCoefficient}x^{${newExponent}} + `;
    }
    return derivative.slice(0, -3); // Remove the last ' + '
}

function previewWorksheet() {
    const title = document.getElementById('title').value;
    const level = parseInt(document.getElementById('level').value);
    const topic = document.getElementById('topic').value;
    const subTopic = document.getElementById('subTopic').value;
    const functionType = document.getElementById('functionType').value;
    const numPages = parseInt(document.getElementById('numPages').value);
    const questionsPerPage = 15; // מספר תרגילים בעמוד אחד
    const numQuestions = questionsPerPage * numPages;
    const includeAnswers = document.getElementById('includeAnswers').checked;
    const customMessage = document.getElementById('customMessage').value;

    if (!title || !topic || !subTopic || !functionType) {
        document.getElementById('worksheet-output').innerHTML = `<p style="color: red;">יש לבחור נושא, תת-נושא וסוג פונקציה.</p>`;
        return;
    }

    if (level === 3) {
        document.getElementById('worksheet-output').innerHTML = `<p style="color: red;">ברמת לימוד של 3 יחידות אין צורך לדעת נגזרת.</p>`;
        return;
    }

    const questions = generateQuestions(level, functionType, numQuestions);
    let worksheetHTML = '';

    for (let page = 0; page < numPages; page++) {
        worksheetHTML += `<div class="worksheet-content">`;
        if (page === 0) {
            worksheetHTML += `<h2 class="worksheet-title">${title}</h2>`;
        }
        worksheetHTML += `<p>גזור את הפונקציות הבאות:</p>`;
        worksheetHTML += `<table class="questions-table">`;

        for (let i = 0; i < questionsPerPage; i++) {
            const index = page * questionsPerPage + i;
            if (index >= questions.length) break;

            worksheetHTML += `<tr>`;
            worksheetHTML += `<td class="question-number">(${index + 1})</td>`;
            worksheetHTML += `<td class="question-text">\\(${questions[index]}\\)</td>`;
            worksheetHTML += `</tr>`;
        }

        worksheetHTML += `</table>`;
        worksheetHTML += `<p class="custom-message">${customMessage}</p>`;
        worksheetHTML += `<p class="page-number">עמוד ${page + 1}</p>`;
        worksheetHTML += `</div>`;
    }

    document.getElementById('worksheet-output').innerHTML = worksheetHTML;

    // Render MathJax
    MathJax.typeset();

    if (includeAnswers && functionType === 'polynomial') {
        generateAnswers(questions);
    }
}

function generateAnswers(questions) {
    let answersHTML = '<div class="worksheet-content">';
    answersHTML += '<h2 class="worksheet-title">פתרונות</h2>';
    answersHTML += '<table class="questions-table">';

    questions.forEach((question, index) => {
        const answer = differentiatePolynomial(question); // חישוב הנגזרת של הפולינום
        answersHTML += `<tr>`;
        answersHTML += `<td class="question-number">(${index + 1})</td>`;
        answersHTML += `<td class="question-text">\\(${answer}\\)</td>`;
        answersHTML += `</tr>`;
    });

    answersHTML += '</table>';
    answersHTML += '</div>';

    document.getElementById('answers-output').innerHTML = answersHTML;

    // Render MathJax
    MathJax.typeset();
}

function toggleSubTopic() {
    const topic = document.getElementById('topic').value;
    const subTopicGroup = document.getElementById('subTopicGroup');
    if (topic === 'functions') {
        subTopicGroup.style.display = 'block';
    } else {
        subTopicGroup.style.display = 'none';
        document.getElementById('subTopic').value = '';
        toggleFunctionType();
    }
}

function toggleFunctionType() {
    const subTopic = document.getElementById('subTopic').value;
    const functionTypeGroup = document.getElementById('functionTypeGroup');
    const includeAnswersGroup = document.getElementById('includeAnswersGroup');
    if (subTopic === 'derivative') {
        functionTypeGroup.style.display = 'block';
        if (document.getElementById('functionType').value === 'polynomial') {
            includeAnswersGroup.style.display = 'block';
        } else {
            includeAnswersGroup.style.display = 'none';
        }
    } else {
        functionTypeGroup.style.display = 'none';
        includeAnswersGroup.style.display = 'none';
        document.getElementById('functionType').value = '';
    }
}

document.getElementById('functionType').addEventListener('change', function() {
    const functionType = document.getElementById('functionType').value;
    const includeAnswersGroup = document.getElementById('includeAnswersGroup');
    if (functionType === 'polynomial') {
        includeAnswersGroup.style.display = 'block';
    } else {
        includeAnswersGroup.style.display = 'none';
    }
});

function printWorksheet() {
    const printContents = document.getElementById('worksheet-output').innerHTML;
    const answersContents = document.getElementById('answers-output').innerHTML;
    const printWindow = window.open('', '', 'height=1123,width=794');
    printWindow.document.write('<html><head><title>Print Worksheet</title>');
    printWindow.document.write('<link rel="stylesheet" href="styles.css">');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div class="print-container">');
    printWindow.document.write(printContents);
    printWindow.document.write(answersContents);
    printWindow.document.write('</div></body></html>');
    printWindow.document.close();
    printWindow.print();
}