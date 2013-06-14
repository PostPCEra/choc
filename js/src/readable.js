// Generated by CoffeeScript 1.6.3
(function() {
  var escodegen, esmorph, esprima, generateReadableExpression, generateReadableStatement, inspect, puts, readableNode, _, _ref;

  _ref = require("util"), puts = _ref.puts, inspect = _ref.inspect;

  esprima = require("esprima");

  escodegen = require("escodegen");

  esmorph = require("esmorph");

  _ = require("underscore");

  generateReadableExpression = function(node) {
    var message, operators;
    switch (node.type) {
      case 'AssignmentExpression':
        operators = {
          "=": "'set " + node.left.name + " to ' + __choc_first_message(" + (generateReadableExpression(node.right)) + ")",
          "+=": "'add ' + __choc_first_message(" + (generateReadableExpression(node.right)) + ") + ' to " + node.left.name + " and set " + node.left.name + " to ' + " + node.left.name,
          "-=": "'subtract ' + __choc_first_message(" + (generateReadableExpression(node.right)) + ") + ' from " + node.left.name + "'",
          "*=": "'multiply " + node.left.name + " by ' + __choc_first_message(" + (generateReadableExpression(node.right)) + ") ",
          "/=": "'divide " + node.left.name + " by ' + __choc_first_message(" + (generateReadableExpression(node.right)) + ") ",
          "%=": "'divide " + node.left.name + " by ' + __choc_first_message(" + (generateReadableExpression(node.right)) + ") + ' and set " + node.left.name + " to the remainder'"
        };
        message = operators[node.operator] || "";
        return "[ { lineNumber: " + node.loc.start.line + ", message: " + message + " }]";
      case 'BinaryExpression':
        operators = {
          "==": "''",
          "!=": "''",
          "===": "''",
          "!==": "''",
          "<": "''",
          "<=": "''",
          ">": "''",
          ">=": "''",
          "<<": "''",
          ">>": "''",
          ">>>": "''",
          "+": "'add ' + __choc_first_message(" + (generateReadableExpression(node.right)) + ") + ' to " + node.left.name + " and set " + node.left.name + " to ' + " + node.left.name,
          "-": "''",
          "*": "''",
          "/": "''",
          "%": "''",
          "|": "''",
          "^": "''",
          "in": "''",
          "instanceof": "''",
          "..": "''"
        };
        message = operators[node.operator] || "";
        return "[ { lineNumber: " + node.loc.start.line + ", message: " + message + " }]";
      case 'Literal':
        return "[ { lineNumber: " + node.loc.start.line + ", message: '" + node.value + "' }]";
      default:
        return "[]";
    }
  };

  generateReadableStatement = function(node) {
    var i, msgs, sentences;
    switch (node.type) {
      case 'VariableDeclaration':
        i = 0;
        sentences = _.map(node.declarations, function(dec) {
          var name, prefix;
          name = dec.id.name;
          prefix = i === 0 ? "Create" : " and create";
          i = i + 1;
          return "'" + prefix + " the variable <span class=\"choc-variable\">" + name + "</span> and set it to <span class=\"choc-value\">' + " + name + " + '</span>'";
        });
        msgs = _.map(sentences, function(sentence) {
          var s;
          s = "{ ";
          s += "lineNumber: " + node.loc.start.line + ", ";
          s += "message: " + sentence;
          return s += " }";
        });
        return "[ " + msgs.join(", ") + " ]";
      case 'ExpressionStatement':
        return generateReadableExpression(node.expression);
      default:
        return "[]";
    }
  };

  readableNode = function(node) {
    switch (node.type) {
      case 'VariableDeclaration':
      case 'ExpressionStatement':
        return generateReadableStatement(node);
      case 'AssignmentExpression':
        return generateReadableExpression;
      default:
        return "[]";
    }
  };

  exports.readableNode = readableNode;

}).call(this);