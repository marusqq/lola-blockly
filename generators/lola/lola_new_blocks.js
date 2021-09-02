Blockly.defineBlocksWithJsonArray([{
  "type": "variable_declaration_in_out_type_block",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "variable_declaration_in_out_type",
      "options": [
        [
          "IN",
          "IN"
        ],
        [
          "OUT",
          "OUT"
        ],
        [
          "INOUT",
          "INOUT"
        ],
        [
          "VAR",
          "VAR"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 15,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "variable_declaration_name_block",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "variable_declaration_name",
      "text": "variable_name"
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "variable_declaration_type_single_block",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "variable_declaration_type",
      "options": [
        [
          "BIT",
          "BIT"
        ],
        [
          "TC",
          "TC"
        ],
        [
          "OC",
          "OC"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "variable_declaration_type_multiple_block",
  "message0": "[ %1 ] %2",
  "args0": [
    {
      "type": "field_number",
      "name": "variable_declaration_type_number",
      "value": 2,
      "min": 0
    },
    {
      "type": "field_dropdown",
      "name": "variable_declaration_type",
      "options": [
        [
          "BIT",
          "BIT"
        ],
        [
          "TC",
          "TC"
        ],
        [
          "OC",
          "OC"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "variable_declaration_block_full_block",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "variable_declaration_in_out_type_full",
      "check": "variable_declaration_in_out_type_block"
    },
    {
      "type": "input_value",
      "name": "variable_name_full",
      "check": "variable_declaration_name_block"
    },
    {
      "type": "input_value",
      "name": "variable_type_full",
      "check": [
        "variable_declaration_type_single_block",
        "variable_declaration_type_multiple_block"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 300,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "variable_declaration_type_single_block",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "variable_declaration_type",
      "options": [
        [
          "BIT",
          "BIT"
        ],
        [
          "TC",
          "TC"
        ],
        [
          "OC",
          "OC"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
}])