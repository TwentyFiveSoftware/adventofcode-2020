const fs = require('fs');

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');


const allergens = new Map();
const ingredients = [];

for (const line of lines) {
    const split = line.split(' (contains ');
    const currIngredients = split[0].split(' ');
    const currAllergens = split[1].replace(')', '').split(', ');

    ingredients.push(...currIngredients);

    for (const a of currAllergens)
        if (allergens.has(a)) {
            const newIngredients = allergens.get(a).filter(i => currIngredients.includes(i));
            allergens.set(a, [...(new Set(newIngredients))]);

        } else
            allergens.set(a, [...(new Set(currIngredients))]);
}

for (let i = 0; i < allergens.size; i++)
    for (const allergen of allergens.keys())
        if (allergens.get(allergen).length === 1) {
            const i = allergens.get(allergen)[0];

            for (const a of allergens.keys())
                if (a !== allergen && allergens.get(a).includes(i))
                    allergens.set(a, allergens.get(a).filter(ingredient => ingredient !== i));
        }


const ingredientsWithAllergens = [...(new Set([...allergens.values()].flat(1)))];
const ingredientsWithoutAllergens = ingredients.filter(i => !ingredientsWithAllergens.includes(i));

const mappedAllergens = [...allergens.keys()].map(allergen => ({allergen, ingredient: allergens.get(allergen)[0]}));
mappedAllergens.sort((a, b) => a.allergen > b.allergen ? 1 : -1);
const canonicalDangerousIngredientList = mappedAllergens.map(a => a.ingredient).join(',');

console.log('PART 1:', ingredientsWithoutAllergens.length);
console.log('PART 2:', canonicalDangerousIngredientList);