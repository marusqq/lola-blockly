Blockly.defineBlocksWithJsonArray([
    // Variable name get block
    {
        "type": "variables_name_get",
        "message0": "nameof: %1",
        "args0": [
          {
            "type": "field_variable",
            "name": "VAR",
            "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
          }
        ],
        "output": null,
        "style": "variable_blocks",
        "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
        "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
        "extensions": ["contextMenu_variableSetterGetter"]
    },

    //CONST declaration
    {
        "type": "constant_declaration_block",
        "message0": "%1 %2 %3",
        "args0": [
        {
            "type": "field_label_serializable",
            "name": "const",
            "text": "CONST"
        },
        {
            "type": "field_variable",
            "name": "variable",
            "variable": "item"
        },
        {
            "type": "input_value",
            "name": "variable_value",
            "check": "Number"
        }
        ],
        "inputsInline": false,
        "style": "variable_blocks",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "",
        "helpUrl": ""
    },

    // Variable declaration block
    {
        "type": "variable_declaration_block",
        "message0": "%1 %2 : %3 ;",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "variable_in_out_type",
            "options": [
              [
                "IN",
                "IN"
              ],
              [
                "INOUT",
                "INOUT"
              ],
              [
                "OUT",
                "OUT"
              ],
              [
                "VAR",
                "VAR"
              ]
            ]
          },
          {
            "type": "input_value",
            "name": "variable_in_out",
            "check": [
              "String",
              "Array"
            ]
          },
          {
            "type": "field_dropdown",
            "name": "variable_type",
            "options": [
              [
                "BIT",
                "BIT"
              ],
              [
                "TS",
                "TS"
              ],
              [
                "OC",
                "OC"
              ]
            ]
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "",
        "helpUrl": ""
    }

])