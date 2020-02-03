import { Query } from "./query";
import { Parser } from "./parser";

var rqlQuery = new Query().eq("foo", 3);
var rqlString = "and(or(eq(foo,3),eq(foo,bar)),lt(price,10))";
console.log(rqlQuery, Parser.parseQuery(rqlString));