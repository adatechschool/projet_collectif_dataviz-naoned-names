// construction de l'URL en fonction des paramètres qui m'intéressent (je récupère l'adresse sur nantes métropole en rafinant les données)
// https://data.nantesmetropole.fr/explore/dataset/244400404_prenoms-enfants-nes-nantes/api/
function buildUrl2(year) {
  //return `https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_prenoms-enfants-nes-nantes&q=&rows=1000&sort=annee_naissance&facet=prenom&facet=sexe&facet=annee_naissance&refine.annee_naissance=${year}`;
  return `https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_prenoms-enfants-nes-nantes&q=&rows=1000&sort=annee&facet=prenom&facet=sexe&facet=annee&refine.annee=${year}`;
};

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

// Je fais la même mais version async (+ lisible)
async function getBirthPerYear(year, gender) {
  const result = await fetch(buildUrl2(year));
  const result2 = await result.json();
  console.log(result2)
  let sum = 0;
  for (let i = 0; i < result2.records.length; i++) {
    if (result2.records[i].fields.enfant_sexe == gender) {
      sum += result2.records[i].fields.nombre_occurrences;
      console.log(result2.records[i].fields.nombre_occurrences)
    }
  }
  return sum;
  // un return dans une fonction async ça donne une promesse => comment faire ? 
};

// je créé une fonction asynchrone anonyme qui s'appelle elle même 
// (ne pas trop chercher à comprendre, conseil donné par Ian pour "sortir" les valeurs de retour de getBirthPerYear)
// (il existe surement une façon plus simple de faire)
(async () => {
  // const first = await getBirthPerYear(2010, "FILLE");
  // const second = await getBirthPerYear(2011, "FILLE");

  let arrBirthRateF = [];
  let arrBirthRateM = [];
  let arrYears = [
    2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
  ];

  for (let i = 0; i < arrYears.length; i++) {
    document.getElementById("loaderText").innerText = "On récupère les données pour l'année " + arrYears[i];
    arrBirthRateF.push(await getBirthPerYear(arrYears[i], "F"));
    arrBirthRateM.push(await getBirthPerYear(arrYears[i], "M"));
  }
  
  document.getElementById("gelatine").remove();

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
        "2019",
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

