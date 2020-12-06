const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');

const groups = file.split('\n\n').map(g => g.split('\n'));


const getUniqueQuestionsOfGroup = group => {
    const questions = new Set();

    for (const person of group)
        for (const question of person.split(''))
            questions.add(question);

    return questions;
}


// PART 1
const resultPart1 = groups.reduce((sum, group) => sum + getUniqueQuestionsOfGroup(group).size, 0);

console.log('PART 1:', resultPart1);


// PART 2
const resultPart2 = groups.reduce((sum, group) => {
    const uniqueQuestions = getUniqueQuestionsOfGroup(group);
    let questionsEveryoneAnsweredYes = 0;

    for (const question of uniqueQuestions) {
        let everyoneAnsweredYes = true;

        for (const person of group)
            if (person.split('').indexOf(question) === -1) {
                everyoneAnsweredYes = false;
                break;
            }

        if (everyoneAnsweredYes)
            questionsEveryoneAnsweredYes++;
    }

    return sum + questionsEveryoneAnsweredYes;
}, 0);

console.log('PART 2:', resultPart2);