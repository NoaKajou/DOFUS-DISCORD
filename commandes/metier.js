import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const metiers = {
  paysan: {
    titre: "🌾 Monter Paysan",
    description:
`Voici un guide pour monter Paysan efficacement (source : [Gamosaurus](https://www.gamosaurus.com/jeux/dofus/dofus-unity-metier-paysan-table-dxp-et-ressources-pour-les-crafts)) :

\`\`\`
Niveaux      Recette                      Quantités
0-10         Pain d’Incarnam              Blé x308 (77 crafts)
10-20        Michette                     Blé x2535 (507 crafts)
20-30        Beignet Carasau              Orge x1616, Ortie x404 (404 crafts)
30-40        Fougasse                     Orge x1835, Ortie x367 (367 crafts)
40-50        Pain aux Flocons d’Avoine    Avoine x1775, Sauge x355, Aubergine x355 (355 crafts)
50-60        Pain de Mie                  Avoine x1710, Sauge x342, Haricot x342 (342 crafts)
60-70        Briochette                   Houblon x1690, Trèfle à 5 feuilles x338, Cendres Éternelles x338 (338 crafts)
70-80        Pain Consistant              Houblon x1670, Trèfle à 5 feuilles x334, Cerise x334 (334 crafts)
80-90        Biscotte                     Lin x1655, Menthe Sauvage x331, Sang de Scorbute x331 (331 crafts)
90-100       Pain d’Épice                 Lin x1640, Menthe Sauvage x328, Épices x328 (328 crafts)
100-110      Pain de Seigle               Seigle x1950, Orchidée Freyesque x325, Eau Potable x325 (325 crafts)
110-120      Pain des Villes              Seigle x1944, Orchidée Freyesque x324, Poudre de Perlinpainpain x324 (324 crafts)
120-130      Pain aux Céréales            Malt x1938, Edelweiss x323, Poudre Temporelle x323 (323 crafts)
130-140      Borodinski                   Malt x1926, Edelweiss x321, Résine x321 (321 crafts)
140-150      Pain Gre                     Chanvre x1920, Graine de Pandouille x320, Mesure de Sel x320 (320 crafts)
150-160      Mantou                       Chanvre x1920, Graine de Pandouille x320, Mesure de Poivre x320 (320 crafts)
160-170      Tortilla                     Maïs x2233, Ginseng x638, Citron x319 (319 crafts)
170-180      Pain des Champs              Maïs x2226, Ginseng x636, Feuille de Salace x318 (318 crafts)
180-190      Pain Tahde                   Millet x2226, Belladone x636, Huile à frire x318 (318 crafts)
190-200      Brioche Dorée                Millet x2219, Belladone x634, Oignon x317 (317 crafts)
\`\`\`
Pour chaque tranche, fabrique la recette indiquée avec les ressources listées pour optimiser ton XP.`,
  couleur: 0xf1c40f
  },
  alchimiste: {
    titre: "🧪 Monter Alchimiste",
    description:
`Voici un guide pour monter Alchimiste efficacement (source : [Gamosaurus](https://www.gamosaurus.com/jeux/dofus/dofus-unity-metier-alchimiste-table-dxp-et-ressources-pour-les-crafts)) :

\`\`\`
Niveaux      Recette                        Quantités
0-10         Potion de Mini-Soin            Ortie x308 (77 crafts)
10-20        Potion de Rappel               Ortie x595, Eau Potable x119 (119 crafts)
20-30        Potion de Mini-Soin Supérieure Sauge x1616, Blé x404 (404 crafts)
30-40        Potion de Raide Dite           Sauge x1840, Blé x368 (368 crafts)
40-50        Potion de Soin                 Trèfle à 5 feuilles x1777, Oignon x355, Orge x355 (355 crafts)
50-60        Potion Ghetto Raide            Trèfle à 5 feuilles x1715, Graisse Gélatineuse x343, Orge x343 (343 crafts)
60-70        Potion de Soin Supérieure      Menthe Sauvage x1690, Dose de Jus Goûtu x338, Avoine x338 (338 crafts)
70-80        Potion de Pahoa Raide          Menthe Sauvage x1670, Aubergine x334, Avoine x334 (334 crafts)
80-90        Potion Eau de Fée              Orchidée Freyesque x1655, Haricot x331, Houblon x331 (331 crafts)
90-100       Potion Raide Boule             Orchidée Freyesque x1640, Cendres Éternelles x328, Houblon x328 (328 crafts)
100-110      Sang de Likrone                Edelweiss x1950, Lin x325, Cerises x325 (325 crafts)
110-120      Potion Jeud Raide              Edelweiss x1944, Sang de Scorbute x324, Lin x324 (324 crafts)
120-130      Sang de Trooll                 Graine de Pandouille x1938, Épices x323, Seigle x323 (323 crafts)
130-140      Potion Raide Emption           Graine de Pandouille x1926, Eau potable x321, Seigle x321 (321 crafts)
140-150      Potion Bulbique                Ginseng x1926, Poudre de Perlinpainpain x321, Malt x321 (321 crafts)
150-160      Potion Raide Izdaide           Ginseng x1920, Poudre Temporelle x320, Malt x320 (320 crafts)
160-170      Larme d’Eniripsa               Belladone x2233, Résine x319, Chanvre x638 (319 crafts)
170-180      Potion Axel Raide              Belladone x2226, Mesure de Sel x318, Chanvre x636 (318 crafts)
180-190      Potion Revitalisante           Mandragore x2226, Mesure de Poivre x318, Maïs x636 (318 crafts)
190-200      Potion Raide Rêve              Mandragore x2219, Citron x317, Maïs x634 (317 crafts)
\`\`\`
Pour chaque tranche, fabrique la recette indiquée avec les ressources listées pour optimiser ton XP.`,
  couleur: 0x27ae60
  },
  mineur: {
    titre: "⛏️ Monter Mineur",
    description:
`Voici un guide pour monter Mineur efficacement (source : [Gamosaurus](https://www.gamosaurus.com/jeux/dofus/dofus-unity-metier-mineur-table-dxp-et-ressources-pour-les-crafts)) :

\`\`\`
Niveaux      Recette             Quantités
0-10         Ferrite             Fer x770 (77 crafts)
10-20        Eau Ferrugineuse    Fer x240, Eau Potable x240 (24 crafts)
20-40        Aluminite           Fer x2350, Cuivre x2350 (235 crafts)
40-60        Ébonite             Fer x1910, Cuivre x1910, Bronze x1910 (191 crafts)
60-80        Magnésite           Fer x1770, Cuivre x1770, Bronze x1770, Kobalte x1770 (177 crafts)
80-100       Bakélélite          Cuivre x1690, Bronze x1690, Kobalte x1690, Manganèse x1690 (169 crafts)
100-120      Kouartz             Bronze x1650, Kobalte x1650, Manganèse x1650, Étain x825, Silicate x825 (165 crafts)
120-140      Kriptonite          Bronze x1620, Kobalte x1620, Manganèse x1620, Étain x810, Silicate x810, Argent x1620 (162 crafts)
140-160      Kobalite            Kobalte x1600, Manganèse x1600, Étain x800, Silicate x800, Argent x1600, Bauxite x1600 (160 crafts)
160-180      Rutile              Kobalte x1590, Manganèse x1590, Étain x795, Silicate x795, Argent x1590, Bauxite x1590, Or x1590 (159 crafts)
180-200      Pyrute              Kobalte x1570, Étain x785, Silicate x785, Argent x1570, Bauxite x1570, Or x1570, Cendrepierre x785, Dolomite x785 (157 crafts)
\`\`\`
Pour chaque tranche, fabrique la recette indiquée avec les ressources listées pour optimiser ton XP.`,
  couleur: 0x7f8c8d
  },
  bucheron: {
    titre: "🌳 Monter Bucheron",
    description:
`Voici un guide pour monter Bucheron efficacement (source : [Gamosaurus](https://www.gamosaurus.com/jeux/dofus/dofus-unity-metier-bucheron-table-dxp-et-ressources-pour-les-crafts)) :

\`\`\`
Niveaux      Recette                      Quantités
0-20         Planches Agglomérées         Frêne x5230 (523 crafts)
20-40        Planches Contreplaquées      Frêne x3560, Châtaigner x3560 (356 crafts)
40-60        Planches à griller           Frêne x2870, Châtaigner x2870, Noyer x2870 (287 crafts)
60-80        Planches de Surf             Frêne x2660, Châtaigner x2660, Noyer x2660, Chêne x2660 (266 crafts)
80-100       Planches à repasser          Érable x2550, Bombu x2550, Noyer x2550, Chêne x2550 (255 crafts)
100-120      Planches de Toilette         Érable x2480, Bombu x2480, If x2480, Chêne x2480, Oliviolet x1240, Pin x1240 (248 crafts)
120-140      Planches à Pâtisserie        Érable x2430, Bombu x2430, If x2430, Bambou x2430, Merisier x2430, Oliviolet x1215, Pin x1215 (243 crafts)
140-160      Planches de Gravure          Noisetier x2410, Ébène x2410, If x2410, Bambou x2410, Merisier x2410, Oliviolet x1205, Pin x1205 (241 crafts)
160-180      Planches à Pain              Noisetier x2380, Ébène x2380, If x2380, Bambou x2380, Kalyptus x2380, Merisier x2380, Charme x2380 (238 crafts)
180-200      Planches à Dessin            Noisetier x2360, Ébène x2360, Orme x2360, Bambou x2360, Kalyptus x2360, Merisier x2360, Charme x2360, Bambou Sombre x2360 (236 crafts)
\`\`\`
Pour chaque tranche, fabrique la recette indiquée avec les ressources listées pour optimiser ton XP.`,
  couleur: 0x2ecc71
  },
  pecheur: {
    titre: "🎣 Monter Pêcheur",
    description:
`Voici un guide pour monter Pêcheur efficacement (source : [Gamosaurus](https://www.gamosaurus.com/jeux/dofus/dofus-unity-metier-pecheur-table-dxp-et-ressources-pour-les-crafts)) :

\`\`\`
Niveaux      Recette                      Quantités
0-10         Goujon en tranche            Goujon x308 (77 crafts)
10-20        Beignet de Greuvette         Greuvette x1014 (507 crafts)
20-30        Truite Flambée               Truite x1616, Ortie x404 (404 crafts)
30-40        Bâton de Crabe               Crabe Surimi x1840, Ortie x368 (368 crafts)
40-50        Poisson-chaton fumé          Poisson-Chaton x1777, Cerise x355, Sauge x355 (355 crafts)
50-60        Poisson Pané Frit            Poisson Pané x1715, Sang de Scorbute x343, Sauge x343 (343 crafts)
60-70        Carpe Vapeur                 Carpe d’Iem x1690, Épices x338, Trèfle à 5 Feuilles x338 (338 crafts)
70-80        Sardine à l’Étouffée         Sardine Brillante x1670, Eau Potable x334, Trèfle à 5 feuilles x334 (334 crafts)
80-90        Brochet Farci                Brochet x1655, Poudre Perlinpainpain x331, Menthe Sauvage x331 (331 crafts)
90-100       Kralamoure Grillé            Kralamoure x1640, Poudre de Temporelle x328, Menthe Sauvage x328 (328 crafts)
100-110      Anguille Rôtie               Anguille x1950, Résine x325, Orchidée Freyesque x325 (325 crafts)
110-120      Dorade au four               Dorade Grise x1944, Mesure de Sel x324, Orchidée Freyesque x324 (324 crafts)
120-130      Perche sautée                Perche x1938, Mesure de Poivre x323, Edelweiss x323 (323 crafts)
130-140      Aile de Raie                 Raie Bleue x1926, Citron x321, Edelweiss x321 (321 crafts)
140-150      Salace de Lotte              Lotte x1926, Salace x321, Graines de Pandouille x321 (321 crafts)
150-160      Aileron de Requin            Requin Marteau-Faucille x1920, Huile à Frire x320, Graines de Pandouille x320 (320 crafts)
160-170      Bar grillé                   Bar Rikain x2233, Oignon x319, Ginseng x638 (319 crafts)
170-180      Estouffade de Morue          Morue x2226, Graisse Gélatineuse x318, Ginseng x636 (318 crafts)
180-190      Tanche en Matelote           Tanche x2226, Dose de Jus Goutû x318, Belladone x636 (318 crafts)
190-200      Espadon poêlé                Espadon x2219, Aubergine x317, Belladone x634 (317 crafts)
\`\`\`
Pour chaque tranche, fabrique la recette indiquée avec les ressources listées pour optimiser ton XP.`,
  couleur: 0x3498db
  },
  chasseur: {
    titre: "🍖 Monter Chasseur",
    description:
`Voici un guide pour monter Chasseur efficacement (source : [Gamosaurus](https://www.gamosaurus.com/jeux/dofus/dofus-unity-metier-chasseur-table-dxp-et-ressources-pour-les-crafts)) :

\`\`\`
Niveaux      Recette                        Quantités
0-10         Bouillon de Chair              Viande Intangible x77
10-20        Boulette de Viande             Viande Hachée x244
20-30        Beignet Astrubien              Viande Faisandée x198, Blé x198
30-40        Roulade de Carne               Viande Frelatée x182, Blé x182
40-50        Papillote au Citron            Viande Minérale x176, Orge x176, Citron x176
50-60        Salade Sufokienne              Viande Tendre x171, Orge x171, Salace x171
60-70        Friture Amaknéenne             Viande Ladre x168, Avoine x168, Huile à frire x168
70-80        Parmentier à l’Oignon          Viande Avariée x166, Avoine x166, Oignon x166
80-90        Terrine Bontarienne            Viande Sanguinolente x164, Houblon x164, Graisse gélatineuse x164
90-100       Pot-au-feu Goûteux             Viande Rassie x163, Houblon x163, Dose de jus goûtu x163
100-110      Poêlée Paysanne                Viande Exsudative x162, Lin x162, Aubergine x162
110-120      Pemmican aux Haricots          Viande Séchée x162, Lin x162, Haricot x162
120-130      Grillade Brâkmarienne          Viande Saignante x161, Seigle x161, Cendres Éternelles x161
130-140      Marinade Sucrée-Salée          Viande Persillée x160, Seigle x160, Cerise x160
140-150      Boudin Noir                    Viande Macérée x160, Malt x160, Sang de Scorbute x160
150-160      Daube aux épices               Viande de Brousse x159, Malt x159, Épices x159
160-170      Mijoté Récréatif               Viande Fraîche x159, Chanvre x318, Eau Potable x159
170-180      Filet Mignon                   Viande Maigre x159, Chanvre x318, Poudre de Perlinpainpain x159
180-190      Quenelle Tijan                 Viande Gâtée x158, Maïs x316, Poudre Temporelle x158
190-200      Andouillette de Gibier         Viande Noire x158, Maïs x316, Résine x158
\`\`\`
Pour chaque tranche, fabrique la recette indiquée avec les ressources listées pour optimiser ton XP.`,
    couleur: 0xe74c3c
  }
};

export const metier = {
  data: new SlashCommandBuilder()
    .setName('metier')
    .setDescription('📚 Conseils pour monter un métier')
    .addStringOption(option =>
      option.setName('nom')
        .setDescription('Nom du métier (ex: paysan, alchimiste, mineur...)')
        .setRequired(true)
        .addChoices(
          { name: 'Forgemagie', value: 'forgemagie' },
          { name: 'Paysan', value: 'paysan' },
          { name: 'Alchimiste', value: 'alchimiste' },
          { name: 'Mineur', value: 'mineur' },
          { name: 'Bucheron', value: 'bucheron' },
          { name: 'Pecheur', value: 'pecheur' },
          { name: 'Chasseur', value: 'chasseur' }
        )
    ),
  async execute(interaction) {
    const nom = interaction.options.getString('nom');
    const metier = metiers[nom];
    if (!metier) {
      await interaction.reply({ content: "❌ Métier inconnu.", flags: 64 });
      return;
    }
    const embed = new EmbedBuilder()
      .setColor(metier.couleur)
      .setTitle(metier.titre)
      .setDescription(metier.description)
      .setFooter({ text: 'Source : Gamosaurus.com' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};