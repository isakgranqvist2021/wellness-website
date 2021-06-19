import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    accessor: { // home, about, contact 
        type: String,
        required: true
    },
    content: {
        type: Array,
        default: [String]
    }
});

const ContentModel = mongoose.model('Content', contentSchema);

const initalContent = [
    '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',
    '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',
    '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>'
];

async function create() {
    const data = [{
        accessor: 'prices',
        content: initalContent
    },
    {
        accessor: 'opening times',
        content: initalContent
    },
    {
        accessor: 'about',
        content: initalContent
    },
    {
        accessor: 'ems training',
        content: initalContent
    },
    {
        accessor: 'abdominal training',
        content: initalContent
    },
    {
        accessor: 'light therapy',
        content: initalContent
    },
    ]

    await Promise.all(data.map(async (obj) => {
        return await new ContentModel(obj).save();
    }));
}

async function updateContent(data) {
    try {
        return await ContentModel.findOneAndUpdate({
            _id: data._id
        }, {
            content: data.content
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

async function accessors() {
    try {
        return await ContentModel.find({}).select({
            content: 0
        }).exec();
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

async function find(filter) {
    try {
        return await ContentModel.find(filter);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function drop() {
    try {
        return await ContentModel.collection.drop();
    } catch (err) {
        return Promise.reject(err);
    }
}

export default {
    create,
    drop,
    find,
    accessors,
    updateContent
};