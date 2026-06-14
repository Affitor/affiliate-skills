import { readFileSync } from "fs";
import { join } from "path";

let failed = 0;
function assert(name: string, condition: boolean, detail = "") {
  if (condition) console.log(`✅ ${name}`);
  else {
    failed++;
    console.error(`❌ ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

const root = process.cwd();
const read = (p: string) => readFileSync(join(root, p), "utf8");

const readme = read("README.md");
const api = read("API.md");
const claude = read("CLAUDE.md");

console.log("=== Test 1: public docs enforce correct list field names ===");
for (const needle of ["reward_value", "reward_type", "cookie_days", "stars_count"]) {
  assert(`README/API/CLAUDE mention ${needle}`, readme.includes(needle) || api.includes(needle) || claude.includes(needle), needle);
}
assert("CLAUDE.md explicitly bans wrong field names", claude.includes("NOT: `commission_rate`, `upvotes`, `cookie_duration`"));
assert("API.md explicitly bans wrong field names", api.includes("Do not substitute `commission_rate`, `upvotes`, or `cookie_duration`"));

console.log("\n=== Test 2: public docs still point to core artifacts ===");
for (const needle of ["registry.json", "skills/{stage}/{skill-name}/SKILL.md", "tools/src/", "evals/"]) {
  assert(`README mentions ${needle}`, readme.includes(needle), needle);
}

console.log("\n=== Test 3: data-source adapter contract (tools/src/api.ts → openaffiliate.dev) ===");
const apiClient = read("tools/src/api.ts");
assert("api.ts points at the openaffiliate.dev API", apiClient.includes("openaffiliate.dev/api"));
assert("api.ts is NOT pointing at the retired list.affitor.com", !apiClient.includes("list.affitor.com"));
// The adapter must map openaffiliate's raw camelCase/nested shape into the normalized skill fields.
for (const raw of ["commission", "cookieDays", "stars"]) {
  assert(`api.ts reads raw openaffiliate field \`${raw}\``, apiClient.includes(raw), raw);
}
for (const norm of ["reward_value", "reward_type", "cookie_days", "stars_count"]) {
  assert(`api.ts produces normalized field \`${norm}\``, apiClient.includes(norm), norm);
}

if (failed > 0) {
  console.error(`\n❌ Skills doc/contracts failed: ${failed}`);
  process.exit(1);
}
console.log("\n✅ All skills doc/contracts checks passed");
