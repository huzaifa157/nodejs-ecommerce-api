const Category = require('../models/category');

module.exports.index = async (req, res) => {
    const categoryList = await Category.find();
    if(!categoryList) return res.status(500).json({ success: false });
    res.status(200).json(categoryList);
}

module.exports.finding = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json(category);
}

module.exports.creatingCategory = async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });
    category = await category.save();
    if(!category) return res.status(500).send('Category cannot be created');
    res.status(201).json(category);
}

module.exports.updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    }, { new: true });
    if(!category) return res.status(404).send('Category cannot be updated');
    res.status(200).json(category);
}

module.exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        if(category){
            return res.status(200).json({ success: true, message: 'Category deleted successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
    } catch(err) {
        return res.status(500).json({ success: false, error: err });
    }
}
