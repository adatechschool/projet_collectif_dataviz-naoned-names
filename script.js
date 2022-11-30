function buildUrl(name, year) {
  return `https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_prenoms-enfants-nes-nantes&q=&rows=100&sort=annee_naissance&facet=prenom&facet=sexe&facet=annee_naissance&refine.annee_naissance=${year}&refine.prenom=${name.toUpperCase()}`;
}

// function getOccurrence(name, year) {
//   fetch(buildUrl(name, year)).then((x) => {
//     console.log(x)
//     x.json().then((y) => {
//       let sum = 0;
//       for (let i = 0; i < y.records.length; i++) {
//         sum += y.records[i].fields.occurrence;
//       }
//       console.log(sum);
//     });
//   });
// }

  async function getOccurrence(name, year) {
    const result = await fetch(buildUrl(name, year));
    const result2 = await result.json();
    let sum = 0;
    for (let i = 0; i < result2.records.length; i++) {
      sum += result2.records[i].fields.occurrence;
    }
    console.log(sum);
  }


function buildUrl2(year) {
  return `https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_prenoms-enfants-nes-nantes&q=&rows=1000&sort=annee_naissance&facet=prenom&facet=sexe&facet=annee_naissance&refine.annee_naissance=${year}`;
}

// function getBirthPerYear(year) {
//   fetch(buildUrl2(year)).then((x) => {
//     console.log(x);
//     x.json().then((y) => {
//       console.log(y);
//       let sum = 0
//       for(let i=0; i< y.records.length; i++) {
//         sum += y.records[i].fields.occurrence;
//       }
//       console.log(sum)
//     })
//   });
// }

async function getBirthPerYear(year, gender) {
  const result = await fetch(buildUrl2(year));
  const result2 = await result.json();
  console.log(result2);
  let sum = 0;
  for(let i=0; i< result2.records.length; i++) {
    if(result2.records[i].fields.sexe == gender){
      sum += result2.records[i].fields.occurrence;
    }
  }
  console.log(sum);
};

getBirthPerYear(2021,"FILLE");
getBirthPerYear(2021, "GARCON");
getOccurrence("Juliette", 2021);


