const Color = require('./../models').Color;

const getAllColors = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err, colors;
  [err, colors] = await to(Color.find());

  if (err) return ReE(res, err);

  let colors_json = []
  for (let i in colors){
      let color = colors[i];
      colors_json.push(color.toWeb());
  }

  return ReS(res, {
    colors: colors_json,
  });
}
module.exports.getAllColors = getAllColors;
