const Genre = require("./Genre");
const Artist = require("./Artist");
const Album = require("./Album");
const Song = require("./Song");

Genre.belongsToMany(Artist, { through: "genreArtist" });
Artist.belongsToMany(Genre, { through: "genreArtist" });

Song.belongsToMany(Genre, { through: "songGenre" });
Genre.belongsToMany(Song, { through: "songGenre" });

Song.belongsToMany(Artist, { through: "songArtist" });
Artist.belongsToMany(Song, { through: "songArtist" });

Album.belongsTo(Artist);
Artist.hasMany(Album);

Song.belongsTo(Album);
Album.hasMany(Song);
