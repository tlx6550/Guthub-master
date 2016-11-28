var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/guthub');
mongoose.connect('mongodb://tlx6550:3550195gt@ds111718.mlab.com:11718/myleolai');
// 材料schema
var IngredientsSchema = new Schema({
    amount: {type: Number, min: 1},
    amountUnits: String,
    ingredientName: String
});

// 食谱schema
var RecipeSchema = new Schema({
    title: String,
    desc: String,
    ingredients: [IngredientsSchema],
    practice: String
});
// 模型
var Recipe = mongoose.model('Recipe', RecipeSchema);

// 列表
exports.list = function (req, res) {
    Recipe.find({}, function (err, doc) {
        res.json(doc);
    });
};

// 详情
exports.detail = function (req, res) {
    //req.params一个数组，包含命名过的路由参数
    Recipe.findOne({_id: req.params.id}, function (err, doc) {
        //向客户端发送 JSON 以及可选的状态码
        res.json(doc);
    });
};

// 新增
exports.add = function (req, res) {
    var recipe = new Recipe(req.body);
    recipe.save(function (err, doc) {
        res.send({state: 1, doc: doc});
    });
};

// 修改
exports.edit = function (req, res) {
    // 删除主键，否则无法保存
    delete req.body._id;

    Recipe.update({_id: req.params.id}, req.body, function (err, doc) {
        res.send({state: 1, doc: doc});
    });
};

// 删除
exports.del = function (req, res) {
    Recipe.remove({_id: req.params.id}, function (err, doc) {
        res.send({state: 1, doc: doc});
    });
};
