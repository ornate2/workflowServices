const cds = require('@sap/cds');
const cron = require('node-cron');

module.exports = cds.service.impl(async function () {
    this.on('fetchData', fetchData);

    cds.on('served', () => {
        console.log("Service is served. Scheduling job...");
        scheduleJob();
    });
});

async function fetchData(req) {
    try {
        console.log("Fetching data from OData service...");
        const odataService = await cds.connect.to('WiproOdata');
        const response = await odataService.send({
            method: 'GET',
            path: '/ZMM_PO_SAVING_SRV/'
        });

        const poData = response.d.results;
        console.log("Data fetched successfully:", poData);

        // Step 2: Loop through the PO data and trigger the workflow
        for (const po of poData) {
            console.log("Triggering workflow for PO:", po.PONumber);
        }

        return { message: 'Workflows triggered successfully' };
    } catch (error) {
        console.error('Error in fetchData:', error);
        return { error: 'Failed to trigger workflows' };
    }
}


function scheduleJob() {
    cron.schedule('*/20 * * * * *', async () => {
        console.log('Cron job is running every 20 seconds!');

        try {
            const tx = cds.tx();
            await tx.run(SELECT.from('POService.fetchData'));
            await tx.commit();
        } catch (error) {
            console.error('Something went wrong. Scheduled task failed:', error);
            throw error;
        }
    });
}
