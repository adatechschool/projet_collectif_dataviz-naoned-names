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
  return sum;
}

(async () => {
  // const first = await getBirthPerYear(2010, "FILLE");
  // const second = await getBirthPerYear(2011, "FILLE");

  let arrBirthRateF = [];
  let arrYears = [
    2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
    2013, 2014, 2015, 2016, 2017, 2018, 2020, 2021,
  ];

  for (let i = 0; i < arrYears.length; i++) {
    await arrBirthRateF.push(await getBirthPerYear(arrYears[i], "FILLE"));
  }
  console.log(arrBirthRateF);

  let arrBirthRateM = [];

  for (let i = 0; i < arrYears.length; i++) {
    await arrBirthRateM.push(await getBirthPerYear(arrYears[i], "GARCON"));
  }
  console.log(arrBirthRateM);

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "line",
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
          label: "female birth rate",
          data: arrBirthRateF,
          borderWidth: 1,
        },
        {
          label: "male birth rate",
          data: arrBirthRateM,
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
