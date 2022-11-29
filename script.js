function buildUrl(name, year) {
    return `https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_prenoms-enfants-nes-nantes&q=&rows=100&sort=annee_naissance&facet=prenom&facet=sexe&facet=annee_naissance&refine.annee_naissance=${year}&refine.prenom=${name.toUpperCase()}`;
  }
  
  function getOccurrence(name, year) {
    fetch(buildUrl(name, year)).then((x) => {
      x.json().then((y) => {
        let sum = 0;
        for (let i = 0; i < y.records.length; i++) {
          sum += y.records[i].fields.occurrence;
        }
        console.log(sum);
      });
    });
  }
  
  getOccurrence("Juliette","2020")
  
  async function getOccurrence(name, year) {
    const result = await fetch(buildUrl(name, year));
    const result2 = await result.json();
    let sum = 0;
    for (let i = 0; i < result2.records.length; i++) {
      sum += result2.records[i].fields.occurrence;
    }
    console.log(sum);
  }
  
  getOccurrence("Jean", "2011");
  getOccurrence("Juliette", "2010");
  getOccurrence("Camille", "2012")
  getOccurrence("Théo", "2002")