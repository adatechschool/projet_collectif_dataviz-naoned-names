function buildUrl(name, year) {
  return `https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_prenoms-enfants-nes-nantes&q=&rows=100&sort=annee_naissance&facet=prenom&facet=sexe&facet=annee_naissance&refine.annee_naissance=${year}&refine.prenom=${name.toUpperCase()}`;
}

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

async function getBirthPerYear(year, gender) {
  const result = await fetch(buildUrl2(year));
  const result2 = await result.json();
  let sum = 0;
  for (let i = 0; i < result2.records.length; i++) {
    if (result2.records[i].fields.sexe == gender) {
      sum += result2.records[i].fields.occurrence;
    }
  }
  return sum
}

(async () => {
  const first = await getBirthPerYear(2010, "FILLE");
  const second = await getBirthPerYear(2011, "FILLE");

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["2010","2011"],
      datasets: [
        {
          label: "female birth rate",
          data: [first, second],
          borderWidth: 1,
        },
        {
          label: "male birth rate",
          data: [14, 10, 5, 2, 3, 1],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
})();
