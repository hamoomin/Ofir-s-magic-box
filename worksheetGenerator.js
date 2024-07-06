function generateQuestions(topic, subTopic, numQuestions) {
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
        let question;
        switch (subTopic) {
            case 'polynomial':
                question = generatePolynomialQuestion();
                break;
            case 'product':
                question = generateProductQuestion();
                break;
            case 'quotient':
                question = generateQuotientQuestion();
                break;
            case 'root':
                question = generateRootQuestion();
                break;
            case 'combined':
                question = generateCombinedQuestion();
                break;
        }
        questions.push(question);
    }
    return questions;
}

function generatePolynomialQuestion() {
    const coefficients = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
    const exponents = [Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1];
    return `f(x) = ${coefficients[0]}x^{${exponents[0]}} + ${coefficients[1]}x^{${exponents[1]}} + ${coefficients[2]}x^{${exponents[2]}}`;
}

function generateProductQuestion() {
    const coefficients1 = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
    const exponents1 = [Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1];
    const coefficients2 = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
    const exponents2 = [Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1];
    return `f(x) = (${coefficients1[0]}x^{${exponents1[0]}} + ${coefficients1[1]}x^{${exponents1[1]}}) \\cdot (${coefficients2[0]}x^{${exponents2[0]}} + ${coefficients2[1]}x^{${exponents2[1]}})`;
}

function generateQuotientQuestion() {
    const coefficients1 = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
    const exponents1 = [Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1];
    const coefficients2 = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
    const exponents2 = [Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1];
    return `f(x) = \\frac{${coefficients1[0]}x^{${exponents1[0]}} + ${coefficients1[1]}x^{${exponents1[1]}}}{${coefficients2[0]}x^{${exponents2[0]}} + ${coefficients2[1]}x^{${exponents2[1]}}}`;
}

function generateRootQuestion() {
    const coefficient = Math.floor(Math.random() * 10) + 1;
    const exponent = Math.floor(Math.random() * 5) + 1;
    return `f(x) = \\sqrt[${exponent}]{${coefficient}x}`;
}

function generateCombinedQuestion() {
    const coefficients1 = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
    const exponents1 = [Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1];
    const coefficients2 = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
    const exponents2 = [Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1];
    return `f(x) = \\frac{(${coefficients1[0]}x^{${exponents1[0]}} + ${coefficients1[1]}x^{${exponents1[1]}}) \\cdot (${coefficients2[0]}x^{${exponents2[0]}} + ${coefficients2[1]}x^{${exponents2[1]}})}{\\sqrt[${exponents1[0]}]{${coefficients2[0]}x}}`;
}

function previewWorksheet() {
    const title = document.getElementById('title').value;
    const topic = document.getElementById('topic').value;
    const subTopic = document.getElementById('subTopic').value;
    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    
    const questions = generateQuestions(topic, subTopic, numQuestions);
    
    let worksheetHTML = `<h2>${title}</h2>`;
    worksheetHTML += '<p>גזור את הפונקציות הבאות:</p>';
    worksheetHTML += '<div class="worksheet-content"><table class="questions-table"><tr>';
    
    questions.forEach((question, index) => {
        if (index > 0 && index % 3 === 0) {
            worksheetHTML += '</tr><tr>';
        }
        worksheetHTML += `<td dir="ltr">(${index + 1}) \\(${question}\\)<br><br><br><br></td>`;
    });
    
    worksheetHTML += '</tr></table></div>';
    
    document.getElementById('worksheetOutput').innerHTML = worksheetHTML;
    MathJax.typeset();
}

function downloadImage() {
    const element = document.querySelector('.worksheet-content');
    html2canvas(element, { backgroundColor: '#ffffff' }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'worksheet.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}