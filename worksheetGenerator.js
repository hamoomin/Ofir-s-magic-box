function generateQuestions(level, subTopic, numQuestions) {
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
        let question;
        switch (subTopic) {
            case 'polynomial':
                question = generatePolynomialQuestion(level);
                break;
            case 'product':
                question = generateProductQuestion(level);
                break;
            case 'quotient':
                question = generateQuotientQuestion(level);
                break;
            case 'root':
                question = generateRootQuestion(level);
                break;
            case 'combined':
                question = generateCombinedQuestion(level);
                break;
            case 'trigonometric':
                question = generateTrigonometricQuestion(level);
                break;
            case 'logarithmic':
                question = generateLogarithmicQuestion(level);
                break;
            case 'exponential':
                question = generateExponentialQuestion(level);
                break;
        }
        questions.push(question);
    }
    return questions;
}

function generatePolynomialQuestion(level) {
    const coefficients = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
    const exponents = Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) + 1);
    return `f(x) = ${coefficients.map((coef, i) => `${coef}x^{${exponents[i]}}`).join(' + ')}`;
}

function generateProductQuestion(level) {
    const coefficients1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
    const exponents1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) + 1);
    const coefficients2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
    const exponents2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) + 1);
    return `f(x) = (${coefficients1.map((coef, i) => `${coef}x^{${exponents1[i]}}`).join(' + ')}) \\cdot (${coefficients2.map((coef, i) => `${coef}x^{${exponents2[i]}}`).join(' + ')})`;
}

function generateQuotientQuestion(level) {
    const coefficients1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
    const exponents1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) + 1);
    const coefficients2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
    const exponents2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) + 1);
    return `f(x) = \\frac{${coefficients1.map((coef, i) => `${coef}x^{${exponents1[i]}}`).join(' + ')}}{${coefficients2.map((coef, i) => `${coef}x^{${exponents2[i]}}`).join(' + ')}}`;
}

function generateRootQuestion(level) {
    const coefficient = Math.floor(Math.random() * 10) + 1;
    return `f(x) = \\sqrt{${coefficient}x}`;
}

function generateCombinedQuestion(level) {
    const coefficients1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
    const exponents1 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) + 1);
    const coefficients2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
    const exponents2 = Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) + 1);
    return `f(x) = \\frac{(${coefficients1.map((coef, i) => `${coef}x^{${exponents1[i]}}`).join(' + ')}) \\cdot (${coefficients2.map((coef, i) => `${coef}x^{${exponents2[i]}}`).join(' + ')})}{\\sqrt{${coefficients2[0]}x}}`;
}

function generateTrigonometricQuestion(level) {
    const coefficient = Math.floor(Math.random() * 10) + 1;
    return `f(x) = ${coefficient} \\sin(x)`;
}

function generateLogarithmicQuestion(level) {
    const coefficient = Math.floor(Math.random() * 10) + 1;
    return `f(x) = ${coefficient} \\log(x)`;
}

function generateExponentialQuestion(level) {
    const coefficient = Math.floor(Math.random() * 10) + 1;
    return `f(x) = ${coefficient} e^x`;
}

function previewWorksheet() {
    const title = document.getElementById('title').value;
    const level = parseInt(document.getElementById('level').value);
    const subTopic = document.getElementById('subTopic').value;
    const numPages = parseInt(document.getElementById('numPages').value);
    const questionsPerPage = 30; // מספר תרגילים בעמוד אחד (15 לכל עמודה)
    const numQuestions = questionsPerPage * numPages;

    if (level === 3) {
        document.getElementById('worksheet-output').innerHTML = `<p>ברמת לימוד של 3 יחידות אין צורך לדעת נגזרת.</p>`;
        return;
    }

    const questions = generateQuestions(level, subTopic, numQuestions);
    let worksheetHTML = '';

    for (let page = 0; page < numPages; page++) {
        worksheetHTML += `<div class="worksheet-content">`;
        worksheetHTML += `<h2>${title}</h2>`;
        worksheetHTML += `<p>גזור את הפונקציות הבאות:</p>`;
        worksheetHTML += `<table class="questions-table">`;

        for (let i = 0; i < questionsPerPage; i += 2) {
            const index1 = page * questionsPerPage + i;
            const index2 = index1 + 1;
            if (index1 >= questions.length) break;

            worksheetHTML += `<tr>`;
            worksheetHTML += `<td class="question-number">(${index1 + 1})</td>`;
            worksheetHTML += `<td class="question-text">\\(${questions[index1]}\\)</td>`;
            if (index2 < questions.length) {
                worksheetHTML += `<td class="question-number">(${index2 + 1})</td>`;
                worksheetHTML += `<td class="question-text">\\(${questions[index2]}\\)</td>`;
            } else {
                worksheetHTML += `<td></td><td></td>`;
            }
            worksheetHTML += `</tr>`;
        }

        worksheetHTML += `</table>`;
        worksheetHTML += `</div>`;
    }

    document.getElementById('worksheet-output').innerHTML = worksheetHTML;

    // Render MathJax
    MathJax.typeset();
}

function printWorksheet() {
    const printContents = document.getElementById('worksheet-output').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = `<div class="print-container">${printContents}</div>`;

    window.print();

    document.body.innerHTML = originalContents;
    MathJax.typeset(); // Render MathJax again after restoring the original content
}