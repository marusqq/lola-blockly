Blockly.defineBlocksWithJsonArray([
  {
    "type": "object",
    "message0": "{ %1 %2 }",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "MEMBERS"
      }
    ],
    "output": null,
    "colour": 230,
  },
  
// ---------------------- Lola blocks -----------------------------

  // Module block
  {
    "type": "module_block",
    "message0": "MODULE %1; %2 %3 BEGIN %4 %5 END.",
    "args0": [
      {
          "type": "field_input",
          "name": "module_name",
          "text": "module_name"
      },
      {
          "type": "input_dummy",
          "align": "CENTRE"
      },
      {
          "type": "input_statement",
          "name": "module_declarations"
      },
      {
          "type": "input_dummy"
      },
      {
          "type": "input_statement",
          "name": "module_statements"
      }
    ],
    "colour": 69,
    "tooltip": "",
    "helpUrl": ""
  },

  // Type block
  {
    "type": "type_block",
    "message0": "TYPE %1; %2 %3 BEGIN %4 %5 END;",
    "args0": [
      {
        "type": "field_input",
        "name": "type_name",
        "text": "type_name"
      },
      {
        "type": "input_dummy",
        "align": "CENTRE"
      },
      {
        "type": "input_statement",
        "name": "type_declarations"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "type_statements"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 169,
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
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },

  // Variable declaration INOUT type block
  {
    "type": "variable_declaration_in_out_type_block",
    "message0": "%1 %2",
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
      },
      {
        "type": "input_value",
        "name": "variable_declaration_in_out",
        "check": [
          "Array",
          ""
        ]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 15,
    "tooltip": "",
    "helpUrl": ""
  },

  // Variable declation naming block

  // Variable declaration BITTCOC

  {
    "type": "member",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "field_input",
        "name": "MEMBER_NAME",
        "text": ""
      },
      {
        "type": "field_label",
        "name": "COLON",
        "text": ":"
      },
      {
        "type": "input_value",
        "name": "MEMBER_VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
  },

  // Comment block
  {
    "type": "comment_block",
    "message0": "(* %1 *)",
    "args0": [
      {
        "type": "field_input",
        "name": "comment",
        "text": "single_line_comment"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 0,
    "tooltip": "",
    "helpUrl": ""
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
    "previousStatement": null,
    "nextStatement": null,
    "colour": 270,
    "tooltip": "",
    "helpUrl": ""
  },
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

  {
    "type": "math_arithmetic_three",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
          ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
          ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
          ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
          ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "OP2",
        "options": [
          ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
          ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
          ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
          ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
          ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
        ]
      },
      {
        "type": "input_value",
        "name": "C",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "style": "math_blocks",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    "extensions": ["math_op_tooltip"]
  },

]);