const classifier = require('../ai-analysis/classify')

const get = require('../complaints/get-complaints-to-analysis')
const update = require('../complaints/update-ai-classification')


module.exports = () => {
    get(5, (complaints) => {
        complaints.forEach(complaint => {
            classifier('valentini', complaint, (response) => {
                const  analysis = response.data
                update(analysis.analyzed_item.id, analysis.category.description, (saved) =>{
                    if(saved) {
                        console.log(`Classifiead: ${analysis.analyzed_item.id} as ${analysis.category.description}`)
                    }
                })
            })
        });
    })
}


