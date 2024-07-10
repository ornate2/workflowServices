{
	"contents": {
		"384d3f8e-84f6-425a-9636-6d52bcf1f010": {
			"classDefinition": "com.sap.bpm.wfs.Model",
			"id": "poworflow.myworkflow",
			"subject": "MyWorkflow",
			"name": "MyWorkflow",
			"documentation": "po worflow config",
			"lastIds": "62d7f4ed-4063-4c44-af8b-39050bd44926",
			"events": {
				"11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3": {
					"name": "StartEvent1"
				},
				"2798f4e7-bc42-4fad-a248-159095a2f40a": {
					"name": "EndEvent1"
				}
			},
			"activities": {
				"4ffe4055-c538-4164-9182-8e51d6f3dbea": {
					"name": "UserTask1"
				}
			},
			"sequenceFlows": {
				"c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f": {
					"name": "SequenceFlow1"
				},
				"76fc3a53-50f1-4a5d-b884-4c3a12c6447f": {
					"name": "SequenceFlow2"
				}
			},
			"diagrams": {
				"42fa7a2d-c526-4a02-b3ba-49b5168ba644": {}
			}
		},
		"11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3": {
			"classDefinition": "com.sap.bpm.wfs.StartEvent",
			"id": "startevent1",
			"name": "StartEvent1"
		},
		"2798f4e7-bc42-4fad-a248-159095a2f40a": {
			"classDefinition": "com.sap.bpm.wfs.EndEvent",
			"id": "endevent1",
			"name": "EndEvent1"
		},
		"4ffe4055-c538-4164-9182-8e51d6f3dbea": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "podataconfig",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"supportsForward": false,
			"userInterface": "sapui5://workflow_srv.poformdataworkflowuimodule/poformdata.workflowuimodule",
			"recipientUsers": "surajmishra4214@gmail.com",
			"id": "usertask1",
			"name": "UserTask1"
		},
		"c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow1",
			"name": "SequenceFlow1",
			"sourceRef": "11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3",
			"targetRef": "4ffe4055-c538-4164-9182-8e51d6f3dbea"
		},
		"76fc3a53-50f1-4a5d-b884-4c3a12c6447f": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow2",
			"name": "SequenceFlow2",
			"sourceRef": "4ffe4055-c538-4164-9182-8e51d6f3dbea",
			"targetRef": "2798f4e7-bc42-4fad-a248-159095a2f40a"
		},
		"42fa7a2d-c526-4a02-b3ba-49b5168ba644": {
			"classDefinition": "com.sap.bpm.wfs.ui.Diagram",
			"symbols": {
				"df898b52-91e1-4778-baad-2ad9a261d30e": {},
				"53e54950-7757-4161-82c9-afa7e86cff2c": {},
				"6bb141da-d485-4317-93b8-e17711df4c32": {},
				"a6d3dca9-3b5f-4f39-965f-f3f31b88287a": {},
				"528d7940-c4e0-4766-89b0-1e41dcb001ae": {}
			}
		},
		"df898b52-91e1-4778-baad-2ad9a261d30e": {
			"classDefinition": "com.sap.bpm.wfs.ui.StartEventSymbol",
			"x": 100,
			"y": 100,
			"width": 32,
			"height": 32,
			"object": "11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3"
		},
		"53e54950-7757-4161-82c9-afa7e86cff2c": {
			"classDefinition": "com.sap.bpm.wfs.ui.EndEventSymbol",
			"x": 340,
			"y": 100,
			"width": 35,
			"height": 35,
			"object": "2798f4e7-bc42-4fad-a248-159095a2f40a"
		},
		"6bb141da-d485-4317-93b8-e17711df4c32": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "116,116.375 236.24147286593848,116.375",
			"sourceSymbol": "df898b52-91e1-4778-baad-2ad9a261d30e",
			"targetSymbol": "a6d3dca9-3b5f-4f39-965f-f3f31b88287a",
			"object": "c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f"
		},
		"a6d3dca9-3b5f-4f39-965f-f3f31b88287a": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 186.24147286593848,
			"y": 86.75,
			"width": 100,
			"height": 60,
			"object": "4ffe4055-c538-4164-9182-8e51d6f3dbea"
		},
		"528d7940-c4e0-4766-89b0-1e41dcb001ae": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "236.24147286593848,117.125 357.5,117.125",
			"sourceSymbol": "a6d3dca9-3b5f-4f39-965f-f3f31b88287a",
			"targetSymbol": "53e54950-7757-4161-82c9-afa7e86cff2c",
			"object": "76fc3a53-50f1-4a5d-b884-4c3a12c6447f"
		},
		"62d7f4ed-4063-4c44-af8b-39050bd44926": {
			"classDefinition": "com.sap.bpm.wfs.LastIDs",
			"sequenceflow": 2,
			"startevent": 1,
			"endevent": 1,
			"usertask": 1
		}
	}
}