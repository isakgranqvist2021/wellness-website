import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const pageContentSchema = new Schema({
    navigation: {
        img1: {
            type: String,
            default: 'main-logo.png'
        }
    },
    pricing: {
        title1: {
            type: String,
            default: 'Pricing'
        },
        title2: {
            type: String,
            default: 'EMS training'
        },
        title3: {
            type: String,
            default: 'Ultrasound abdominal training'
        },
        title4: {
            type: String,
            default: 'Additional offers'
        },
        ul1: {
            type: Array,
            default: [
                'Monthly subscription: valid for 30 days (10 TE *) CHF 550',
                '3 month subscription: valid max. 120 days (24 TE / CHF 41) CHF 990',
                '6 month subscription: valid max. 210 days (48 TE / CHF 35) CHF 1,700',
                'Annual subscription: valid for 12 months (96 TE / CHF 26) CHF 2,750'
            ]
        },
        ul2: {
            type: Array,
            default: [
                'Turbo treatment: 6 days in a row (6 TE *) CHF 510',
                '2 week course: 3 days in a row (6 TE) CHF 510',
                '10 subscription: valid 21 days (1 TE / CHF 80) CHF 800',
                'Monthly subscription: valid for 30 days (12 TE / CHF 75) CHF 900',
                '2 month subscription: valid for a maximum of 90 days (24 TE / CHF 70) CHF 1,680',
                '3 month subscription: valid max. 120 days (36 TE / CHF 65) CHF 2,340',
                '6 month subscription: valid max. 210 days (80 TE / CHF 50) CHF 3,990',
                'Annual subscription: valid for 12 months (96 TE / CHF 45) CHF 4,770'
            ]
        },
        ul3: {
            type: Array,
            default: [
                'Bio-impedance analysis: CHF 60',
                'Vital substances and nutritional advice: including bio scan analysis (measuring blood instead of taking) CHF 120'
            ]
        }
    },
    emsTraining: {
        title1: {
            type: String,
            default: 'Ems Training'
        },
        title2: {
            type: String,
            default: 'BENEFITS OF EMS-TRAINING'
        },
        ul1: {
            type: Array,
            default: [
                'Joint-friendly training without having to lift heavy weights',
                'Strength and endurance, including cardio training',
                'Targeted muscle building (for example in the event of injuries)',
                'Building and strengthening the back muscles',
                'Slimming, shaping and firming the body',
                'Reduction of musculoskeletal pain',
                'Cellulite reduction',
                'Skin tightening',
                'Release muscle tension',
                'Improve mobility',
                'Stress relief'
            ]
        },
        title3: {
            type: String,
            default: 'EMS TRAINING IS VERSATILE'
        },
        ul2: {
            type: Array,
            default: [
                'The electrical muscle stimulation is ideal for back problems',
                'With the XBODY device you can activate and strengthen the striated muscles of the upper body in a targeted and comprehensive manner. The result is a strong, relaxed and mobile back.',
                'EMS technology is also suitable for strength training and sports injuries: you can build and maintain muscles in a targeted manner without stressing the joints.',
                'Muscle building in the right place. It\'s easy with XBODY!',
                'Within a very short time you will achieve a maximum increase in muscle mass and generate a high increase in performance.',
                'The EMS training method is ideal for people who cannot achieve their goals with conventional fitness methods.'
            ]
        },
        title4: {
            type: String,
            default: 'EMS training is efficient'
        },
        ul3: {
            type: Array,
            default: [
                'EMS training takes around 20 minutes. During this time, each individual muscle group contracts up to 180 times - ten times compared to conventional training. All this with full muscle power!',
                'The efficient and intensive training with the XBODY device enables you to achieve maximum training effect in the shortest possible time. Your muscles will be formed faster and stronger and your fat will be burned faster. This is not possible with conventional training methods.',
                'EMS (electrical muscle stimulation) can be used for training purposes or for health care. The device sends the impulses to the skin directly via the muscles via electrodes. You make them contract, much like normal movement.',
                'The electrodes stimulate and promote the entire musculature or just individual muscle groups. In this way, the otherwise weaker parts of the body can also be strengthened.',
                'Because all muscles are working at the same time, 20 to 25 minutes of training is enough.'
            ]
        }
    },
    abdonimalTraining: {
        title1: {
            type: String,
            default: 'Abdominal Training'
        },
        paragraph1: {
            type: String,
            default: 'Due to the effect of the ultrasonic waves in connection with physical activity, the fat pads resp. the fat, about 1400 kcal of energy, is released into the lymph and venous flow. With simultaneous observance resp. Maintaining the calorie balance (approx. 2000 Kcal / day for women and approx. 3000 Kcal / day for men), you lose unwanted centimeters without feeling hungry.',
        },
        paragraph2: {
            type: String,
            default: 'We achieve extraordinary results in record time because we respect the natural body functions and accelerate the following processes:'
        },
        title2: {
            type: String,
            default: 'FAT REDUCTION',
        },
        paragraph3: {
            type: String,
            default: 'This works vigorously, in a targeted manner and without endangering the body. Thanks to the ultrasonic waves, the body breaks down up to 1400 kcal of energy with each session.'
        },
        title3: {
            type: String,
            default: 'LYMPH DRAINAGE'
        },
        paragraph4: {
            type: String,
            default: 'As part of the Fitsonic method, an important process that is accelerated by the warming of the belt and physical activity.'
        },
        title4: {
            type: String,
            default: 'VASCULAR Dilation'
        },
        paragraph5: {
            type: String,
            default: 'Here we can see a similar phenomenon as with lymphatic drainage. The transport of fatty acids to the muscles is supported so that the fatty acids can be burned.'
        },
        title5: {
            type: String,
            default: 'ENERGY BALANCE'
        },
        paragraph6: {
            type: String,
            default: 'In order for the energy balance to be correct, the energy already released in the body must be taken into account when adding calories.'
        },
        paragraph7: {
            type: String,
            default: 'The FITSONIC abdominal training is ideal for people who cannot reach their body size with conventional methods.'
        },
        title7: {
            type: String,
            default: 'Success documentation'
        }
    },
    lightTherapy: {

    },
    openingTimes: {
        title1: {
            type: String,
            default: 'Location & Opening Times'
        },
        paragraph1: {
            type: String,
            default: 'Monday to Friday: 7.30 a.m. - 8.00 p.m.'
        },
        paragraph2: {
            type: String,
            default: 'Saturday: 9 a.m. - 3 p.m.'
        },
        paragraph3: {
            type: String,
            default: 'Our Location: St. Johanns-Vorstadt 74'
        },
    },
    home: {
        title1: {
            type: String,
            default: 'What is Lorem Ipsum?'
        },
        paragraph1: {
            type: String,
            default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        button1: {
            type: String,
            default: 'Book An Appointment'
        },
        img1: {
            type: String,
            default: 'default-home.jpg'
        }
    },
    bookingWindow: {
        button1: {
            type: String,
            default: 'Book An Appointment'
        }
    },
    about: {
        title1: {
            type: String,
            default: 'About'
        },
        title2: {
            type: String,
            default: 'What is Lorem Ipsum?'
        },
        paragraph1: {
            type: String,
            default: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose(injected humour and the like).'
        },
        paragraph2: {
            type: String,
            default: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose(injected humour and the like).'
        },
        img1: {
            type: String,
            default: 'default-about1.jpg'
        },
        img2: {
            type: String,
            default: 'default-about2.jpg'
        }
    }
});

const PageContentModel = mongoose.model('PageContent', pageContentSchema);

async function getContent(field) {
    try {
        const pageContent = await PageContentModel.findOne({}).select({
            _id: 0,
            __v: 0,
            accessor: 0
        }).lean().exec();
        if (!field) {
            return Promise.resolve(pageContent);
        } else {
            return Promise.resolve(pageContent[field]);
        }

    } catch (err) {
        return Promise.reject(err);
    }
}

async function updateContent(update) {
    try {
        const result = await PageContentModel.findOneAndUpdate({
            accessor: 100
        }, update).lean().exec();
        delete result.__v;
        delete result._id;
        delete result.accessor;
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function createPageContent() {
    try {
        return await new PageContentModel().save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function dropCollection() {
    try {
        return await PageContentModel.collection.drop();
    } catch (err) {
        return Promise.reject(err);
    }
}

export default {
    getContent,
    updateContent,
    createPageContent,
    dropCollection
};