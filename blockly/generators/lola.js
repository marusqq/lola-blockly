var lolaToolbox = `
<xml id="toolbox" style="display: none">

  <category name="Modules and Types">
    <block type="module_block"></block>
    <block type="type_block"></block>
  </category>

  <category name="Variables">
    <button text="Create Variable" callbackKey="createVariableButton"></button>
    <block type="variables_set"></block>
    <block type="variables_get"></block>
    <block type="variables_name_get"></block>
    <block type="constant_declaration_block"/>
    <block type="variable_declaration_block"></block>
  </category>

  <category name="Loops">
    <block type="controls_for"/>
  </category>

  <category name="Text">
    <block type="text"><field name="TEXT"/></block>
    <block type="comment_block"/>
  </category>

  <category name="Math">
    <block type="math_number"><field name="NUM">0</field></block>
    <block type="math_arithmetic"/>
    <block type="math_arithmetic_three"/>
    <block type="math_single"/>
  </category>

  <category name="Other">
    <block type="logic_boolean"><field name="BOOL">TRUE</field></block>
    <block type="logic_null"/>
    <block type="lists_create_with"><mutation items="3"/></block>
  </category>
</xml>
`

// Lola generator
const lolaGenerator = new Blockly.Generator('Lola');

lolaGenerator.ORDER_ATOMIC = 0;            // 0 "" ...
lolaGenerator.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
lolaGenerator.ORDER_STRING_CONVERSION = 1; // `expression...`
lolaGenerator.ORDER_MEMBER = 2.1;          // . []
lolaGenerator.ORDER_FUNCTION_CALL = 2.2;   // ()
lolaGenerator.ORDER_EXPONENTIATION = 3;    // **
lolaGenerator.ORDER_UNARY_SIGN = 4;        // + -
lolaGenerator.ORDER_BITWISE_NOT = 4;       // ~
lolaGenerator.ORDER_MULTIPLICATIVE = 5;    // * / // %
lolaGenerator.ORDER_ADDITIVE = 6;          // + -
lolaGenerator.ORDER_BITWISE_SHIFT = 7;     // << >>
lolaGenerator.ORDER_BITWISE_AND = 8;       // &
lolaGenerator.ORDER_BITWISE_XOR = 9;       // ^
lolaGenerator.ORDER_BITWISE_OR = 10;       // |
lolaGenerator.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
                                            //     <, <=, >, >=, <>, !=, ==
lolaGenerator.ORDER_LOGICAL_NOT = 12;      // not
lolaGenerator.ORDER_LOGICAL_AND = 13;      // and
lolaGenerator.ORDER_LOGICAL_OR = 14;       // or
lolaGenerator.ORDER_CONDITIONAL = 15;      // if else
lolaGenerator.ORDER_LAMBDA = 16;           // lambda
lolaGenerator.ORDER_NONE = 99;             // (...)

// Function for getting all blocks where more than one statement is placed
lolaGenerator.scrub_ = function(block, code, opt_thisOnly) {
  const nextBlock =
      block.nextConnection && block.nextConnection.targetBlock();
  let nextCode = '';
  if (nextBlock) {
      nextCode =
          opt_thisOnly ? '' : '\n' + lolaGenerator.blockToCode(nextBlock);
  }
  return code +  nextCode;
};

// Setup nameDB_
lolaGenerator.init = function(workspace) {
  // Call Blockly.Generator's init.
  Object.getPrototypeOf(this).init.call(this);

  if (!this.nameDB_) {
    this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
  } else {
    this.nameDB_.reset();
  }

  this.nameDB_.setVariableMap(workspace.getVariableMap());
  this.nameDB_.populateVariables(workspace);
  this.nameDB_.populateProcedures(workspace);

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    defvars.push(this.nameDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = None');
  }

  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  for (var i = 0; i < variables.length; i++) {
    defvars.push(this.nameDB_.getName(variables[i].getId(),
        Blockly.VARIABLE_CATEGORY_NAME) + ' = None');
  }

  this.definitions_['variables'] = defvars.join('\n');
  this.isInitialized = true;
};

// ---------------------- Lola generator rules -----------------------------

// Module
lolaGenerator['module_block'] = function(block) {

  const module_declarations =
      lolaGenerator.statementToCode(block, 'module_declarations');

  const module_statements =
      lolaGenerator.statementToCode(block, 'module_statements');

  const module_name = block.getFieldValue('module_name')

  // full converted module code:
  var module_code;
  
  // MODULE
  module_code = 'MODULE ' + module_name + ';\n\n';

  // DECLARATIONS
  module_code = module_code + module_declarations + '\n';

  // BEGIN
  module_code = module_code + 'BEGIN \n'

  // STATEMENTS 
  module_code = module_code + module_statements + '\n';

  // END
  module_code = module_code + 'END ' + module_name + '.\n';
  
  return module_code
}

// Type
lolaGenerator['type_block'] = function(block) {
  const type_declarations =
      lolaGenerator.statementToCode(block, 'type_declarations');

  const type_statements =
      lolaGenerator.statementToCode(block, 'type_statements');
  
  const type_name = block.getFieldValue('type_name');

  // full converted type code:
  var type_code;
  
  // TYPE
  type_code = 'TYPE ' + type_name + ';\n';

  // DECLARATIONS
  type_code = type_code + type_declarations + '\n';

  // BEGIN
  type_code = type_code + 'BEGIN \n'

  // STATEMENTS 
  type_code = type_code + type_statements + '\n';

  // END
  type_code = type_code + 'END ' + type_name + ';\n';
  
  return type_code
}

// Variable declaration
lolaGenerator['variable_declaration_block'] = function(block) {
  const variable_in_out =
      lolaGenerator.statementToCode(block, 'variable_in_out');

  const variable_in_out_type = block.getFieldValue('variable_in_out_type')

  const variable_type = block.getFieldValue('variable_type')

  var test;

  test = variable_in_out_type + ' ' + variable_in_out.trim() + ':' + variable_type.trim() + ';'; //+ variable_in_out_type;

  return test;
};

// Variable setter
lolaGenerator['variables_set'] = function(block) {
  var argument0 = lolaGenerator.valueToCode(block, 'VALUE',
      lolaGenerator.ORDER_NONE) || '0';
  var varName = lolaGenerator.nameDB_.getName(block.getFieldValue('VAR'),
      Blockly.VARIABLE_CATEGORY_NAME);

  var code = varName + ':=' + argument0 + ';'
  return code
};

// Variable getter
lolaGenerator['variables_get'] = function(block) {
  var value = lolaGenerator.valueToCode(block, 'VALUE',
  lolaGenerator.ORDER_NONE) || '0';
  return [value, lolaGenerator.ORDER_NONE]
};

// Variable name getter
lolaGenerator['variables_name_get'] = function(block) {
  var varName = lolaGenerator.nameDB_.getName(block.getFieldValue('VAR'),
      Blockly.VARIABLE_CATEGORY_NAME);
  return [varName, lolaGenerator.ORDER_NONE]
};

// Comment block
lolaGenerator['comment_block'] = function(block) {
  const comment_text = block.getFieldValue('comment')
  return '(*' + comment_text + '*)'
};

// Math arithmetic block
lolaGenerator['math_arithmetic'] = function(block) {
  var OPERATORS = {
    'ADD': ['+', lolaGenerator.ORDER_ADDITIVE],
    'MINUS': ['-', lolaGenerator.ORDER_ADDITIVE],
    'MULTIPLY': ['*', lolaGenerator.ORDER_MULTIPLICATIVE],
    'DIVIDE': ['/', lolaGenerator.ORDER_MULTIPLICATIVE],
    'POWER': ['**', lolaGenerator.ORDER_EXPONENTIATION]
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = lolaGenerator.valueToCode(block, 'A', order) || '0';
  var argument1 = lolaGenerator.valueToCode(block, 'B', order) || '0';
  var code = argument0 + operator + argument1;
  return [code, order];
}

// Math arithmetic three block 
lolaGenerator['math_arithmetic_three'] = function(block) {
  var OPERATORS = {
    'ADD': ['+', lolaGenerator.ORDER_ADDITIVE],
    'MINUS': ['-', lolaGenerator.ORDER_ADDITIVE],
    'MULTIPLY': ['*', lolaGenerator.ORDER_MULTIPLICATIVE],
    'DIVIDE': ['/', lolaGenerator.ORDER_MULTIPLICATIVE],
    'POWER': ['**', lolaGenerator.ORDER_EXPONENTIATION]
  };
  var tuple1 = OPERATORS[block.getFieldValue('OP')];
  var operator1 = tuple1[0];
  var order = tuple1[1];

  var tuple2 = OPERATORS[block.getFieldValue('OP2')];
  var operator2 = tuple2[0];
  var order = tuple2[1];

  var argument0 = lolaGenerator.valueToCode(block, 'A', order) || '0';
  var argument1 = lolaGenerator.valueToCode(block, 'B', order) || '0';
  var argument2 = lolaGenerator.valueToCode(block, 'C', order) || '0';
  var code = argument0 + operator1 + argument1 + operator2 + argument2;
  return [code, order];
}

// Math number block
lolaGenerator['math_number'] = function(block) {
  var code = Number(block.getFieldValue('NUM'));
  var order;
  if (code == Infinity) {
    code = 'float("inf")';
    order = lolaGenerator.ORDER_FUNCTION_CALL;
  } else if (code == -Infinity) {
    code = '-float("inf")';
    order = lolaGenerator.ORDER_UNARY_SIGN;
  } else {
    order = code < 0 ? lolaGenerator.ORDER_UNARY_SIGN :
    lolaGenerator.ORDER_ATOMIC;
  }
  return [code, order];
};

// Constant declaration block
lolaGenerator['constant_declaration_block'] = function(block) {
  var argument0 = lolaGenerator.valueToCode(block, 'variable_value',
    lolaGenerator.ORDER_NONE) || '0';
  var varName = lolaGenerator.nameDB_.getName(block.getFieldValue('variable'),
      Blockly.VARIABLE_CATEGORY_NAME);
  return 'CONST ' + varName + ':=' + argument0 + ';'
};

////// -------------------------------------------

// Array
lolaGenerator['lists_create_with'] = function(block) {
  const values = [];
  // const qqq = lolaGenerator.statementToCode(block, 'ADD0')
  // return qqq
  for (var i = 0; i < block.itemCount_; i++) {
    let valueCode = lolaGenerator.statementToCode(block, 'ADD' + i);
    if (valueCode) {
      values.push(valueCode);
    }
  }
  const valueString = values.join(',\n');
  const indentedValueString =
      lolaGenerator.prefixLines(valueString, lolaGenerator.INDENT);
  const codeString = '[\n' + indentedValueString + '\n]';
  return [codeString, lolaGenerator.PRECEDENCE];
};

// Loop
lolaGenerator['controls_for'] = function(block) {
  var variable0 = lolaGenerator.nameDB_.getName(
    block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var argument0 = lolaGenerator.valueToCode(block, 'FROM',
    lolaGenerator.ORDER_NONE) || '0';
  var argument1 = lolaGenerator.valueToCode(block, 'TO',
    lolaGenerator.ORDER_NONE) || '0';
  var increment = lolaGenerator.valueToCode(block, 'BY',
    lolaGenerator.ORDER_NONE) || '1';
  var branch = lolaGenerator.statementToCode(block, 'DO');


  code = 'FOR ' + variable0 + ':=' + argument0 + '..' + argument1 + ' DO\n'
  code = code + branch + '\n'
  code = code + 'END;'

  
  return code


}

// Text
lolaGenerator['text'] = function(block) {
  var text_value = block.getFieldValue('TEXT');
  return text_value
};

lolaGenerator['logic_null'] = function(block) {
  return ['null', lolaGenerator.PRECEDENCE];
};
