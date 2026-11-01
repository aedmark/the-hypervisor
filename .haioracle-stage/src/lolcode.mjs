/**
 * Purpose-built LOLCODE 1.2 interpreter for HAI, ORACLE!
 *
 * Supported surface: HAI/KTHXBYE, BTW comments, I HAS A declarations,
 * assignment with R, VISIBLE, numeric literals, YARN literals, SMOOSH, and
 * binary arithmetic operators. Unsupported syntax fails closed with a line
 * number. This is an application boundary, not a general LOLCODE runtime.
 */

const BINARY_OPERATORS = new Map([
  ["SUM OF", (a, b) => number(a) + number(b)],
  ["DIFF OF", (a, b) => number(a) - number(b)],
  ["PRODUKT OF", (a, b) => number(a) * number(b)],
  ["QUOSHUNT OF", (a, b) => {
    const divisor = number(b);
    if (divisor === 0) throw new Error("QUOSHUNT OF cannot divide by zero");
    return Math.trunc(number(a) / divisor);
  }],
  ["MOD OF", (a, b) => {
    const divisor = number(b);
    if (divisor === 0) throw new Error("MOD OF cannot divide by zero");
    return ((number(a) % divisor) + divisor) % divisor;
  }],
  ["BIGGR OF", (a, b) => Math.max(number(a), number(b))],
  ["SMALLR OF", (a, b) => Math.min(number(a), number(b))],
]);

function number(value) {
  const result = Number(value);
  if (!Number.isFinite(result)) throw new Error(`Expected a number, received ${String(value)}`);
  return result;
}

function stripComment(line) {
  let inString = false;
  for (let i = 0; i < line.length - 2; i += 1) {
    if (line[i] === '"' && line[i - 1] !== ":") inString = !inString;
    if (!inString && line.slice(i, i + 3) === "BTW") return line.slice(0, i);
  }
  return line;
}

function tokenize(expression) {
  const tokens = [];
  let cursor = 0;
  const pattern = /\s*("(?:[^":]|:[)>"\\]|::)*"|-?\d+(?:\.\d+)?|[A-Za-z_][A-Za-z0-9_]*)/y;

  while (cursor < expression.length) {
    pattern.lastIndex = cursor;
    const match = pattern.exec(expression);
    if (!match) throw new Error(`Cannot read expression near: ${expression.slice(cursor, cursor + 18)}`);
    tokens.push(match[1]);
    cursor = pattern.lastIndex;
  }
  return tokens;
}

function decodeYarn(token) {
  return token
    .slice(1, -1)
    .replaceAll(":)", "\n")
    .replaceAll(":>", "\t")
    .replaceAll(':"', '"')
    .replaceAll("::", ":");
}

function expressionParser(expression, variables) {
  const tokens = tokenize(expression);
  let index = 0;

  function consume(expected) {
    const actual = tokens[index]?.toUpperCase();
    if (actual !== expected) throw new Error(`Expected ${expected}, received ${tokens[index] ?? "end of line"}`);
    index += 1;
  }

  function parse() {
    const token = tokens[index];
    if (token === undefined) throw new Error("Expression ended early");

    if (token.startsWith('"')) {
      index += 1;
      return decodeYarn(token);
    }

    if (/^-?\d/.test(token)) {
      index += 1;
      return Number(token);
    }

    const first = token.toUpperCase();
    const pair = `${first} ${tokens[index + 1]?.toUpperCase() ?? ""}`;
    if (BINARY_OPERATORS.has(pair)) {
      index += 2;
      const left = parse();
      if (tokens[index]?.toUpperCase() === "AN") index += 1;
      const right = parse();
      return BINARY_OPERATORS.get(pair)(left, right);
    }

    if (first === "SMOOSH") {
      index += 1;
      const pieces = [];
      while (index < tokens.length && tokens[index].toUpperCase() !== "MKAY") {
        if (tokens[index].toUpperCase() === "AN") {
          index += 1;
        } else {
          pieces.push(String(parse()));
        }
      }
      if (tokens[index]?.toUpperCase() === "MKAY") index += 1;
      return pieces.join("");
    }

    index += 1;
    if (!variables.has(first)) throw new Error(`Unknown variable ${token}`);
    return variables.get(first);
  }

  const value = parse();
  if (index !== tokens.length) throw new Error(`Unexpected token ${tokens[index]}`);
  return value;
}

export function runLolcode(source, initialVariables = {}) {
  if (typeof source !== "string") throw new TypeError("LOLCODE source must be a string");
  const variables = new Map(
    Object.entries(initialVariables).map(([key, value]) => [key.toUpperCase(), value]),
  );
  const output = [];
  let opened = false;
  let closed = false;

  source.split(/\r?\n/).forEach((rawLine, offset) => {
    const lineNumber = offset + 1;
    const line = stripComment(rawLine).trim();
    if (!line) return;

    try {
      if (!opened) {
        if (!/^HAI(?:\s+1\.2)?$/i.test(line)) throw new Error("Program must begin with HAI 1.2");
        opened = true;
        return;
      }
      if (closed) throw new Error("Content found after KTHXBYE");
      if (/^KTHXBYE$/i.test(line)) {
        closed = true;
        return;
      }

      const declaration = line.match(/^I HAS A ([A-Za-z_][A-Za-z0-9_]*)(?: ITZ (.+))?$/i);
      if (declaration) {
        const name = declaration[1].toUpperCase();
        variables.set(name, declaration[2] ? expressionParser(declaration[2], variables) : null);
        return;
      }

      const assignment = line.match(/^([A-Za-z_][A-Za-z0-9_]*) R (.+)$/i);
      if (assignment) {
        const name = assignment[1].toUpperCase();
        if (!variables.has(name)) throw new Error(`Cannot assign undeclared variable ${name}`);
        variables.set(name, expressionParser(assignment[2], variables));
        return;
      }

      const visible = line.match(/^VISIBLE (.+)$/i);
      if (visible) {
        output.push(String(expressionParser(visible[1], variables)));
        return;
      }

      throw new Error(`Unsupported statement: ${line}`);
    } catch (error) {
      throw new Error(`LOLCODE line ${lineNumber}: ${error.message}`, { cause: error });
    }
  });

  if (!opened) throw new Error("Empty LOLCODE program");
  if (!closed) throw new Error("LOLCODE program must end with KTHXBYE");
  return { output, variables: Object.fromEntries(variables) };
}
