const cds = require('@sap/cds');
const cron = require('node-cron');

module.exports = cds.service.impl(async function () {
    this.on('fetchData', fetchData);
    this.on('READ', 'SavingsPOSet', onReadSavingsPOSet)

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
            path: '/ZMM_PO_SAVING_SRV/SavingsPOSet'
        });

        const poData = response;
        console.log("Data fetched successfully:", poData);

        for (const po of poData) {
            console.log("Triggering workflow for PO:", po.PONumber);
            await triggerWorkflow(po);
            console.log("Updating SAP with trigger status for PO:", po.PONumber);
            //await updateSAP(po.PONumber, 'Triggered');
        }

        return 'Workflows triggered successfully';
    } catch (error) {
        console.error('Error in fetchData:', error);
        return 'Failed to trigger workflows';
    }
}


async function triggerWorkflow(po) {
    try {
        const service2 = await cds.connect.to("workflow");
        
        const context = {
            CreateSaving: "",
            Cluster: "",
            Category: "",
            ProjectDes: "",
            Region: "",
            LastYearPONo: "",
            LastYearPOValue: "",
            Attachment: "",
            QuatedValue: "",
            Currency: "",
            OrderValue: "",
            Savings: "",
            SavingsPer: "",
            SavingType: "",
            BFMValidation: "",
            SavingsDistribution: "",
            YOYSavingFunction: "",
            PONumber: po.PONumber,
            Buyer: po.Buyer,
            POValue: po.POValue,
            POCurrency: po.POCurrency,
            VendorName: po.VendorName
        };

        let data = {
            definitionId: 'poworflow.myworkflow',
            context: context
        }

        //let wfPayload = JSON.stringify(data);
        //console.info('WF Payload:', wfPayload);

        const wfResponse = await service2.send({ method: 'POST', path: "/rest/v1/workflow-instances", data: data });

        console.log('WF Res:', wfResponse);
         
         
        /*service2.tx(req).send({ method: 'POST', path: "/rest/v1/workflow-instances", data }).then((res) => {
            console.log(res);
            console.log("Instance " + res.id + " Created Successfully")
     
            //resolve(res);
        })
            .catch((err) => {
                console.log("Workflow err:", err);
                //handleResponseError(err)
                //req.reject(err);
            });*/

        // const workflowUrl = 'https://<workflow-service-url>/workflow/rest/v1/workflows';
        // const payload = {
        //     definitionId: '',
        //     context: {
        //         poNumber: po.PONumber,
        //     }
        // };

        // const response = await axios.post(workflowUrl, payload, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // });

        //console.log(`Workflow triggered for PO ${po.PONumber}:`, response.data);
    } catch (error) {
        console.error(`Error triggering workflow for PO ${po.PONumber}:`, error);
        throw error;
    }
}




async function updateSAP(poNumber, status) {
    console.log("Updating SAP for PO:", poNumber, "with status:", status);
    const odataService = await cds.connect.to('WiproOdata');
    const updateResponse = await odataService.send({
        method: 'PATCH',
        path: `/ZMM_PO_SAVING_SRV/SavingsPOSet(${poNumber})`,
        data: {
            TriggerStatus: status
        }
    });
    return updateResponse;
}


function scheduleJob() {
    cron.schedule('0 0 * * * *', async () => {
        console.log('Cron job is running every 20 seconds!');

        try {
            const srv = await cds.connect.to('POService');
            await srv.tx().send('fetchData');
            console.log("success!")
        } catch (error) {
            console.error('Something went wrong. Scheduled task failed:', error);
            throw error;
        }
    });
}

async function onReadSavingsPOSet(req) {
    try {
        console.log("Fetching data from OData service...");
        const odataService = await cds.connect.to('WiproOdata');
        const response = await odataService.send({
            method: 'GET',
            path: '/ZMM_PO_SAVING_SRV/SavingsPOSet'
        });

        console.log("Data fetched successfully:", response);

        /*for (const po of poData) {
            console.log("Triggering workflow for PO:", po.PONumber);
        }

        return { message: 'Workflows triggered successfully' };*/
        return response;
    } catch (error) {
        console.trace('Error in fetchData:', error);
        return [];
    }
}