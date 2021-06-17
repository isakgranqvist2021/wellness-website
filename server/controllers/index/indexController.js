import pageContentModel from "../../models/pageContent.model";

async function index(req, res) {
    const content = await pageContentModel.getContent();
    return res.json({
        message: '',
        success: true,
        data: content
    });
}

export default index;