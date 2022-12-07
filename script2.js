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
  return sum;
}

async function getValue() {
  // Sélectionner l'élément input et récupérer sa valeur
  let input = document.getElementById("in").value;

  document.getElementById("gelatine").hidden = false
  
  let arrOccurrence = [];
  let arrYears = [
    2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
    2013, 2014, 2015, 2016, 2017, 2018, 2020, 2021,
  ];

  for (let i = 0; i < arrYears.length; i++) {
    arrOccurrence.push(await getOccurrence(input, arrYears[i]));
    document.getElementById("loaderText").innerText = "On récupère les données pour l'année " + arrYears[i];
  }
  // console.log(arrOccurrence);

  document.getElementById("gelatine").hidden = true

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2020",
        "2021",
      ],
      datasets: [
        {
          label: "Occurrence du prénom " + `${input}`,
          data: arrOccurrence,
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
}
