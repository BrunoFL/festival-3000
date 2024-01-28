// @ts-check
const { test, expect } = require('@playwright/test');

test('regle', async ({ page }) => {
  await page.setViewportSize({ 'width': 720, 'height': 1080 })
  await page.goto("file://" + __dirname + "/../regle.html");
  let cpt = 0;

  for (let cpt = 0; cpt < 8; cpt++) {
    await page.screenshot({ path: 'cards/regle' + cpt + '.png', type: 'png' });
    cpt++;
  }
});


test('event', async ({ page }) => {
  await page.setViewportSize({ 'width': 720, 'height': 1080 })
  await page.goto("file://" + __dirname + "/../event.html");
  const content = await page.content()
  let cpt = 0;

  for (const card of events) {
    await page.setContent(content
      .replace('$text', card.text.toLowerCase())
    )

    // Expect a title "to contain" a substring.
    await page.screenshot({ path: 'cards/event' + cpt + '.png', type: 'png' });
    cpt++;
  }
});

test('objectifs', async ({ page }) => {
  await page.setViewportSize({ 'width': 720, 'height': 1080 })
  await page.goto("file://" + __dirname + "/../objectif.html");
  const content = await page.content()
  let cpt = 0;

  for (const card of objectifs) {
    await page.setContent(content
      .replace('$text', card.text.toLowerCase())
    )

    // Expect a title "to contain" a substring.
    await page.screenshot({ path: 'cards/objectif' + cpt + '.png', type: 'png' });
    cpt++;
  }
});

test('action', async ({ page }) => {
  await page.setViewportSize({ 'width': 720, 'height': 1080 })
  await page.goto("file://" + __dirname + "/../action.html");
  const content = await page.content()
  let cpt = 0;

  for (const card of actions) {
    await page.setContent(content
      .replace('$text', card.text.toLowerCase())
    )

    // Expect a title "to contain" a substring.
    await page.screenshot({ path: 'cards/action' + cpt + '.png', type: 'png' });
    cpt++;
  }
});

test('artistes', async ({ page }) => {
  await page.setViewportSize({ 'width': 720, 'height': 1080 })
  await page.goto("file://" + __dirname + "/../artiste.html");
  const content = await page.content()
  let cpt = 0;


  for (const card of artistes) {
    let type = ""
    switch (card.back) {
      case colorClown:
        type = "Clown";
        break;
      case colorDanse:
        type = "Danseur Comedien"
        break;
      case colorHumour:
        type = "Humoriste"
        break;
      case colorMagicien:
        type = "Magicien";
        break;
      case colorMusic:
        type = "Musicien Chanteur"
        break;
    }
    await page.setContent(content
      .replace('$back', card.back)
      .replace('$type', type.toLowerCase())
      .replace('$title', card.title.toLowerCase())
      .replace('$level', '' + card.level)
      .replace('$pop', '' + card.pop)
      .replace('$prix', new Intl.NumberFormat('fr-FR').format(card.prix))
      .replace('$artiste', '' + card.img)
      .replace('$text', card.text)
    )

    // Expect a title "to contain" a substring.
    await page.screenshot({ path: 'cards/' + cpt + '.png', type: 'png' });
    cpt++;
  }
});


test('equipement', async ({ page }) => {
  await page.setViewportSize({ 'width': 720, 'height': 1080 })
  await page.goto("file://" + __dirname + "/../equi.html");
  const content = await page.content()
  let cpt = 0;

  for (const card of equi) {
    let type
    let letter
    switch (card.type) {
      case "acces":
        letter = 1
        type = "accessibilite"
        break;
      case "service":
        letter = 2
        type = "services"
        break;
      case "nec":
        letter = 3
        type = "essentiel"
        break;
      default:
        type = ''
        break;
    }

    for (let count = 0; count < card.nb; count++) {
      await page.setContent(content
        .replace('$title', card.title.toLowerCase())
        .replace('$letter', '' + letter)
        .replace('$prix', new Intl.NumberFormat('fr-FR').format(card.prix))
        .replace('$artiste', '' + card.img)
        .replace('$level', '' + card.level)
        .replace('$text', "+ " + card.level + ' ' + type)
      )

      // Expect a title "to contain" a substring.
      await page.screenshot({ path: 'cards/equi' + cpt + '_' + count + '.png', type: 'png' });
      cpt++;
    }
  }
});


const colorHumour = '#91ffc1';
const colorMagicien = '#1976ec';
const colorMusic = '#dcbd61';
const colorDanse = '#e138ee';
const colorClown = '#ba9976';

const events = [
  { "text": "La ville prete le petit train, accessibilite +1" },
  { "text": "Une manifestation qui bloque les bus accessibilite -1" },
  { "text": "Marie a encore perdu toute ses affaires" },
  { "text": "Agression sexuelle, un artiste au choix ne vient pas, les etoiles sont supprimees" },
  { "text": "Philippe Etchebest, musicien 3 etoiles vient faire un feat sans prévenir" },
  { "text": "Greve du personne, essentiel -1" },
  { "text": "Green walk organisee par les festivaliers, essentiel +1" },
  { "text": "Des kines font une animation gratuite, service +1" },
  { "text": "Defaut de fabrication sur les preservatifs, service -1" },
  { "text": "Punaise de lit dans les fauteuils, service -1" },
  { "text": "Operation casquette, service +1" },
  { "text": "Grand soleil, +3 points de victoire" },
  { "text": "Avis de tempete, -3 points de victoire" },
]

const actions = [
  { "text": "Peut racheter un artiste à un autre joueur, au double du prix minimum" },
  { "text": "Peut voler un equipement à un autre joueur" },
  { "text": "Empoisonner l'eau, -1 essentiel" },
  { "text": "Laxatifs dans la nourriture, detruit un equipement toilettes" },
  { "text": "Bus en panne, -1 accessibilité" },
  { "text": "Preavis de greve, -1 accessibilité +1 service" },
  { "text": "Boules puantes, -1 service" },
  { "text": "Chaises low cost, -1 service" },
  { "text": "Ingenieur du son en stage, -1 essentiel -1 service" },
  { "text": "mauvaise pub, -10 visiteurs" },
  { "text": "attaque informatique, -1 essentiel" },
  { "text": "coupure d’eau, detruit un équipement eau et 1 toilette + 1 service" },
  { "text": "redressement fiscal, -100 argent" },
  { "text": "Destruction de la biere, -1 service" },
  { "text": "Merchs et goodies, +50 argent" },
  { "text": "Marketing, +10 visiteurs" },
  { "text": "Tonnelle, +50 capacité" },
  { "text": "preventes, +100 argent" },
  { "text": "cashless, +50 argent +1 service" },
  { "text": "sponsors, +50 argent" },
  { "text": "drogues, +2 etoile à un artiste" },
  { "text": "polemique, -2 etoile à un artiste -10 visiteurs" },
  { "text": "cocaine achète un clown -50%" },
  { "text": "concorde : emprunter le Phil Collins d'Alaska d'un autre joueur, partager les etoiles (4/1) et beneficier des mêmes visiteurs" },
]

const objectifs = [
  {
    "text": "Avoir 5 artistes de categorie differentes"
  }, {
    "text": "Avoir 3 artistes de la meme categorie"
  }, {
    "text": "Avoir 10 services"
  }, {
    "text": "Avoir 3 duos"
  }, {
    "text": "Que des artises de 1 2 ou 3 etoiles"
  }, {
    "text": "Que des artises de 4 ou 5 etoiles"
  }, {
    "text": "Remplir son lieu a 5 visiteur pres"
  }, {
    "text": "Avoir que des hommes"
  }, {
    "text": "Avoir que des femmes"
  }, {
    "text": "Tous les artises ont une polemique"
  }, {
    "text": "Aucun artiste"
  }
]
const equi = [
  {
    "title": "Parking",
    "level": 4,
    "prix": 50,
    "img": 'parking.jpg',
    "nb": 2,
    "type": "acces"
  }, {
    "title": "Signalisation",
    "level": 1,
    "prix": 10,
    "img": 'panneau.jpg',
    "nb": 2,
    "type": "acces"
  }, {
    "title": "Retransmission TV",
    "level": 3,
    "prix": 40,
    "img": 'camera.jpg',
    "nb": 2,
    "type": "acces"
  }, {
    "title": "BUS",
    "level": 2,
    "prix": 30,
    "img": 'bus.jpg',
    "nb": 2,
    "type": "acces"
  }, {
    "title": "Place PMR",
    "level": 2,
    "prix": 20,
    "img": 'pmr.jpg',
    "nb": 2,
    "type": "acces"
  }, {
    "title": "Stand de bouffe",
    "level": 3,
    "prix": 40,
    "img": 'bouffe.jpg',
    "nb": 1,
    "type": "service"
  },
  {
    "title": "Buvette",
    "level": 2,
    "prix": 30,
    "img": 'buvette.jpg',
    "nb": 1,
    "type": "service"
  },
  {
    "title": "Preservatif",
    "level": 1,
    "prix": 10,
    "img": 'capote.jpeg',
    "nb": 2,
    "type": "service"
  },
  {
    "title": "Stand prevention VSS",
    "level": 1,
    "prix": 20,
    "img": 'prevention.jpg',
    "nb": 1,
    "type": "service"
  },
  {
    "title": "Bar",
    "level": 3,
    "prix": 40,
    "img": 'bar.jpg',
    "nb": 1,
    "type": "service"
  },
  {
    "title": "Bar",
    "level": 3,
    "prix": 40,
    "img": 'bar.jpg',
    "nb": 1,
    "type": "service"
  },
  {
    "title": "Douches",
    "level": 1,
    "prix": 10,
    "img": 'douche.webp',
    "nb": 2,
    "type": "service"
  },
  {
    "title": "Camping",
    "level": 1,
    "prix": 10,
    "img": 'camping.jpg',
    "nb": 2,
    "type": "service"
  },
  {
    "title": "Brumisateur",
    "level": 1,
    "prix": 10,
    "img": 'brumisateur.jpg',
    "nb": 1,
    "type": "service"
  },
  {
    "title": "Boules Quies",
    "level": 1,
    "prix": 10,
    "img": 'quies.jpeg',
    "nb": 3,
    "type": "service"
  },
  {
    "title": "Attraction",
    "level": 3,
    "prix": 40,
    "img": 'attraction.jpg',
    "nb": 3,
    "type": "service"
  },
  {
    "title": "Decoration",
    "level": 2,
    "prix": 30,
    "img": 'deco.jpg',
    "nb": 2,
    "type": "service"
  },
  {
    "title": "Coin VIP",
    "level": 3,
    "prix": 40,
    "img": 'vip.jpg',
    "nb": 1,
    "type": "service"
  },
  {
    "title": "Toilettes",
    "level": 1,
    "prix": 30,
    "img": 'toilettes.jpg',
    "nb": 4,
    "type": "nec"
  },
  {
    "title": "Projecteur",
    "level": 1,
    "prix": 20,
    "img": 'projecteur.jpg',
    "nb": 2,
    "type": "nec"
  },
  {
    "title": "poublles",
    "level": 1,
    "prix": 10,
    "img": 'poubelles.jpg',
    "nb": 3,
    "type": "nec"
  },

  {
    "title": "Sono",
    "level": 1,
    "prix": 20,
    "img": 'sono.jpg',
    "nb": 2,
    "type": "nec"
  },

  {
    "title": "Eau",
    "level": 3,
    "prix": 20,
    "img": 'eau.jpeg',
    "nb": 2,
    "type": "nec"
  },

  {
    "title": "Secouriste",
    "level": 2,
    "prix": 40,
    "img": 'Secour.jpg',
    "nb": 2,
    "type": "nec"
  },
  {
    "title": "Groupe electrogene",
    "level": 3,
    "prix": 30,
    "img": 'elec.jpg',
    "nb": 2,
    "type": "nec"
  },

  {
    "title": "Securite",
    "level": 2,
    "prix": 40,
    "img": 'secu.png',
    "nb": 2,
    "type": "nec"
  },
  {
    "title": "benevoles",
    "level": 1,
    "prix": 10,
    "img": 'benevole.jpg',
    "nb": 3,
    "type": "nec"
  },


]

const artistes = [
  {
    "back": colorHumour,
    "title": "Le gros JDG",
    "level": 4,
    "pop": 18,
    "prix": 120,
    "img": 'jdg.webp',
    "text": "Avant il était drole"
  }, {
    "back": colorHumour,
    "title": "Baptiste lecavide",
    "level": 3,
    "pop": 15,
    "prix": 60,
    "img": 'caplain.webp',
    "text": "Il a trompé sa femme"
  }, {
    "back": colorHumour,
    "title": "Gadel Mamel",
    "level": 1,
    "pop": -2,
    "prix": 25,
    "img": 'gad.webp',
    "text": "Vole un humoriste de 1,2,3 etoiles "
  }, {
    "back": colorHumour,
    "title": "Mcflurry et Calypso",
    "level": 1,
    "pop": 14,
    "prix": 80,
    "img": 'mcfly.webp',
    "text": "Parait qu'ils sont droles"
  }, {
    "back": colorHumour,
    "title": "Paul Nectarine",
    "level": 3,
    "pop": 11,
    "prix": 50,
    "img": 'mirabel.jpg',
    "text": "Salam les khoyas"
  }, {
    "back": colorHumour,
    "title": "Morteau Morille",
    "level": 1,
    "pop": 4,
    "prix": 20,
    "img": 'morteau.webp',
    "text": "Notre référence locale"
  }, {
    "back": colorHumour,
    "title": "Salade Grecos",
    "level": 2,
    "pop": 7,
    "prix": 80,
    "img": 'nikos.webp',
    "text": "Pile +2 ou face -2 visiteurs"
  }, {
    "back": colorHumour,
    "title": "Lerat Fabian",
    "level": 5,
    "pop": 7,
    "prix": 70,
    "img": 'fabian.webp',
    "text": "Risque de s'endormir à tout moment"
  }, {
    "back": colorMagicien,
    "title": "Fabien Olibus",
    "level": 2,
    "pop": 7,
    "prix": 20,
    "img": 'fabien.webp',
    "text": "Pioche une carte action"
  }, {
    "back": colorMagicien,
    "title": "Gandulf",
    "level": 5,
    "pop": 15,
    "prix": 200,
    "img": 'gandalf.webp',
    "text": "Pioche une carte action"
  }, {
    "back": colorMagicien,
    "title": "Happy Rotter",
    "level": 4,
    "pop": 10,
    "prix": 100,
    "img": 'harry.webp',
    "text": "Pioche une carte action"
  }, {
    "back": colorMagicien,
    "title": "David Ironfield",
    "level": 5,
    "pop": 16,
    "prix": 200,
    "img": 'copperfield.webp',
    "text": "Pioche une carte action"
  }, {
    "back": colorMagicien,
    "title": "Juan Tamapate",
    "level": 4,
    "pop": 8,
    "prix": 100,
    "img": 'juan.webp',
    "text": "Pioche une carte action"
  }, {
    "back": colorMagicien,
    "title": "Harry Ouistiti",
    "level": 3,
    "pop": 5,
    "prix": 40,
    "img": 'oudini.webp',
    "text": "Pioche une carte action"
  }, {
    "back": colorMagicien,
    "title": "Tibo le Magnifique",
    "level": 2,
    "pop": 35,
    "prix": 80,
    "img": 'tibo.jpg',
    "text": "Mais qu'il est beau"
  }, {
    "back": colorMusic,
    "title": "Phil Collin D'Alaska",
    "level": 5,
    "pop": 25,
    "prix": 200,
    "img": 'phil.webp',
    "text": "Il est pas beau mon poisson ?"
  }, {
    "back": colorMusic,
    "title": "BigMc et Orly",
    "level": 4,
    "pop": 19,
    "prix": 120,
    "img": 'bigflo.webp',
    "text": "Lezgongue"
  }, {
    "back": colorMusic,
    "title": "Pascal Obistro",
    "level": 3,
    "pop": 10,
    "prix": 80,
    "img": 'obispo.webp',
    "text": "Non disponible sur les platerformes"
  }, {
    "back": colorMusic,
    "title": "David Guetto",
    "level": 2,
    "pop": 16,
    "prix": 150,
    "img": 'guetta.webp',
    "text": "Bip Boup Boup"
  }, {
    "back": colorMusic,
    "title": "Dacia",
    "level": 1,
    "pop": 8,
    "prix": 60,
    "img": 'renaud.webp',
    "text": "Vient avec l'alcool +1 service"
  },
  {
    "back": colorMusic,
    "title": "Marie Vianney",
    "level": 2,
    "pop": 35,
    "prix": 80,
    "img": 'meuveu.jpg',
    "text": "Musique, danse, chant et maths, elle sait tout faire"
  }, {
    "back": colorDanse,
    "title": "Nicopalas Lengrand",
    "level": 3,
    "pop": 7,
    "prix": 50,
    "img": 'nico.webp',
    "text": "Le meilleur"
  }, {
    "back": colorDanse,
    "title": "Pierre Minnet",
    "level": 4,
    "pop": 15,
    "prix": 120,
    "img": 'minnet.png',
    "text": "Irrésistible d'après ma femme"
  }, {
    "back": colorDanse,
    "title": "Pierre Malade",
    "level": 2,
    "pop": 2,
    "prix": 40,
    "img": 'palmade.webp',
    "text": "Conduite hasardeuse -1 accessibilite"
  }, {
    "back": colorDanse,
    "title": "Didier Genial",
    "level": 2,
    "pop": 6,
    "prix": 50,
    "img": 'super.webp',
    "text": "Il est vraiment super"
  }, {
    "back": colorDanse,
    "title": "Tigre Camion",
    "level": 2,
    "pop": 10,
    "prix": 60,
    "img": 'fauve.webp',
    "text": "La meilleure danseuse"
  }, {
    "back": colorDanse,
    "title": "Natalie PortMonsieur",
    "level": 5,
    "pop": 18,
    "prix": 150,
    "img": 'portman.webp',
    "text": "Elle sait tout faire"
  }, {
    "back": colorDanse,
    "title": "Chantale Lachetou",
    "level": 1,
    "pop": 3,
    "prix": 20,
    "img": 'ladesou.webp',
    "text": "Une voix reconnaissable"
  }, {
    "back": colorDanse,
    "title": "Smostache Ravie",
    "level": 2,
    "pop": 35,
    "prix": 80,
    "img": 'smo.jpeg',
    "text": "Une voix reconnaissable"
  }, {
    "back": colorClown,
    "title": "Gerard & Gerald",
    "level": 3,
    "pop": 5,
    "prix": 50,
    "img": 'gerard-merged.png',
    "text": "Insortables, nécessaire -1"
  }, {
    "back": colorClown,
    "title": "AOC",
    "level": 3,
    "pop": 15,
    "prix": 120,
    "img": 'aoc.png',
    "text": "Toujours avec ces casseroles"
  }, {
    "back": colorClown,
    "title": "Eric Ammour",
    "level": 1,
    "pop": 0,
    "prix": 10,
    "img": 'zemmour.webp',
    "text": "Pioche une carte Action"
  }, {
    "back": colorClown,
    "title": "Chris Potdefleur",
    "level": 2,
    "pop": 25,
    "prix": 70,
    "img": 'chris.jpg',
    "text": "Ramene du poulet, +1 service"
  }, {
    "back": colorClown,
    "title": "Jean Luc Melengeons",
    "level": 3,
    "pop": 14,
    "prix": 60,
    "img": 'jl.webp',
    "text": "Il parle bien quand meme"
  }, {
    "back": colorClown,
    "title": "Patrick Pastrami",
    "level": 3,
    "pop": 10,
    "prix": 150,
    "img": 'balkany.webp',
    "text": "Toujours dans les bons coups, service +1"
  }, {
    "back": colorClown,
    "title": "Marlene Chepas",
    "level": 1,
    "pop": 4,
    "prix": 10,
    "img": 'chepa.webp',
    "text": "Au courant de rien"
  }, {
    "back": colorClown,
    "title": "Valerie Pacrette",
    "level": 2,
    "pop": 10,
    "prix": 20,
    "img": 'pecresse.webp',
    "text": "Debout !"
  },


  // Patoche
  {
    "back": colorClown,
    "title": "Patien Sebastick",
    "level": 1,
    "pop": 6,
    "prix": 80,
    "img": 'patoche.webp',
    "text": "1 Patoche 1 étoile, 2 Patoche 2 étoiles ..."
  },
  {
    "back": colorDanse,
    "title": "Seb Patrick",
    "level": 1,
    "pop": 6,
    "prix": 80,
    "img": 'patoche.webp',
    "text": "1 Patoche 1 étoile, 2 Patoche 2 étoiles ..."
  },
  {
    "back": colorMusic,
    "title": "Patoche Sebastien",
    "level": 1,
    "pop": 6,
    "prix": 80,
    "img": 'patoche.webp',
    "text": "1 Patoche 1 étoile, 2 Patoche 2 étoiles ..."
  },
  {
    "back": colorMagicien,
    "title": "Patrick Sebastoche",
    "level": 1,
    "pop": 6,
    "prix": 80,
    "img": 'patoche.webp',
    "text": "1 Patoche 1 étoile, 2 Patoche 2 étoiles ..."
  },
  {
    "back": colorHumour,
    "title": "Trickpas Sebastien",
    "level": 1,
    "pop": 6,
    "prix": 80,
    "img": 'patoche.webp',
    "text": "1 Patoche 1 étoile, 2 Patoche 2 étoiles ..."
  },
  {
    "back": colorClown,
    "title": "Brono",
    "level": 5,
    "pop": 5,
    "prix": 70,
    "img": 'bruno.jpg',
    "text": "Drole ? on sait pas trop"
  }
]
